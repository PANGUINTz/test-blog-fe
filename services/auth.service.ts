import { api, api2auth } from "./api";
import { base64 } from "@/lib";

// TODO: Find where to keep these constants
export const SIGNIN_URL = "/auth/sign-in";
export const SIGNOUT_URL = "/auth/sign-out";
export const SIGNUP_URL = "/auth/sign-up";
export const USER_INFO_URL = "/auth/info";

// TODO: Find where to keep these constants
export const ACCESS_TOKEN_KEY = "access_token";
export const USER_INFO_KEY = "user";

export const getAccessToken = () => {
  if (typeof window === "undefined") return "";

  const jsonString = localStorage.getItem(ACCESS_TOKEN_KEY);

  return jsonString ?? undefined;
};

export const setToken = (accessToken = "") => {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
};

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

export async function destroyUserSession() {
  clearTokens();
  clearUserInfo();
}

export async function signIn(username: string, password: string) {
  return api.post(SIGNIN_URL, { username, password }).then(async (res) => {
    clearTokens();
    setToken(res?.data?.access_token);
    return res.data;
  });
}

export async function signUp(username: string, password: string) {
  return api.post(SIGNUP_URL, { username, password }).then(async (res) => {
    return res.data;
  });
}

export async function logout() {
  const token = getAccessToken();

  if (token === "") throw new Error("No token");

  destroyUserSession();
  return { success: true, message: "logout success" };
}

export const setUserInfo = (userDetail: any) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    USER_INFO_KEY,
    base64.utf8ToB64(JSON.stringify(userDetail))
  );
};

export const clearUserInfo = () => {
  localStorage.removeItem(USER_INFO_KEY);
};

export const getUserInfo = () => {
  if (typeof window === "undefined") return "";

  const jsonString = localStorage.getItem(ACCESS_TOKEN_KEY);

  return jsonString ? JSON.parse(base64.b64ToUtf8(jsonString)) : undefined;
};

export async function getAuthInfo() {
  if (typeof window === "undefined") return "";

  const jsonString = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (jsonString) {
    return api2auth.get(USER_INFO_URL).then(async (res) => {
      clearUserInfo();
      setUserInfo(res?.data);
      return res.data;
    });
  }
  return "";
}
