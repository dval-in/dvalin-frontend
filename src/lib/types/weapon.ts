import type { CharacterKey } from '$lib/types/keys/CharacterKey';
import type { WeaponKey } from './keys/WeaponKey';

export type WeaponTypes = 'bow' | 'catalyst' | 'claymore' | 'polearm' | 'sword';

export type IWeapon = {
	id: WeaponKey; // "CrescentPike"
	key: string; // "CrescentPike"
	level: number; // 1-90 inclusive
	ascension: number; // 0-6 inclusive. need to disambiguate 80/90 or 80/80
	refinement: number; // 1-5 inclusive
	characterKey?: CharacterKey;
};
