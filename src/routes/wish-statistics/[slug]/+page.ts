import { error } from '@sveltejs/kit';
import type { WishBannerKey } from '$lib/types/keys/WishBannerKey';
import type { RouteParams } from '../../../../.svelte-kit/types/src/routes/wish-statistics/[slug]/$types';

/** @type {import('./$types').PageLoad} */
export async function load({ params }: { params: RouteParams }) {
	let pageType: WishBannerKey;

	switch (params.slug) {
		case 'character':
			pageType = 'CharacterEvent';
			break;
		case 'weapon':
			pageType = 'WeaponEvent';
			break;
		case 'standard':
			pageType = 'Standard';
			break;
		case 'beginner':
			pageType = 'Beginner';
			break;
		case 'chronicled':
			pageType = 'Chronicled';
			break;
		default:
			error(404, 'Not found');
	}

	// eslint-disable-next-line @typescript-eslint/naming-convention
	return { pageType };
}
