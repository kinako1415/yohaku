import { Timestamp } from 'firebase/firestore';
import { User } from './user';

export type Chat = {
	chatId: string;
	content: string;
	author: User;
	createdAt: Timestamp;
}

export type ChatRoom = {
	chatRoomId: string;
	chats: Chat[];
	createdAt: Timestamp;
}