import { createQuery, type QueryClient } from '@tanstack/svelte-query';
import { backendFetch } from '$lib/services/backend/index';
import type { UserProfile } from '$lib/types/user_profile';
import { applicationState } from '$lib/store/application_state';

type FetchUserProfileResponse = { state: 'SUCCESS'; data: UserProfile };

export class BackendUserService {
	private readonly baseUrl: string;
	private isAuthenticated: boolean = false;

	public constructor(
		baseUrl: string,
		private queryClient: QueryClient
	) {
		this.baseUrl = baseUrl + '/user';

		applicationState.subscribe((state) => {
			console.log('application state changed: ' + JSON.stringify(state));
			this.isAuthenticated = state.isAuthenticated;
		});
	}

	fetchUserProfile() {
		return createQuery(
			{
				queryKey: ['fetchUserProfile'],
				staleTime: 60 * 60 * 1000, //1h
				enabled: this.isAuthenticated,
				queryFn: async () => await backendFetch<FetchUserProfileResponse>(`${this.baseUrl}`)
			},
			this.queryClient
		);
	}
}
