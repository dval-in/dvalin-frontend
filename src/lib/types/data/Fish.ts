export type Fish = {
	/**
	 * @TJS-required
	 */

	id: string;
	name: string;
	description: string;
	rarity: number;
	source: string[];
	bait: {
		id: string;
		name: string;
		rarity: number;
	};
};
