import { Yohaku } from './yohaku';

export interface JoinedYohaku extends Yohaku {
	joinedAt: Date;
}

export interface User {
	userId: string;
	name: string;
	email: string;
	avatar: string;
	joinedYohakus: JoinedYohaku[];
	friends: User[];
	createdAt: Date;
}