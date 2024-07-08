import { persisted } from 'svelte-persisted-store';
import type { CharacterIndex } from '$lib/types/index/character';
import type { WeaponIndex } from '$lib/types/index/weapon';
import type { AchievementCategoryIndex } from '$lib/types/index/achievementcategory';

const defaultValues: {
	character: CharacterIndex;
	weapon: WeaponIndex;
	achievementCategory: AchievementCategoryIndex;
} = {
	character: {},
	weapon: {},
	achievementCategory: {}
};

export const dataIndexStore = persisted('dataIndex', defaultValues, {
	storage: 'local',
	syncTabs: true
});
