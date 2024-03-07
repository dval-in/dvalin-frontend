export type FurnitureRecipe = {
	/**
	 * @TJS-required
	 */
	id: string;
	name: string;
	amount: string;
};

export type FurnitureCategory = {
	/**
	 * @TJS-required
	 */

	id: number;
	category: string;
	type?: string;
};

export type Furnishing = {
	/**
	 * @TJS-required
	 */

	id: string;
	originalId: number;
	name: string;
	description: string;
	rarity: number;
	load?: number;
	energy?: number;
	exp?: number;
	category: FurnitureCategory[];
	recipe?: FurnitureRecipe[];
};
