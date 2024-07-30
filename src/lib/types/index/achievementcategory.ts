import type { AchievementCategoryKey } from '../keys/AchievementCategoryKey';

export type AchievementCategoryIndex = {
	[key in AchievementCategoryKey]?: {
		name: string;
		order: number;
		total: number;
	};
};
