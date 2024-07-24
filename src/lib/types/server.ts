const serverKeys = ['Europe', 'America', 'Asia', 'HK-TW', 'China'];

export type ServerKey = (typeof serverKeys)[number];

export const isServerKey = (key: string): key is ServerKey => {
	return serverKeys.includes(key);
};
