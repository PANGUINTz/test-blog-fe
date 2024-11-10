import { api, api2auth } from "./api";

export const COMMENT_URL = "/comments";

export async function createComment(content: string, slug: string) {
  return api2auth
    .post(`${COMMENT_URL}/${slug}`, { content })
    .then(async (res) => {
      return res.data;
    });
}

export async function deleteComment(slug: string) {
  return api2auth.delete(`${COMMENT_URL}/${slug}`).then(async (res) => {
    return res.data;
  });
}

export async function updateComment(slug: string, content: string) {
  return api2auth
    .put(`${COMMENT_URL}/${slug}`, { content })
    .then(async (res) => {
      return res.data;
    });
}
