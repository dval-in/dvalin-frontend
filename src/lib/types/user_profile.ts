import type { IUser } from '$lib/types/user';
import type { ICharacters } from '$lib/types/character';
import type { IArtifact } from '$lib/types/artifact';
import type { IAchievements } from '$lib/types/achievement';
import type { IFurnishings } from '$lib/types/furnishing';
import type { IMaterials } from '$lib/types/material';
import type { IWeapon } from '$lib/types/weapon';
import type { IWishes } from '$lib/types/wish';
import type { Config } from './config';

export interface UserProfile {
	format: 'dvalin';
	version: number;
	config: Config;
	account: IUser;
	auth: string[];
	lastUpdated?: Date;
	achievements?: IAchievements;
	artifacts?: IArtifact[];
	characters?: ICharacters;
	furnishing?: IFurnishings;
	materials?: IMaterials;
	weapons?: IWeapon[];
	wishes?: IWishes;
}

export const isDvalinUserProfile = (object: unknown): object is UserProfile => {
	if (typeof object === 'object' && object !== null) {
		if ('format' in object) {
			if (object.format === 'dvalin') {
				return true;
			}
		}
	}
	return false;
};
