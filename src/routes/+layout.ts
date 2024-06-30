import BackendService from '$lib/services/backend';
import { QueryClient } from '@tanstack/svelte-query';
import { browser } from '$app/environment';
import { io } from 'socket.io-client';
import { applicationState } from '$lib/store/application_state';
import { get } from 'svelte/store';
import { toast } from 'svelte-sonner';
import { userProfile } from '$lib/store/user_profile';
import i18n from '$lib/services/i18n';

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
		const fetchUserProfile = () => {
			backend.user.fetchUserProfile().subscribe((response) => {
				if (response.status === 'success' && response.data.state === 'SUCCESS') {
					userProfile.update((currentProfile) => ({
						...currentProfile,
						...response.data.data,
						lastUpdated: new Date()
					}));
				}
			});
		};

		// Fetch user profile immediately
		fetchUserProfile();

		// Set up interval to fetch user profile
		setInterval(fetchUserProfile, 5 * 60 * 1000);

		const socket = io(import.meta.env.VITE_BACKEND_URL, { withCredentials: true });

		socket.on('authenticationState', (authenticationState) => {
			applicationState.update((state) => ({
				...state,
				isAuthenticated: authenticationState
			}));
		});

		socket.on('invalidateQuery', (queryKey) => {
			queryClient.invalidateQueries({ queryKey });
		});

		socket.on('toast', (toastMessage) => {
			const message = get(i18n).t(toastMessage.message);

			switch (toastMessage.type) {
				case 'success':
					return toast.success(message);
				case 'error':
					return toast.error(message);
				case 'info':
					return toast.info(message);
			}
		});
	}

	return { queryClient, backend };
};
