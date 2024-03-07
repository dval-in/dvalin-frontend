import type { MaterialKey } from '$lib/types/keys/MaterialKey';

export type IMaterials = {
	[key in MaterialKey]?: number;
};
