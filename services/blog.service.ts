import { api, api2auth } from "./api";

export const BLOG_URL = "/blogs";
const ACCESS_TOKEN_KEY = "access_token";

export async function getBlogs() {
  return api.get(BLOG_URL).then(async (res) => {
    return res.data;
  });
}

export async function getBlogsByUser() {
  if (typeof window === "undefined") return "";

  const jsonString = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (jsonString) {
    return api2auth.get(`${BLOG_URL}/user/blog`).then(async (res) => {
      return res.data;
    });
  }
  return "";
}

export async function getBlogBySlug(slug: string) {
  return api.get(`${BLOG_URL}/${slug}`).then(async (res) => {
    return res.data;
  });
}

type Blog = {
  title: string;
  content: string;
  category: string;
};

export async function createBlogs(data: Blog) {
  return api2auth.post(BLOG_URL, { ...data }).then(async (res) => {
    return res.data;
  });
}

export async function deleteBlog(slug: string) {
  return api2auth.delete(`${BLOG_URL}/${slug}`).then(async (res) => {
    return res.data;
  });
}
export async function updateBlog(slug: string, data: Blog) {
  return api2auth.put(`${BLOG_URL}/${slug}`, { ...data }).then(async (res) => {
    return res.data;
  });
}
