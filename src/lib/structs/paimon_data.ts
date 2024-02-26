/* eslint @typescript-eslint/naming-convention: 0 */
export interface PaimonData {
	achievement: {
		[key: string]: {
			[key: string]: boolean;
		};
	};
	'achievement-checklist': {
		[key: string]: {
			[key: string]: boolean;
		};
	};
	ar: number;
	characters: {
		[key: string]: { default: number; wish: number; manual: number };
	};
	'collectables-updated': boolean;
	converted: string;
	fishing: unknown;
	locale: string;
	server: string;
	'tcg-activedeck': number;
	'tcg-decks': {
		name: string;
		characters: { [key: string]: number };
		actions: { [key: string]: number };
	}[];
	todos: unknown[];
	'update-time': string;
	weapons: {
		[key: string]: {
			default: number;
			manual: number;
			wish: number;
		};
	};
	'wish-counter-character-event': {
		total: number;
		legendary: number;
		rare: number;
		pulls: { type: 'weapon' | 'character'; code: string; id: string; time: string; pity: number }[];
		guaranteed: { legendary: boolean; rare: true };
		rateoff: {
			legendary: {
				win: number;
				lose: number;
				maxStreak: number;
				currentStreak: number;
			};
			rare: {
				win: number;
				lose: number;
				maxStreak: number;
				currentStreak: number;
			};
		};
	};
	'wish-counter-setting': { firstTime: boolean; manualInput: boolean };
	'wish-counter-standard': {
		total: number;
		legendary: number;
		rare: number;
		pulls: { type: 'weapon' | 'character'; code: string; id: string; time: string; pity: number }[];
	};
	'wish-counter-weapon-event': {
		total: number;
		legendary: number;
		rare: number;
		pulls: { type: 'weapon' | 'character'; code: string; id: string; time: string; pity: number }[];
		guaranteed: { legendary: boolean; rare: true };
		rateoff: {
			legendary: {
				win: number;
				lose: number;
				maxStreak: number;
				currentStreak: number;
			};
			rare: {
				win: number;
				lose: number;
				maxStreak: number;
				currentStreak: number;
			};
		};
	};

	'wish-uid': number;
	wl: number;
}
