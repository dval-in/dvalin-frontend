import { createQuery, type QueryClient } from '@tanstack/svelte-query';
import { backendFetch } from '$lib/services/backend/index';
import type { UserProfile } from '$lib/types/user_profile';
import { applicationState } from '$lib/store/application_state';
import { derived } from 'svelte/store';

type FetchUserProfileResponse = { state: 'SUCCESS'; data: UserProfile };

export class BackendUserService {
	private readonly baseUrl: string;

	private queryOptions = derived(applicationState, (appState) => ({
		queryKey: ['fetchUserProfile', appState],
		staleTime: 60 * 60 * 1000, //1h
		enabled: appState.isAuthenticated,
		queryFn: async () => await backendFetch<FetchUserProfileResponse>(`${this.baseUrl}`)
	}));

	public constructor(
		baseUrl: string,
		private queryClient: QueryClient
	) {
		this.baseUrl = baseUrl + '/user';
	}

	fetchUserProfile() {
		return createQuery(this.queryOptions, this.queryClient);
	}
}
