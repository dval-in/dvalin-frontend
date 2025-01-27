import { createMutation, createQuery, type QueryClient } from '@tanstack/svelte-query';
import { backendDelete, backendFetch, backendPost } from '$lib/services/backend/index';
import type { UserProfile } from '$lib/types/user_profile';
import { applicationState } from '$lib/store/application_state';
import { derived } from 'svelte/store';

type FetchUserProfileResponse =
	| { state: 'NO_GENSHIN_ACCOUNTS' }
	| { state: 'SUCCESS'; data: UserProfile };

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
				queryKey: ['fetchUserProfile', appState.isAuthenticated],
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

	syncUserProfile() {
		return createMutation({
			mutationFn: async (data: { file: object; format: 'paimon' | 'dvalin' }) =>
				await backendPost<FetchUserProfileResponse>(`${this.baseUrl}/sync`, {
					...data.file,
					format: data.format
				})
		});
	}

	deleteUserProfile() {
		return createMutation({
			mutationFn: async () => {
				const response = await backendDelete<{ state: 'SUCCESS' }>(`${this.baseUrl}`);
				if (response.state === 'SUCCESS') {
					this.queryClient.invalidateQueries({ queryKey: ['fetchUserProfile'] });
					return response;
				}
				throw new Error('Failed to delete user profile');
			},
			onSuccess: () => {
				// Optionally, you can perform additional actions on successful deletion
				// For example, updating the application state
				applicationState.update((state) => ({ ...state, isAuthenticated: false }));
			}
		});
	}

	mutateUserAchievements() {
		return createMutation({
			mutationKey: [''],
			mutationFn: async () => {},
			onSuccess: () => {}
		});
	}
}
