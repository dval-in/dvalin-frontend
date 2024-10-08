export type IAchievements = {
	[key in number]: {
		achieved: boolean;
		progression: string;
	};
};

export type mergedAchievements = {
	achievements: achievementData[];
	id: string;
	name: string;
	order: number;
	version: string;
};

export type achievementData = {
	requirements: string;
	requirementQuestLink: string;
	hidden: string;
	type: string;
	version: string;
	steps: string | string[];
	id: number;
	name: string;
	desc: string;
	reward: number;
	order: number;
	preStage?: number;
	achieved?: boolean;
	progression?: string;
};
