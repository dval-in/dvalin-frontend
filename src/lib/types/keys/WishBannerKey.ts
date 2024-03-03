const wishBannerKeyList = ['WeaponEvent', 'Standard', 'CharacterEvent', 'Beginner'];

export type WishBannerKey = (typeof wishBannerKeyList)[number];

export const isWishBannerKey = (key: string): key is WishBannerKey => {
	return wishBannerKeyList.includes(key);
};
