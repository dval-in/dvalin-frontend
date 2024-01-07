import i18next from 'i18next';
import { createI18nStore } from 'svelte-i18next';

i18next.init({
	lng: 'en',
	resources: {
		en: {
			translation: {
				key: 'translation'
			}
		}
	}
});
const i18n = createI18nStore(i18next);
export default i18n;
