const localeList = ['DE', 'EN', 'ES', 'FR', 'IT', 'PL', 'PT', 'RU', 'TH', 'VI', 'ZHS', 'ZHT'];

export type Locale = (typeof localeList)[number];

export const isLocale = (key: string): key is Locale => {
	return localeList.includes(key);
};
