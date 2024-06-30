import { createMutation, createQuery, type QueryClient } from '@tanstack/svelte-query';
import { backendFetch, type BackendStateResponse } from '$lib/services/backend/index';
import { derived } from 'svelte/store';
import { applicationState } from '$lib/store/application_state';

type FetchHoyoWishHistoryResponse = {
	state: 'MISSING_AUTHKEY' | 'AUTHKEY_INVALID' | 'CREATED';
};

type FetchHoyoWishHistoryStatusResponse =
	| {
			state: 'NO_JOB';
	  }
	| {
			state: 'QUEUED';
			data: { count: number };
	  }
	| { state: 'ACTIVE' }
	| {
			state: 'COMPLETED_RATE_LIMIT';
			data: { completedTimestamp: string; rateLimitDuration: number };
	  };

export class BackendHoyoService {
	private readonly baseUrl: string;

	public constructor(
		baseUrl: string,
		private queryClient: QueryClient
	) {
		this.baseUrl = baseUrl;
	}

	mutateHoyoWishHistory() {
		return createMutation(
			{
				mutationFn: (authkey: string) =>
					backendFetch<FetchHoyoWishHistoryResponse>(
						`${this.baseUrl}/wish?authkey=${authkey}`
					)
			},
			this.queryClient
		);
	}

	fetchHoyoWishHistoryStatus() {
		return createQuery<BackendStateResponse | FetchHoyoWishHistoryStatusResponse>(
			derived(applicationState, (appState) => ({
				queryKey: ['fetchHoyoWishStatus', appState.isAuthenticated],
				//staleTime: 60 * 60 * 1000, //1h
				queryFn: async () =>
					await backendFetch<FetchHoyoWishHistoryStatusResponse>(
						this.getHoyoWishHistoryStatusUrl()
					),
				enabled: appState.isAuthenticated
			})),
			this.queryClient
		);
	}

	getHoyoWishHistoryStatusUrl() {
		return `${this.baseUrl}/wish/status`;
	}
}
