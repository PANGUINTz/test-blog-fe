"use client";

import React, { useState } from "react";
import {
  MessageCircle,
  ArrowLeft,
  MoreVertical,
  Trash,
  Edit2,
} from "react-feather";
import WriterPerson from "@/components/elements/WriterPerson";
import Content from "@/components/elements/Content";
import Comment from "@/components/elements/Comment";
import { Badge } from "@/components/ui/badge";
import CreateComment from "@/components/elements/CreateComment";
import { Button } from "@/components/ui/button";
import { timeAgo } from "@/lib/utils";
import { User, Blog } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import Swal from "sweetalert2";
import Link from "next/link";

type Props = {
  blog?: Blog;
  user?: User;
  submit: (e: React.FormEvent, comment: string) => void;
  updated: (e: React.FormEvent, comment: string, slug: string) => void;
  deleted: (slug: string) => void;
};

const BlogComponent = ({ blog, user, submit, updated, deleted }: Props) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editComment, setEditComment] = useState("");
  const [editSlug, setEditSlug] = useState("");

  const handleDelete = (slug: string) => {
    Swal.fire({
      title: "Please confirm if you  wish to delete the comment",
      text: "Are you sure want to delete the comment? Once deleted, it cannot be recovered.",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: "#FF0000",
      confirmButtonText: "Delete",
      reverseButtons: true,
      width: 450,
    }).then((result) => {
      if (result.isConfirmed) {
        deleted(slug);
      }
    });
  };

  return (
    <div>
      {blog ? (
        <div
          className={`bg-white px-12 sm:px-20 py-12 ${
            blog.comment.length <= 1 ? "h-screen" : "h-full"
          }`}
        >
          <div
            className="rounded-full bg-green100 w-fit p-3 mb-10 cursor-pointer hover:bg-green300 ease-in-out duration-300 "
            onClick={() => window.history.back()}
          >
            <ArrowLeft />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <WriterPerson
                image="https://github.com/shadcn.png"
                name={blog?.user?.username as string}
              />
              <span className="text-gray300 text-lg">
                {timeAgo(blog.createdAt)}
              </span>
            </div>
            <Badge className="bg-gray100 rounded-full my-2.5 font-light">
              {blog?.category}
            </Badge>
            <Content
              title={blog?.title as string}
              content={blog?.content as string}
              ellipsis={false}
            />
            <div className="flex items-center gap-2.5 text-gray300 font-light my-5">
              <MessageCircle />
              <span>{blog?.comment.length} Comments</span>
            </div>
          </div>

          <CreateComment disabled={user == undefined} submit={submit} />
          {blog.comment.length > 0 ? (
            blog.comment.map((comment, index) => {
              return (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <Comment
                      comment={comment.content}
                      createdAt={comment.createdAt}
                      username={comment.user.username}
                    />
                    {user?.id == comment.user.id && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <MoreVertical
                            size={24}
                            className="mt-2.5 cursor-pointer"
                          />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-24 absolute -left-36 -top-12">
                          <DropdownMenuItem>
                            <div
                              className="flex items-center gap-1 w-full cursor-pointer"
                              onClick={() => {
                                setIsEditOpen(true);
                                setEditComment(comment.content);
                                setEditSlug(comment.slug);
                                console.log(comment);
                              }}
                            >
                              <Edit2 size={18} />
                              Edit
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <div
                              className="flex items-center gap-1 w-full cursor-pointer"
                              onClick={() => handleDelete(comment.slug)}
                            >
                              <Trash size={18} />
                              Delete
                            </div>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>

                  <Dialog open={isEditOpen}>
                    <DialogContent className="sm:max-w-[600px] max-w-[400px] w-full">
                      <DialogHeader>
                        <DialogTitle className="text-2xl text-start">
                          Edit Comment
                        </DialogTitle>
                      </DialogHeader>
                      <DialogDescription></DialogDescription>
                      <Textarea
                        className="h-36"
                        placeholder="What's on your mind..."
                        value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}
                      />
                      <DialogFooter className="flex gap-2.5 flex-col sm:flex-row">
                        <DialogClose asChild>
                          <Button
                            variant="outline"
                            className="border-success text-success hover:text-green300 w-full sm:w-24"
                            onClick={() => setIsEditOpen(false)}
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button
                          type="submit"
                          className="bg-success hover:bg-green300 w-full sm:w-24"
                          onClick={(e) => {
                            updated(e, editComment, editSlug);
                            setIsEditOpen(false);
                            setEditComment("");
                            setEditSlug("");
                          }}
                        >
                          Confirm
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              );
            })
          ) : (
            <div className="h-[10.3rem]">
              <p>No Comments</p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white h-[89.5vh] px-12 sm:px-20 py-12">
          <p className="">Blog not found</p>
          <Link href="/">
            <Button className="my-5">Go Back</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default BlogComponent;
