import { Timestamp } from 'firebase/firestore';
import { Yohaku } from './yohaku';

export type JoinedYohaku = {
	yohaku: Yohaku;
	joinedAt: Timestamp;
};

export type User = {
	userId: string;
	name: string;
	email: string;
	avatar: string;
	friendIds: string[];
	joinedYohakuIds: string[];
	createdAt: Timestamp;
};

export type UserWithJoinedYohaku = User & {
	joinedYohakus: JoinedYohaku[];
};
export type UserWithFriends = User & {
	friends: User[];
};
export type UserWithJoinedYohakuAndFriends = User & {
	joinedYohakus: JoinedYohaku[];
	friends: User[];
};