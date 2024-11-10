import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL as string;

export const api = axios.create({
  baseURL: baseUrl,
});

export const api2auth = axios.create({
  baseURL: baseUrl,
});

api2auth.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
