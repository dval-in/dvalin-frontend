import { writable } from 'svelte/store';
import { persisted } from 'svelte-persisted-store';
import { type Settings, Convert as SettingsConvert } from '$lib/structs/settings';

export const showSidebar = writable(false);
export const showSidebarSections = persisted('showSidebarSections', [true, true, true]);

export const settings = persisted(
	'settings',
	{
		global: {
			theme: 0
		},
		user: {
			logined: false,
			email: '',
			username: ''
		}
	},
	{
		storage: 'local',
		syncTabs: true,
		serializer: {
			parse: (text: string): Settings => {
				return SettingsConvert.toSettings(text);
			},
			stringify: (data: Settings): string => {
				return SettingsConvert.settingsToJson(data);
			}
		}
	}
);
