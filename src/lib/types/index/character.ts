import type { CharacterKey } from '../keys/CharacterKey';

export type CharacterIndex = {
	[key in CharacterKey]: {
		name: string;
		rarity: number;
	};
};
