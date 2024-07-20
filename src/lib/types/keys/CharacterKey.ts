export const characterKeyList = [
	'Albedo',
	'Alhaitham',
	'Aloy',
	'Arlecchino',
	'Amber',
	'AratakiItto',
	'Baizhu',
	'Barbara',
	'Beidou',
	'Bennett',
	'Candace',
	'Charlotte',
	'Chevreuse',
	'Chiori',
	'Chongyun',
	'Clorinde',
	'Collei',
	'Cyno',
	'Dehya',
	'Diluc',
	'Diona',
	'Dori',
	'Emilie',
	'Eula',
	'Faruzan',
	'Fischl',
	'Freminet',
	'Furina',
	'Gaming',
	'Ganyu',
	'Gorou',
	'HuTao',
	'Jean',
	'KaedeharaKazuha',
	'Kaeya',
	'KamisatoAyaka',
	'KamisatoAyato',
	'Kaveh',
	'Keqing',
	'Kirara',
	'Klee',
	'KujouSara',
	'KukiShinobu',
	'Layla',
	'Lisa',
	'Lynette',
	'Lyney',
	'Mika',
	'Mona',
	'Nahida',
	'Navia',
	'Neuvillette',
	'Nilou', // Nilou
	'Ningguang', // Ningguang
	'Noelle', // Noelle
	'Qiqi', // Qiqi
	'RaidenShogun', // Raiden Shogun
	'Razor', // Razor
	'Rosaria', // Rosaria
	'SangonomiyaKokomi', // Sangonomiya Kokomi
	'Sayu', // Sayu
	'Sethos',
	'Shenhe', // Shenhe
	'ShikanoinHeizou', // Shikanoin Heizou
	'Sigewinne',
	'Sucrose', // Sucrose
	'Tartaglia', // Tartaglia
	'Thoma', // Thoma
	'Tighnari', // Tighnari
	'Traveler', // Lumine
	'Venti', // Venti
	'Wanderer', // Wanderer
	'Wriothesley', // Wriothesley
	'Xiangling', // Xiangling
	'Xianyun', // Xianyun
	'Xiao', // Xiao
	'Xingqiu', // Xingqiu
	'Xinyan', // Xinyan
	'YaeMiko', // Yae Miko
	'Yanfei', // Yanfei
	'Yaoyao', // Yaoyao
	'Yelan', // Yelan
	'Yoimiya', // Yoimiya
	'YunJin', // Yun Jin
	'Zhongli' // Zhongli
];

export type CharacterKey = (typeof characterKeyList)[number];

export const isCharacterKey = (key: string): key is CharacterKey => {
	return characterKeyList.includes(key);
};
