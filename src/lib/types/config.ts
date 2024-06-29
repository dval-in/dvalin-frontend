export type Config = {
	autoRefine3: boolean;
	autoRefine4: boolean;
	autoRefine5: boolean;
	preferedLanguage: langKey;
};

const langKey = ['en', 'de', 'es', 'fr', 'id', 'ja', 'ko', 'pt', 'ru', 'th', 'vi', 'zh-s', 'zh-t'];

export type langKey = (typeof langKey)[number];

export const isLangKey = (key: string): key is langKey => langKey.includes(key as langKey);
