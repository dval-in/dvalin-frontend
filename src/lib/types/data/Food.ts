type Ingredient = {
	/**
	 * @TJS-required
	 */
	id: string;
	name: string;
	amount: number;
};

type FoodResult = {
	/**
	 * @TJS-required
	 */
	normal: {
		name: string;
		description: string;
		effect: string;
	};
	delicious: {
		name: string;
		description: string;
		effect: string;
	};
	suspicious: {
		name: string;
		description: string;
		effect: string;
	};
	special?: {
		id: string;
		name: string;
		description: string;
		effect: string;
		character: {
			id: string;
			name: string;
		};
	};
};

export type Food = {
	/**
	 * @TJS-required
	 */

	id: string;
	name: string;
	description: string;
	ingredients: Ingredient[];
	dishType: string;
	results: FoodResult;
	rarity: number;
};
