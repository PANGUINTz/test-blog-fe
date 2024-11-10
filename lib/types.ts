export interface Credential {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
  slug: string;
}

export interface Blog {
  id: number;
  title: string;
  content: string;
  category: string;
  slug: string;
  createdAt: string;
  user: {
    id: number;
    username: string;
  };
  comment: {
    id: number;
    content: string;
    createdAt: string;
    slug: string;
    user: {
      id: number;
      username: string;
    };
  }[];
}

export interface createBlog {
  title: string;
  content: string;
  category: string;
}

export interface createComment {
  content: string;
}
