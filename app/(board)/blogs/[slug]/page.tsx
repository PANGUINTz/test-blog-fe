"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

import useMount from "@/lib/useMount";
import { Blog, User } from "@/lib/types";

import { destroyUserSession, getAuthInfo, getBlogBySlug } from "@/services";
import {
  createComment,
  deleteComment,
  updateComment,
} from "@/services/comment.service";
import Swal from "sweetalert2";

const DynamicBlog = dynamic(() => import("@/components/elements/Blog"), {
  loading: () => <p className="h-screen bg-white p-5">Loading...</p>,
  ssr: false,
});

const OneBlogPage = () => {
  const { slug } = useParams();
  const [blogData, setBlogData] = useState<Blog>();
  const [userData, setUserData] = useState<User>();

  const getAuth = async () => {
    try {
      const { data } = await getAuthInfo();
      setUserData(data);
    } catch (error) {
      console.log(error);

      destroyUserSession();
    }
  };

  const getBlog = async () => {
    const blog = await getBlogBySlug(slug as string);
    setBlogData(blog.data);
  };

  const handleCreateCommentSubmit = async (
    e: React.FormEvent,
    comment: string
  ) => {
    e.preventDefault();
    if (comment == "") {
      return Swal.fire({
        icon: "error",
        title: "comment is empty",
        timer: 1500,
        showConfirmButton: false,
      });
    }
    if (comment.length >= 255) {
      return Swal.fire({
        icon: "error",
        title: "comment is too long",
        timer: 1500,
        showConfirmButton: false,
      });
    }
    const { data, success, message } = await createComment(
      comment as string,
      slug as string
    );
    if (success) {
      Swal.fire({
        icon: "success",
        title: "Created comment successfully",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          setBlogData({
            ...blogData,
            comment: [
              {
                id: data.id,
                content: data.content,
                createdAt: data.createdAt,
                slug: data.slug,
                user: data.user,
              },
              ...(blogData?.comment ?? []),
            ],
          } as Blog);
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleDelete = async (slug: string) => {
    const data = await deleteComment(slug);
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

  const handleUpdate = async (
    e: React.FormEvent,
    comment: string,
    slug: string
  ) => {
    e.preventDefault();
    if (comment == "") {
      return Swal.fire({
        icon: "error",
        title: "comment is empty",
        timer: 1500,
        showConfirmButton: false,
      });
    }
    if (comment.length >= 255) {
      return Swal.fire({
        icon: "error",
        title: "comment is too long",
        timer: 1500,
        showConfirmButton: false,
      });
    }

    const { success, message } = await updateComment(
      slug as string,
      comment as string
    );
    if (success) {
      Swal.fire({
        icon: "success",
        title: "updated comment successfully",
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
        title: message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  useMount(() => void getBlog());
  useMount(() => void getAuth());

  return (
    <div className="h-full">
      <DynamicBlog
        blog={blogData}
        user={userData}
        submit={handleCreateCommentSubmit}
        updated={handleUpdate}
        deleted={handleDelete}
      />
    </div>
  );
};

export default OneBlogPage;
