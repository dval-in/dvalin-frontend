type AscensionMaterial = {
	/**
	 * @TJS-required
	 */

	id: string;
	name: string;
	amount: number;
	rarity: number;
};

export type WeaponAscension = {
	/**
	 * @TJS-required
	 */
	ascension: number;
	level: number;
	cost: number;
	materials: AscensionMaterial[];
};

type WeaponRefinement = {
	/**
	 * @TJS-required
	 */
	refinement: number;
	desc: string;
};

type StatLevel = {
	/**
	 * @TJS-required
	 */
	ascension: number;
	level: number;
	primary: number;
	secondary?: number;
};

type WeaponStat = {
	/**
	 * @TJS-required
	 */
	primary: string;
	secondary?: string;
	levels: StatLevel[];
};

export type Weapon = {
	/**
	 * @TJS-required
	 */

	id: string;
	name: string;
	description: string;
	rarity: number;
	type: string;
	domain: string;
	passive: string;
	bonus: string;
	stats: WeaponStat;
	ascensions: WeaponAscension[];
	refinementRaw: {
		name: string;
		template: string;
		params: [string[]];
	};
	refinements: WeaponRefinement[];
};
