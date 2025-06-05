import { Timestamp } from 'firebase/firestore';
import { User } from "./user";

export type YohakuParticipant = {
	user: User;
	joinedAt: Timestamp;
	isTyping: boolean;
	isOnline: boolean;
};

export type Yohaku = {
	yohakuId: string;
	title: string;
	startDate: Timestamp;
	endDate: Timestamp;
	authorId: string;
	participantIds: string[];
	chatRoomId: string;
	place: string;
	createdAt: Timestamp;
};

export type YohakuWithParticipants = Yohaku & {
	participants: YohakuParticipant[];
};