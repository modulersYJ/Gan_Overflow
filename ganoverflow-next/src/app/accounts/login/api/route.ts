import Cookies from "js-cookie";
import { ILogIn } from "@/interfaces/accounts";
import { IRegister } from "@/interfaces/accounts";
import { POST } from "@/app/api/routeModule";
import {
  removeUserData,
  setLocalStorageItem,
} from "@/app/utils/common/localStorage";
import { authAPI as API } from "@/app/api/axiosInstanceManager";

// response interceptor 추가
API.interceptors.response.use(
  (response) => {
    // JWT access 토큰이 있으면 응답 본문에서 받아와서 저장
    if (
      response.config.url === "/login" ||
      response.config.url === "/refresh"
    ) {
      const accessToken = response.data.accessToken;
      if (accessToken) {
        Cookies.set("access_token", accessToken);
      }
    }
    return response;
  },
  (error) => {
    // error handling
    return Promise.reject(error);
  }
);

export const login = async (
  userData: ILogIn
): Promise<{
  nickname: string;
  id: string;
  access_token: string;
}> => {
  const response = await POST(API, "login", userData);

  setLocalStorageItem("userData", {
    id: response.data.id,
    nickname: response.data.nickname,
  });

  return response.data;
};

export const refreshAccessToken = async () => {
  await API.post("/refresh");
};

export const logout = async (userId: string): Promise<void> => {
  const headers = {
    headers: {
      Authorization: `Bearer ${Cookies.get("refresh_token")}`,
    },
  };

  const response = await POST(API, "logout", { userId: userId }, headers);
  removeUserData();
  Cookies.remove("refresh_token");
  return response;
};
