import { persisted } from 'svelte-persisted-store';
import { Convert as SettingsConvert, type Settings } from '$lib/structs/settings';

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
