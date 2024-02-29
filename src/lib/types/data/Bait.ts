type FishBait = {
	/**
	 * @TJS-required
	 */

	id: string;
	name: string;
	rarity: number;
};

export type Bait = {
	/**
	 * @TJS-required
	 */

	id: string;
	name: string;
	description: string;
	rarity: number;
	craft: Craft;
	fish: FishBait[];
};

type CraftItem = {
	/**
	 * @TJS-required
	 */
	id: string;
	name: string;
	amount: number;
};

type Craft = {
	/**
	 * @TJS-required
	 */
	items: CraftItem[];
	result: number;
};
