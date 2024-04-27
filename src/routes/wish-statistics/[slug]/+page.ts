import { error } from '@sveltejs/kit';
import type { WishBannerKey } from '$lib/types/keys/WishBannerKey';
import type { PageLoadEvent } from '../../../../.svelte-kit/types/src/routes/wish-statistics/[slug]/$types';

/** @type {import('./$types').PageLoad} */
export async function load({ params }: PageLoadEvent) {
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

	return { pageType };
}
