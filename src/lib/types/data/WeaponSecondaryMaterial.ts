type Item = {
	/**
	 * @TJS-required
	 */

	id: string;
	name: string;
	amount: number;
};

export type WeaponSecondaryMaterial = {
	/**
	 * @TJS-required
	 */

	id: string;
	name: string;
	description: string;
	source: string[];
	rarity: number;
	craft?: {
		cost: number;
		items: Item[];
	};
};
