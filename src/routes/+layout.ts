import BackendService from '$lib/services/backend';
import { QueryClient } from '@tanstack/svelte-query';
import { browser } from '$app/environment';
import { userProfile } from '$lib/store/user_profile';
import { goto } from '$app/navigation';
import { createSocketServer, socketStore } from '$lib/services/socketServer';

/** @type {import('../../.svelte-kit/types/src/routes/$types').LayoutServerLoad} */
export const load = async () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});
	const backend = BackendService.setupInstance(queryClient);

	if (browser) {
		backend.user.fetchUserProfile().subscribe((response) => {
			if (response.status === 'success') {
				if (response.data.state === 'NO_GENSHIN_ACCOUNTS') {
					goto('/settings/firstlogin');
				}

				if (response.data.state === 'SUCCESS') {
					const serverProfile = response.data.data;

					userProfile.update((localProfile) => ({
						...localProfile,
						...serverProfile,
						lastUpdated: new Date()
					}));
				}
			}
		});

		createSocketServer(import.meta.env.VITE_BACKEND_URL, queryClient);
	}

	return { queryClient, backend, socketStore };
};
