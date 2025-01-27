export type AchievementCategoryIndex = {
	[key in string]: {
		name: string;
		order: number;
		totalAchievementCount: number;
	};
};
