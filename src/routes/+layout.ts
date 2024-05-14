import BackendService from '$lib/services/backend';
import { QueryClient } from '@tanstack/svelte-query';
import { browser } from '$app/environment';
import { io } from 'socket.io-client';
import { applicationState } from '$lib/store/application_state';
import { get } from 'svelte/store';
import { toast } from 'svelte-sonner';
import { userProfile } from '$lib/store/user_profile';
import i18n from '$lib/services/i18n';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
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
			if (response.status === 'success' && response.data.state === 'SUCCESS') {
				userProfile.set(response.data.data);
			}
		});

		const socket = io(import.meta.env.VITE_BACKEND_URL, { withCredentials: true });

		socket.on('authenticationState', (authenticationState: boolean) => {
			applicationState.update((state) => {
				state.isAuthenticated = authenticationState;
				return state;
			});
		});

		socket.on('invalidateQuery', (queryKey: string[]) => {
			queryClient.invalidateQueries({ queryKey });
		});

		socket.on(
			'toast',
			(toastMessage: { type: 'success' | 'error' | 'info'; message: string }) => {
				const message = get(i18n).t(toastMessage.message);

				switch (toastMessage.type) {
					case 'success':
						return toast.success(message);
					case 'error':
						return toast.error(message);
					case 'info':
						return toast.info(message);
				}
			}
		);
	}

	return { queryClient };
}
