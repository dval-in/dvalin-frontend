import type { SlotKey } from './artifact_slot';
import type { StatKey } from './artifact_stat';
import type { ArtifactSetKey } from './keys/ArtifactSetKey';
import type { CharacterKey } from './keys/CharacterKey';

export type IArtifact = {
	setKey: ArtifactSetKey; // E.g. "GladiatorsFinale"
	slotKey: SlotKey; // E.g. "plume"
	level: number; // 0-20 inclusive
	rarity: number; // 1-5 inclusive
	mainStatKey: StatKey;
	characterKey: CharacterKey | ''; // Where "" means not equipped.
	lock: boolean; // Whether the artifact is locked in game.
	substats: ISubstat[];
};

export type ISubstat = {
	key: StatKey;
	value: number; // E.g. 19.4
};
