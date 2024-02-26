import type { Wish } from '$lib/structs/wish';
import type { Weapon } from '$lib/structs/weapon';
import type { Artifact } from '$lib/structs/artifact';
import type { Theme } from '$lib/structs/theme';
import type { Locale } from '$lib/structs/locale';

export interface ApplicationState {
	settings: Settings;
	user: User;
	wishes: Wishes;
	achievements: Achievements;
	characters: Characters;
	tcg: TCG;
	weapons: Weapons;
}

export interface Settings {
	theme: Theme;
	locale: Locale;
}

export interface User {
	ar: number;
	server: 'eu' | 'na' | 'as';
	uid: number;
	wl: number;
}

export interface Wishes {
	bannerHistory: {
		character: Wish[];
		weapon: Wish[];
		standard: Wish[];
	};
}

export interface Achievements {}

export interface Characters {
	[key: string]: {
		currentLevel: number;
		preferredLevel: number;
		talent: number[];
		preferredTalent: number[];
		constellation: number;
		weapon: Weapon;
		artifacts: {
			sands: Artifact;
			goblet: Artifact;
			circlet: Artifact;
		};
	};
}

export interface TCG {}

export interface Weapons {}
