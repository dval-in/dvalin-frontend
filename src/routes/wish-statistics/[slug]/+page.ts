import { error } from '@sveltejs/kit';
import { isWishBannerKey } from '$lib/types/keys/WishBannerKey';
import type { PageLoadEvent } from '../../../../.svelte-kit/types/src/routes/wish-statistics/[slug]/$types';

/** @type {import('./$types').PageLoad} */
export async function load({ params }: PageLoadEvent) {
	if (!isWishBannerKey(params.slug)) {
		return error(404, 'Not found');
	}

	return { pageType: params.slug };
}
