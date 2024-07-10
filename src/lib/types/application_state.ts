import type { ISettings } from '$lib/types/settings';

export interface ApplicationState {
	version: number;
	isAuthenticated: boolean;
	settings: ISettings;
}
