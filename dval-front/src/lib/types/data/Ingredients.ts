type Item = {
	/**
	 * @TJS-required
	 */

	id: string;
	name: string;
	amount: number;
};

type Recipe = {
	/**
	 * @TJS-required
	 */

	id: string;
	name: string;
};

export type Ingredients = {
	/**
	 * @TJS-required
	 */

	id: string;
	name: string;
	description: string;
	processing?: Item[];
	recipes?: Recipe[];
	source?: string[];
};
