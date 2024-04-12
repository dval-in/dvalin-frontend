import type { WeaponKey } from '$lib/types/keys/WeaponKey';

export type WeaponIndex = {
	[key in WeaponKey]: {
		name: string;
		rarity: number;
	};
};
