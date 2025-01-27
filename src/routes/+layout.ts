import BackendService from '$lib/services/backend';
import { QueryClient } from '@tanstack/svelte-query';
import { browser } from '$app/environment';
import { userProfile } from '$lib/store/user_profile';
import { goto } from '$app/navigation';
import SocketService from '$lib/services/socket';

export const load = async () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});
	const socket = SocketService.setupInstance(import.meta.env.VITE_BACKEND_URL, queryClient);
	const backend = BackendService.setupInstance(queryClient, socket);

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
	}

	return { queryClient, backend, socket };
};
