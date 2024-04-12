import type { FurnishingKey } from '$lib/types/keys/FurnishingKey';

export type IFurnishings = {
	[key in FurnishingKey]?: number;
};
