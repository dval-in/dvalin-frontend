import type { ArtifactSetKey } from './keys/ArtifactSetKey';

export type IArtifact = {
	setKey: ArtifactSetKey; // E.g. "GladiatorsFinale"
	slotKey: SlotKey; // E.g. "plume"
	level: number; // 0-20 inclusive
	rarity: number; // 1-5 inclusive
	mainStatKey: StatKey;
	characterKey: string | ''; // Where "" means not equipped.
	lock: boolean; // Whether the artifact is locked in game.
	substats: ISubstat[];
};

export type ISubstat = {
	key: StatKey;
	value: number; // E.g. 19.4
};
const slotKeys = ['flower', 'plume', 'sands', 'goblet', 'circlet'];
export type SlotKey = (typeof slotKeys)[number];

export const isSlotKey = (key: string): key is SlotKey => {
	return slotKeys.includes(key);
};

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
