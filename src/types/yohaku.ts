import { ChatRoom } from "./chatRoom";
import { User } from "./user";

export interface YohakuParticipant extends User {
  joinedAt: Date;
}

export interface Yohaku {
	yohakuId: string;
	title: string;
	startDate: Date;
	endDate: Date;
	author: User;
	participants: YohakuParticipant[];
	chatRoom: ChatRoom;
	place: string;
	createdAt: Date;
}
