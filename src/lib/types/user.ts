import type { ServerKey } from './server';

export interface IUser {
	server: ServerKey;
	ar: number;
	uid: number;
	wl: number;
	name: string;
	namecard: string;
	signature?: string;
}
