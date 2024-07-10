import { persisted } from 'svelte-persisted-store';
import { type ApplicationState } from '$lib/types/application_state';

const defaultValues: ApplicationState = {
	version: 0,
	isAuthenticated: false,
	settings: {
		theme: 'dark',
		locale: 'EN'
	}
};

export const applicationState = persisted('applicationState', defaultValues, {
	storage: 'local',
	syncTabs: true
});
