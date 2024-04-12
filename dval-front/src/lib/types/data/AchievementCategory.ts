export type Achievement = {
	/**
	 * @TJS-required
	 */
	id: number;
	name: string;
	desc: string;
	reward: number;
	hidden: boolean;
	order: number;
};

export type AchievementCategory = {
	/**
	 * @TJS-required
	 */

	id: string;
	name: string;
	order: number;
	achievements: Achievement[];
};
