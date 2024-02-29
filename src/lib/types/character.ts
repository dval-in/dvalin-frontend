import type { CharacterKey } from '$lib/types/keys/CharacterKey';

export type ICharacters = {
	[key in CharacterKey]?: ICharacter;
};

export type ICharacter = {
	level: number; // 1-90 inclusive
	constellation: number; // 0-6 inclusive
	ascension: number; // 0-6 inclusive. need to disambiguate 80/90 or 80/80
	talent: {
		// Does not include boost from constellations. 1-15 inclusive
		auto: number;
		skill: number;
		burst: number;
	};
};
