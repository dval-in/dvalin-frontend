import i18next from 'i18next';
import { createI18nStore } from 'svelte-i18next';
import { applicationState } from '$lib/store/global_state';
import { get } from 'svelte/store';
import DE from '$lib/locales/DE.json';
import EN from '$lib/locales/EN.json';
import FR from '$lib/locales/FR.json';
import IT from '$lib/locales/IT.json';
import PL from '$lib/locales/PL.json';
import PTBR from '$lib/locales/PTBR.json';
import RU from '$lib/locales/RU.json';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { browser } from '$app/environment';
import { isLocale } from '$lib/types/locale';

const i18n = createI18nStore(i18next);

i18next
	.init({
		lng: get(applicationState).settings.locale,
		fallbackLng: 'EN',
		resources: {
			DE,
			EN,
			FR,
			IT,
			PL,
			PTBR,
			RU
		}
	})
	.then(() => {
		i18next.on('languageChanged', function (lng) {
			if (isLocale(lng)) {
				applicationState.update((state) => ({
					...state,
					settings: {
						...state.settings,
						locale: lng
					}
				}));
			}
			if (browser) {
				goto(get(page).url.pathname, { invalidateAll: true });
			}
		});
	});

export default i18n;
