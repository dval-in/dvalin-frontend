import { createMutation, createQuery } from '@tanstack/svelte-query';
import { goto } from '$app/navigation';
import { toast } from 'svelte-sonner';

type BackendStateResponse = {
	state: 'AUTHENTICATION_REQUIRED' | 'MAINTENANCE' | 'INITIALIZING' | 'MISSING_USER';
};

type FetchHoyoWishHistoryResponse = {
	state: 'MISSING_AUTHKEY' | 'AUTHKEY_INVALID' | 'CREATED';
};

type FetchHoyoWishHistoryStatusResponse =
	| {
			state: 'NO_JOB';
	  }
	| {
			state: 'IN_PROGRESS';
			data: { max: number };
	  }
	| {
			state: 'COMPLETED_RATE_LIMIT';
			data: { completedTime: string };
	  };

export class BackendHoyoService {
	private readonly baseUrl: string;

	public constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	async checkBackendResponse<T>(r: Response): Promise<BackendStateResponse | T> {
		const responseObject = await r.json();

		switch (responseObject.state) {
			case 'MAINTENANCE':
			case 'INITIALIZING':
				goto('/maintenance');
				break;
			case 'AUTHENTICATION_REQUIRED':
				goto('/login');
				toast.error('You are not authenticated!', {
					description: 'Please log in once again'
				});
				break;
			case 'MISSING_USER':
				goto('/');
				toast.error('An error occurred while communicating with backend', {
					description: 'Please send a bugreport on our Discord server'
				});
				break;
		}

		return responseObject;
	}

	private async backendFetch(url: string) {
		return fetch(url, {
			credentials: 'include'
		});
	}

	mutateHoyoWishHistory() {
		return createMutation({
			mutationFn: (authkey: string) =>
				this.backendFetch(this.baseUrl + '/wishhistory?authkey=' + authkey).then(
					this.checkBackendResponse<FetchHoyoWishHistoryResponse>
				)
		});
	}

	fetchHoyoWishHistoryStatus() {
		return createQuery<BackendStateResponse | FetchHoyoWishHistoryStatusResponse>({
			queryKey: ['fetchHoyoWishhistoryStatus'],
			queryFn: async () =>
				await this.backendFetch(this.baseUrl + '/wishhistory/status').then(
					this.checkBackendResponse<FetchHoyoWishHistoryStatusResponse>
				)
		});
	}
}
