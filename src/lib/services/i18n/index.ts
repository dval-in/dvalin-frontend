import i18next from 'i18next';
import { createI18nStore } from 'svelte-i18next';
import { applicationState } from '$lib/store/global_state';
import { get } from 'svelte/store';
import EN from '$lib/locales/EN.json';
import DE from '$lib/locales/DE.json';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { browser } from '$app/environment';

const i18n = createI18nStore(i18next);

i18next
	.init({
		lng: get(applicationState).settings.locale,
		fallbackLng: 'EN',
		resources: {
			EN,
			DE
		}
	})
	.then(() => {
		i18next.on('languageChanged', function (lng) {
			applicationState.update((a) => ({
				...a,
				settings: {
					...a.settings,
					locale: lng
				}
			}));
			if (browser) {
				goto(get(page).url.pathname, { invalidateAll: true });
			}
		});
	});

export default i18n;
