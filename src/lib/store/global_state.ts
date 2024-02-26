import { persisted } from 'svelte-persisted-store';
import { type ApplicationState } from '$lib/structs/application_state';

const defaultValues: ApplicationState = {
	settings: {
		theme: 'dark',
		locale: 'en'
	},
	user: {
		ar: 0,
		server: 'eu',
		uid: 0,
		wl: 0
	},
	wishes: {
		bannerHistory: {
			character: [],
			weapon: [],
			standard: []
		}
	},
	achievements: {},
	characters: {},
	weapons: {},
	tcg: {}
};

export const applicationState = persisted('applicationState', defaultValues, {
	storage: 'local',
	syncTabs: true
});
