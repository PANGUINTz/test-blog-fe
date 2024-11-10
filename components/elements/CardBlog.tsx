"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import WriterPerson from "./WriterPerson";
import { MessageCircle, Trash } from "react-feather";
import Content from "./Content";
import { deleteBlog, updateBlog } from "@/services";
import Swal from "sweetalert2";
import CreateBlog from "./CreateBlog";
import { validateForm } from "@/lib/utils";
import { Blog, createBlog } from "@/lib/types";

type Props = {
  blogs: Blog[];
  author?: number;
  showAllData?: boolean;
};

const CardBlog = ({ blogs, author, showAllData = true }: Props) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validationRules = {
    title: {
      required: true,
      message: "Title is required",
    },
    content: {
      required: true,
      message: "Content is required",
    },
    category: {
      required: true,
      message: "Category is required",
    },
  };

  const handleDelete = async (slug: string) => {
    const data = await deleteBlog(slug);
    if (data.success) {
      Swal.fire({
        icon: "success",
        title: "Deleted success",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          window.location.reload();
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: `${
          data?.statusCode == 500 ? "Something went wrong" : "Delete failed"
        }`,
        text: `${
          data?.statusCode == 500
            ? "Please call us for assistance. Thank you for your patience."
            : data.message
        }`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleSubmitUpdate = async (
    e: React.FormEvent,
    editBlog: createBlog,
    slug?: string
  ) => {
    e.preventDefault();
    const validationErrors = validateForm({
      form: editBlog,
      validationRules,
    });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      if (slug) {
        const blog = await updateBlog(slug, editBlog);

        if (blog?.success) {
          Swal.fire({
            icon: "success",
            title: "Updated Successfully",
            showConfirmButton: false,
            timer: 1500,
          }).then((result) => {
            if (result.isDismissed) {
              window.location.reload();
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: blog.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    }
  };

  return (
    <div>
      {(!showAllData && author) || showAllData ? (
        <div className="w-full bg-white rounded-lg p-5">
          {blogs.length > 0 ? (
            blogs.map((blog, index) => {
              return (
                <div className="relative" key={index}>
                  <div
                    className={`${
                      blogs.length !== index + 1 && "border-b border-b-gray300"
                    } p-5 cursor-pointer`}
                  >
                    <a href={`/blogs/${blog.slug}`}>
                      <div className="flex justify-between items">
                        <WriterPerson
                          image="https://github.com/shadcn.png"
                          name={blog.user.username}
                        />
                      </div>
                      <Badge className="bg-gray100 rounded-full my-2.5 font-light capitalize">
                        {blog.category}
                      </Badge>
                      <Content title={blog.title} content={blog.content} />
                      <div className="flex items-center gap-2.5 text-gray300 font-light">
                        <MessageCircle />
                        <span>{blog.comment?.length} Comments</span>
                      </div>
                    </a>
                  </div>
                  {blog.user.id == author && (
                    <div className="flex gap-5 absolute right-5 top-5">
                      <CreateBlog
                        submit={handleSubmitUpdate}
                        error={errors}
                        type="edit"
                        slug={blog.slug}
                      />
                      <Trash
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          Swal.fire({
                            title:
                              "Please confirm if you  wish to delete the post",
                            text: "Are you sure want to delete the post? Once deleted, it cannot be recovered.",
                            showCancelButton: true,
                            showConfirmButton: true,
                            confirmButtonColor: "#FF0000",
                            confirmButtonText: "Delete",
                            reverseButtons: true,
                            width: 450,
                          }).then((result) => {
                            if (result.isConfirmed) {
                              handleDelete(blog.slug);
                            }
                          });
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p>No blogs are available at the moment</p>
          )}
        </div>
      ) : (
        <div>must be sign in</div>
      )}
    </div>
  );
};

export default CardBlog;
