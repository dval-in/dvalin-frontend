import { browser } from '$app/environment';
import { getCookie } from '$lib/utils';

export class BackendAuthService {
	private readonly baseUrl: string;

	public constructor(baseUrl: string) {
		this.baseUrl = baseUrl + '/auth';
	}

	login(provider: string) {
		return this.baseUrl + '/' + provider;
	}

	logout() {
		return this.baseUrl + '/logout';
	}

	getProviders() {
		return this.baseUrl;
	}

	isAuthenticated() {
		if (browser) {
			return getCookie('consentUUID') !== null;
		}

		return false;
	}
}
