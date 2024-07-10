import { persisted } from 'svelte-persisted-store';
import type { UserProfile } from '$lib/types/user_profile';

const defaultValues: UserProfile = {
	format: 'dvalin',
	version: 0,
	user: {
		ar: 0,
		uid: 0,
		wl: 0
	}
};

export const userProfile = persisted('userProfile', defaultValues, {
	storage: 'local',
	syncTabs: true
});
