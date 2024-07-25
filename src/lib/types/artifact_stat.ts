const statKeys = [
	'hp',
	'hp%',
	'atk',
	'atk%',
	'def',
	'def%',
	'elementalMastery',
	'energyRecharge',
	'healingBonus',
	'critRate',
	'critDMG',
	'physicalDmg',
	'anemoDmg',
	'geoDmg',
	'electroDmg',
	'hydroDmg',
	'pyroDmg',
	'cryoDmg',
	'dendroDmg'
];

export type StatKey = (typeof statKeys)[number];

export const isStatKey = (key: string): key is StatKey => {
	return statKeys.includes(key);
};
