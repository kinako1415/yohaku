import { User } from "./user";

export type Chat = {
  chatId: string;
  content: string;
  author: User;
  createdAt: Date;
};

export type ChatRoom = {
  chatRoomId: string;
  chats: Chat[];
  createdAt: Date;
};
