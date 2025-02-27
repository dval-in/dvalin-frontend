import EnvironmentService from '$lib/services/environment';
import { BackendDataService } from '$lib/services/backend/data';
import { BackendAuthService } from '$lib/services/backend/auth';
import { BackendHoyoService } from '$lib/services/backend/hoyo';
import { goto } from '$app/navigation';
import { toast } from 'svelte-sonner';
import { BackendUserService } from '$lib/services/backend/user';
import type { QueryClient } from '@tanstack/svelte-query';
import { applicationState } from '$lib/store/application_state';
import { BackendAchievementService } from '$lib/services/backend/achievements';
import type SocketService from '$lib/services/socket';
import { userProfile } from '$lib/store/user_profile';
import { BackendGithubService } from '$lib/services/backend/github';

export type BackendStateResponse = {
	state: 'AUTHENTICATION_REQUIRED' | 'MAINTENANCE' | 'INITIALIZING' | 'MISSING_USER';
};

export const checkBackendResponse = async <T extends object>(r: Response): Promise<T> => {
	const responseObject: BackendStateResponse | T = await r.json();

	if ('state' in responseObject) {
		switch (responseObject.state) {
			case 'MAINTENANCE':
			case 'INITIALIZING':
				goto('/maintenance');
				throw 'BACKEND_NOT_RUNNING';
			case 'AUTHENTICATION_REQUIRED':
				goto('/');
				applicationState.update((state) => {
					state.isAuthenticated = false;
					return state;
				});
				userProfile.reset();
				toast.error('You are not authenticated!', {
					description: 'Please log in once again'
				});
				throw 'AUTHENTICATION_REQUIRED';
			case 'MISSING_USER':
				goto('/');
				toast.error('An error occurred while communicating with backend', {
					description: 'Please send a bugreport on our Discord server'
				});
				throw 'MISSING_USER';
		}
	}

	return responseObject;
};

export const backendFetch = async <T extends object>(url: string): Promise<T> => {
	return fetch(url, {
		credentials: 'include'
	}).then(checkBackendResponse<T>);
};

export const backendPost = async <T extends object>(url: string, body: object): Promise<T> => {
	return fetch(url, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	}).then(checkBackendResponse<T>);
};

export const backendDelete = async <T extends object>(url: string): Promise<T> => {
	return fetch(url, {
		method: 'DELETE',
		credentials: 'include'
	}).then(checkBackendResponse<T>);
};

export default class BackendService {
	private env: EnvironmentService = EnvironmentService.getInstance();
	private static instance: BackendService | undefined;
	public data;
	public auth;
	public hoyo;
	public user;
	public achievement;
	public github;

	private constructor(
		private queryClient: QueryClient,
		private socket: SocketService
	) {
		this.data = new BackendDataService(this.env.variables.backendUrl, this.queryClient);
		this.auth = new BackendAuthService(this.env.variables.backendUrl);
		this.hoyo = new BackendHoyoService(this.env.variables.backendUrl, this.queryClient);
		this.user = new BackendUserService(this.env.variables.backendUrl, this.queryClient);
		this.achievement = new BackendAchievementService(
			this.env.variables.backendUrl,
			this.queryClient,
			this.socket
		);
		this.github = new BackendGithubService(this.queryClient);
	}

	public static setupInstance(queryClient: QueryClient, socket: SocketService): BackendService {
		if (this.instance === undefined) {
			this.instance = new BackendService(queryClient, socket);
		}
		return this.instance;
	}

	public static getInstance(): BackendService {
		if (this.instance) {
			return this.instance;
		} else {
			throw new Error('Initialize BackendService with QueryClient first');
		}
	}
}
