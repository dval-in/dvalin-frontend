import BackendService from '$lib/services/backend';
import { QueryClient } from '@tanstack/svelte-query';
import { browser } from '$app/environment';
import { io } from 'socket.io-client';
import { applicationState } from '$lib/store/application_state';
import { get } from 'svelte/store';
import { toast } from 'svelte-sonner';
import { userProfile } from '$lib/store/user_profile';
import i18n from '$lib/services/i18n';
import { goto } from '$app/navigation';

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

		const socket = io(import.meta.env.VITE_BACKEND_URL, { withCredentials: true });

		socket.on('authenticationState', (authenticationState: boolean) => {
			applicationState.update((state) => ({
				...state,
				isAuthenticated: authenticationState
			}));
		});

		socket.on('invalidateQuery', (queryKey: string[]) => {
			queryClient.invalidateQueries({ queryKey });
		});

		socket.on(
			'toast',
			(toastMessage: { type: 'success' | 'error' | 'info' | 'loading'; message: string }) => {
				const message = get(i18n).t(toastMessage.message);

				switch (toastMessage.type) {
					case 'success':
						return toast.success(message);
					case 'error':
						return toast.error(message);
					case 'info':
						return toast.info(message);
					case 'loading':
						return toast.loading(message);
				}
			}
		);
	}

	return { queryClient, backend };
};
