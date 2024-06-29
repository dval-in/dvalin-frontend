import { createMutation, createQuery, type QueryClient } from '@tanstack/svelte-query';
import { backendFetch, backendPost } from '$lib/services/backend/index';
import type { UserProfile } from '$lib/types/user_profile';
import { applicationState } from '$lib/store/application_state';
import { derived } from 'svelte/store';

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
			derived(applicationState, (appState) => ({
				queryKey: ['fetchUserProfile', appState],
				staleTime: 60 * 60 * 1000, //1h
				enabled: appState.isAuthenticated,
				queryFn: async () => await backendFetch<FetchUserProfileResponse>(`${this.baseUrl}`)
			})),
			this.queryClient
		);
	}

	createUserProfile() {
		return createMutation({
			mutationFn: async (data: { uid: number; config: object }) =>
				await backendPost<FetchUserProfileResponse>(`${this.baseUrl}/create`, data)
		});
	}

	updateConfig() {
		return createMutation({
			mutationFn: async (data: { config: object }) =>
				await backendPost<FetchUserProfileResponse>(`${this.baseUrl}/config`, data)
		});
	}

	syncUserProfile(data: object, format: 'paimon' | 'dvalin') {
		return createQuery(
			derived(applicationState, (appState) => ({
				queryKey: ['syncUserProfile', appState],
				enabled: appState.isAuthenticated,
				queryFn: async () =>
					await backendPost<FetchUserProfileResponse>(`${this.baseUrl}/sync`, {
						...data,
						format
					})
			})),
			this.queryClient
		);
	}
}
