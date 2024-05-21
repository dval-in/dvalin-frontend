import i18next from 'i18next';
import { createI18nStore } from 'svelte-i18next';
import { applicationState } from '$lib/store/application_state';
import { get } from 'svelte/store';
import DE from '$lib/locales/DE.json';
import EN from '$lib/locales/EN.json';
import ES from '$lib/locales/ES.json';
import FR from '$lib/locales/FR.json';
import IT from '$lib/locales/IT.json';
import PL from '$lib/locales/PL.json';
import PT from '$lib/locales/PT.json';
import RU from '$lib/locales/RU.json';
import TH from '$lib/locales/TH.json';
import ZHS from '$lib/locales/ZH-S.json';
import ZHT from '$lib/locales/ZH-T.json';
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
			ES,
			FR,
			IT,
			PL,
			PT,
			RU,
			TH,
			ZHS,
			ZHT
		}
	})
	.then(() => {
		i18next.on('languageChanged', function (lng) {
			if (isLocale(lng)) {
				applicationState.update((state) => {
					state.settings.locale = lng;
					return state;
				});
			}
			if (browser) {
				goto(get(page).url.pathname, { invalidateAll: true });
			}
		});
	});

export default i18n;
