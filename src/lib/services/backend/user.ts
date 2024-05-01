import { createQuery } from '@tanstack/svelte-query';
import { backendFetch } from '$lib/services/backend/index';
import type { UserProfile } from '$lib/types/user_profile';

type FetchUserProfileResponse = { state: 'SUCCESS'; data: UserProfile };

export class BackendUserService {
	private readonly baseUrl: string;

	public constructor(baseUrl: string) {
		this.baseUrl = baseUrl + '/user';
	}

	fetchUserProfile() {
		return createQuery({
			queryKey: ['fetchUserProfile'],
			queryFn: async () =>
				await backendFetch<FetchUserProfileResponse>(`${this.baseUrl}/wishhistory/status`)
		});
	}
}
