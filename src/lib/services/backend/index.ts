import EnvironmentService from '$lib/services/environment';
import { BackendDataService } from '$lib/services/backend/data';
import { BackendAuthService } from '$lib/services/backend/auth';
import { BackendHoyoService } from '$lib/services/backend/hoyo';
import { goto } from '$app/navigation';
import { toast } from 'svelte-sonner';
import { BackendUserService } from '$lib/services/backend/user';

export type BackendStateResponse = {
	state: 'AUTHENTICATION_REQUIRED' | 'MAINTENANCE' | 'INITIALIZING' | 'MISSING_USER';
};

export const checkBackendResponse = async <T>(r: Response): Promise<BackendStateResponse | T> => {
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
};

export const backendFetch = async <T>(url: string): Promise<BackendStateResponse | T> => {
	return fetch(url, {
		credentials: 'include'
	}).then(checkBackendResponse<T>);
};

export default class BackendService {
	private env: EnvironmentService = EnvironmentService.getInstance();

	public data = new BackendDataService(this.env.variables.backendUrl);
	public auth = new BackendAuthService(this.env.variables.backendUrl);
	public hoyo = new BackendHoyoService(this.env.variables.backendUrl);
	public user = new BackendUserService(this.env.variables.backendUrl);
}
