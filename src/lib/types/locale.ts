const localeList = ['EN', 'DE'];

export type Locale = (typeof localeList)[number];

export const isLocale = (key: string): key is Locale => {
	return localeList.includes(key);
};
