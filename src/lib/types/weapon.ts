import type { WeaponKey } from '$lib/types/keys/WeaponKey';
import type { CharacterKey } from '$lib/types/keys/CharacterKey';

export type WeaponTypes = 'bow' | 'catalyst' | 'claymore' | 'polearm' | 'sword';

export type IWeapon = {
	key: WeaponKey; // "CrescentPike"
	level: number; // 1-90 inclusive
	ascension: number; // 0-6 inclusive. need to disambiguate 80/90 or 80/80
	refinement: number; // 1-5 inclusive
	location: CharacterKey | ''; // Where "" means not equipped.
	lock: boolean; // Whether the weapon is locked in game.
};
