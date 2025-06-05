import { Timestamp } from 'firebase/firestore';

export type Chat = {
	chatId: string;
	content: string;
	authorId: string;
	createdAt: Timestamp;
	isEdited: boolean;
}

export type ChatRoom = {
	chatRoomId: string;
	chats: Chat[];
	createdAt: Timestamp;
}