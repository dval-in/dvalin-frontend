import type { WishBannerKey } from '$lib/types/keys/WishBannerKey';
import type { WeaponKey } from '$lib/types/keys/WeaponKey';
import type { CharacterKey } from '$lib/types/keys/CharacterKey';

export type IWishes = {
	[key in WishBannerKey]?: IWish[];
};

export type IWish = {
	type: 'Weapon' | 'Character';
	number: number;
	key: WeaponKey | CharacterKey;
	date: Date;
	pity: number;
	banner: string;
	bannerId: string;
	rarity: number;
	order: number;
	isFeatured: boolean;
	wonFiftyFifty: boolean;
};

export type INamedWishes = {
	[key in WishBannerKey]?: INamedWish[];
};

export interface INamedWish extends IWish {
	name: string;
}
