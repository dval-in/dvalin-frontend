import type { AchievementCategoryKey } from '$lib/types/keys/AchievementCategoryKey';
import type { AchievementKey } from '$lib/types/keys/AchievementKey';

export type IAchievementCategory = {
	[key in AchievementCategoryKey]: IAchievements;
};

export type IAchievements = {
	[key in AchievementKey]: IAchievement;
};

export type IAchievement = {
	category: AchievementCategoryKey;
	achieved: boolean;
	preStage?: AchievementKey; // Refer to the previous achievements of a series
};
