import type { ArtifactSetKey } from '$lib/types/keys/ArtifactSetKey';
import type { SlotKey } from '$lib/types/keys/SlotKey';
import type { StatKey } from '$lib/types/keys/StatKey';
import type { CharacterKey } from '$lib/types/keys/CharacterKey';

export type IArtifact = {
	setKey: ArtifactSetKey; // E.g. "GladiatorsFinale"
	slotKey: SlotKey; // E.g. "plume"
	level: number; // 0-20 inclusive
	rarity: number; // 1-5 inclusive
	mainStatKey: StatKey;
	location: CharacterKey | ''; // Where "" means not equipped.
	lock: boolean; // Whether the artifact is locked in game.
	substats: ISubstat[];
};

export type ISubstat = {
	key: StatKey; // E.g. "critDMG_"
	value: number; // E.g. 19.4
};
