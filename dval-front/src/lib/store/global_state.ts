import { persisted } from 'svelte-persisted-store';
import { type ApplicationState } from '$lib/types/application_state';

const defaultValues: ApplicationState = {
	format: 'dvalin',
	version: 0,
	settings: {
		theme: 'dark',
		locale: 'en'
	},
	user: {
		ar: 0,
		uid: 0,
		wl: 0
	}
};

export const applicationState = persisted('applicationState', defaultValues, {
	storage: 'local',
	syncTabs: true
});
