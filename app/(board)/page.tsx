"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";

import Search from "@/components/elements/Search";

import useMount from "@/lib/useMount";
import { validateForm } from "@/lib/utils";

import {
  createBlogs,
  destroyUserSession,
  getAuthInfo,
  getBlogs,
} from "@/services";
import { Blog, createBlog, User } from "@/lib/types";

const DynamicCardBlog = dynamic(
  () => import("@/components/elements/CardBlog"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

type SearchState = {
  title: string;
  category: string;
};

export default function Home() {
  const [blogsData, setBlogsData] = useState<Blog[]>([]);
  const [userData, setUserData] = useState<User>();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [search, setSearch] = useState<SearchState>({
    title: "",
    category: "",
  });

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

  const handleSubmit = async (e: React.FormEvent, newBlog: createBlog) => {
    e.preventDefault();
    const validationErrors = validateForm({
      form: newBlog,
      validationRules,
    });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      const blog = await createBlogs(newBlog);
      if (blog?.success) {
        Swal.fire({
          icon: "success",
          title: "Created Successfully",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            setBlogsData((prev) => [...prev, blog?.data]);
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
  };

  const getAuth = async () => {
    try {
      const { data } = await getAuthInfo();
      setUserData(data);
    } catch (error) {
      console.log(error);
      destroyUserSession();
    }
  };

  const fetchBlogsData = async () => {
    const { data } = await getBlogs();
    setBlogsData(data ?? []);
  };
  useMount(() => void fetchBlogsData());
  useMount(() => void getAuth());

  const searchBlog =
    search.title && search.category
      ? blogsData?.filter(
          (blog) =>
            blog.title.toLowerCase().includes(search.title.toLowerCase()) &&
            blog.category.toLowerCase().includes(search.category.toLowerCase())
        )
      : search.title
      ? blogsData?.filter((blog) =>
          blog.title.toLowerCase().includes(search.title.toLowerCase())
        )
      : blogsData?.filter((blog) =>
          blog.category.toLowerCase().includes(search.category.toLowerCase())
        );

  return (
    <div className="mt-5 p-5 min-h-fit h-screen">
      <Search
        submit={handleSubmit}
        error={errors}
        searchTerm={search}
        setSearchTerm={setSearch}
      />
      <DynamicCardBlog blogs={searchBlog} author={userData?.id} />
    </div>
  );
}
