import { applicationState } from '$lib/store/application_state';

export class BackendAuthService {
	private readonly baseUrl: string;

	public constructor(baseUrl: string) {
		this.baseUrl = baseUrl + '/auth';
	}

	login(provider: string) {
		return this.baseUrl + '/' + provider;
	}

	logout() {
		applicationState.update((state) => {
			state.isAuthenticated = false;
			return state;
		});
		window.location.href = `${this.baseUrl}/logout`;
	}

	getProviders() {
		return this.baseUrl;
	}
}
