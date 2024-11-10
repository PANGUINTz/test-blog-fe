"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Plus } from "react-feather";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { destroyUserSession, getAuthInfo, getBlogBySlug } from "@/services";
import useMount from "@/lib/useMount";
import { createBlog, User } from "@/lib/types";

type Props = {
  submit: (e: React.FormEvent, data: createBlog, slug?: string) => void;
  error: { [key: string]: string };
  type?: string;
  slug?: string;
};

const CreateBlog = ({ submit, error, type = "create", slug }: Props) => {
  const [userData, setUserData] = useState<User>();
  const [createBlogData, setCreateBlogData] = useState<createBlog>({
    title: "",
    content: "",
    category: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const getAuth = async () => {
    try {
      const { data } = await getAuthInfo();
      setUserData(data);
    } catch (error) {
      console.log(error);
      destroyUserSession();
    }
  };

  const fetchBlog = async () => {
    if (slug) {
      const { data } = await getBlogBySlug(slug);
      setCreateBlogData({
        title: data.title,
        content: data.content,
        category: data.category,
      });
    }
  };

  useMount(() => void getAuth());
  useMount(() => void fetchBlog());

  return (
    <div>
      <Dialog open={isOpen}>
        <DialogTrigger asChild>
          {type == "create" ? (
            <Button
              className="bg-success hover:bg-green300 p-5"
              disabled={userData == undefined}
              onClick={() => setIsOpen(true)}
            >
              Create <Plus />
            </Button>
          ) : (
            <Edit className="cursor-pointer" onClick={() => setIsOpen(true)} />
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] max-w-[400px] w-full">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {type == "create" ? "Create" : "Edit"} Post
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Select
              onValueChange={(value: string) =>
                setCreateBlogData((prev) => ({
                  ...prev,
                  category: value,
                }))
              }
              value={createBlogData?.category ?? ""}
            >
              <SelectTrigger className="w-[250px] shadow-none focus:ring-0 border-success text-success">
                <SelectValue placeholder="Choose a community" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="history">History</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="pets">Pets</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="exercise">Exercise</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>
            {error.category && (
              <p className="text-red-500 text-xs mt-2">{error.category}</p>
            )}
            <Input
              id="title"
              placeholder="Title"
              onChange={(e) =>
                setCreateBlogData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              value={createBlogData?.title ?? ""}
            />
            {error.title && (
              <p className="text-red-500 text-xs mt-2">{error.title}</p>
            )}
            <Textarea
              id="content"
              placeholder="What's on your mind..."
              className="h-52"
              onChange={(e) =>
                setCreateBlogData((prev) => ({
                  ...prev,
                  content: e.target.value,
                }))
              }
              value={createBlogData?.content ?? ""}
            />
            {error.content && (
              <p className="text-red-500 text-xs mt-2">{error.content}</p>
            )}
          </div>
          <DialogFooter className="flex gap-2.5 flex-col sm:flex-row">
            <DialogClose asChild>
              <Button
                variant={"outline"}
                className="border-success text-success hover:text-green300 w-full sm:w-24"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
            </DialogClose>
            {type == "create" ? (
              <Button
                type="submit"
                className="bg-success hover:bg-green300 w-full sm:w-24"
                onClick={(e) => {
                  submit(e, createBlogData);
                  setIsOpen(false);
                }}
              >
                Post
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-success hover:bg-green300 w-full sm:w-24"
                onClick={(e) => {
                  submit(e, createBlogData, slug);
                  setIsOpen(false);
                }}
              >
                Confirm
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBlog;
