import { createQuery, type QueryClient } from '@tanstack/svelte-query';
import { backendFetch } from '$lib/services/backend/index';
import type { UserProfile } from '$lib/types/user_profile';

type FetchUserProfileResponse = { state: 'SUCCESS'; data: UserProfile };

export class BackendUserService {
	private readonly baseUrl: string;

	public constructor(
		baseUrl: string,
		private queryClient: QueryClient
	) {
		this.baseUrl = baseUrl + '/user';
	}

	fetchUserProfile() {
		return createQuery(
			{
				queryKey: ['fetchUserProfile'],
				staleTime: 60 * 60 * 1000, //1h
				queryFn: async () => await backendFetch<FetchUserProfileResponse>(`${this.baseUrl}`)
			},
			this.queryClient
		);
	}
}
