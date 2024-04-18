const localeList = ['DE', 'EN', 'FR', 'IT', 'PL', 'PT', 'RU', 'TH', 'ZHS', 'ZHT'];

export type Locale = (typeof localeList)[number];

export const isLocale = (key: string): key is Locale => {
	return localeList.includes(key);
};
