type SkillPoint = {
	/**
	 * @TJS-required
	 */

	id: string;
	type: string;
	count: number;
};
type Entity = {
	/**
	 * @TJS-required
	 */

	id: string;
	name: string;
};
export type MonsterCardSkill = {
	/**
	 * @TJS-required
	 */
	id: string;
	name: string;
	desc: string;
	skillTag: string[];
	points: SkillPoint[];
};
export type TCGMonsterCard = {
	/**
	 * @TJS-required
	 */

	id: string;
	name: string;
	title?: string;
	desc?: string;
	attributes: {
		hp: number;
		cardType: string;
		energy: number;
		element: string;
		weapon: string;
		faction: string[];
		source?: string;
		monster?: Entity;
	};
	skills: MonsterCardSkill[];
};
