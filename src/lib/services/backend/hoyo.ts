import { createMutation, createQuery } from '@tanstack/svelte-query';
import { backendFetch, type BackendStateResponse } from '$lib/services/backend/index';

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

	public constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	mutateHoyoWishHistory() {
		return createMutation({
			mutationFn: (authkey: string) =>
				backendFetch<FetchHoyoWishHistoryResponse>(
					`${this.baseUrl}/wishhistory?authkey=${authkey}`
				)
		});
	}

	fetchHoyoWishHistoryStatus() {
		return createQuery<BackendStateResponse | FetchHoyoWishHistoryStatusResponse>({
			queryKey: ['fetchHoyoWishhistoryStatus'],
			queryFn: async () =>
				await backendFetch<FetchHoyoWishHistoryStatusResponse>(
					`${this.baseUrl}/wishhistory/status`
				)
		});
	}
}
