import type { CharacterKey } from './keys/CharacterKey';

export type ICharacters = {
	[key in CharacterKey]: ICharacter; // E.g. "Rosaria"
};

export type ICharacter = {
	level: number; // 1-90 inclusive
	constellation: number; // 0-6 inclusive
	ascension: number; // 0-6 inclusive. need to disambiguate 80/90 or 80/80
	talent: {
		// Does not include boost from constellations.
		auto: number;
		skill: number;
		burst: number;
	};
	manualConstellations: number; // constellation added by the user
};
