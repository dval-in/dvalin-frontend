import { persisted } from 'svelte-persisted-store';
import type { CharacterIndex } from '$lib/types/index/character';
import type { WeaponIndex } from '$lib/types/index/weapon';

const defaultValues: { character: CharacterIndex; weapon: WeaponIndex } = {
	character: {},
	weapon: {}
};

export const dataIndexStore = persisted('dataIndex', defaultValues, {
	storage: 'local',
	syncTabs: true
});
