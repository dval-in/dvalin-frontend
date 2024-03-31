type Item = {
	/**
	 * @TJS-required
	 */

	id: string;
	name: string;
	amount: number;
};

export type Potion = {
	/**
	 * @TJS-required
	 */

	id: string;
	name: string;
	description: string;
	effect: string;
	rarity: number;
	craft: {
		cost: number;
		items: Item[];
	};
};
