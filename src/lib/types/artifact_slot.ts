const slotKeys = ['flower', 'plume', 'sands', 'goblet', 'circlet'];
export type SlotKey = (typeof slotKeys)[number];

export const isSlotKey = (key: string): key is SlotKey => {
	return slotKeys.includes(key);
};
