import { POST } from "@/app/api/routeModule";
import { GET } from "@/app/api/routeModule";

import { IChat, IChatPostSend } from "@/interfaces/chat";
import { chatAPI as API } from "@/app/api/axiosInstanceManager";
import { chatPostAPI } from "@/app/api/axiosInstanceManager";
import { GenerateAuthHeader, IAuthData } from "@/app/api/jwt";

export const sendChat = async (userData: IChat) => {
  const response = await POST(API, "/", userData, null);
  return response.data;
};

export const sendChatPost = async (
  chatPostBody: IChatPostSend,
  authData: IAuthData
) => {
  const response = await POST(
    chatPostAPI,
    "/",
    chatPostBody,
    GenerateAuthHeader(authData)
  );

  return response;
};

export const getAllChatPostsByUserId = async () => {
  const response = await GET("chatposts/my-chats");
  return response;
};

// export const getChatPostsByUser = async (userId: string) => {
//   const response = await GET("chatposts", { userId });

//   return response;
// };

// export const getOneChatPost = async () => {
//   const response = await GET("chatposts");

//   return response;
// };
