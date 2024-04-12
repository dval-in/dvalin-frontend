export type ActionCardSkill = {
	/**
	 * @TJS-required
	 */
	name: string;
	desc: string;
};
type Entity = {
	/**
	 * @TJS-required
	 */

	id: string;
	name: string;
	rarity: number;
};
type Energy = {
	/**
	 * @TJS-required
	 */

	id: string;
	type: string;
	count: number;
};
export type TCGActionCard = {
	/**
	 * @TJS-required
	 */

	id: string;
	name: string;
	title: string;
	desc: string;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	in_play_description: string;
	attributes: {
		cost: number;
		costType: string;
		cardType: string;
		energy: Energy[];
		source: string;
		artifact?: Entity;
		character?: Entity;
		food?: Entity;
		weapon?: Entity;
		tags: string[];
	};
	skills: ActionCardSkill[];
};
