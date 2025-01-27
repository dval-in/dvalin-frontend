import { error } from '@sveltejs/kit';
import { isWishBannerKey } from '$lib/types/keys/WishBannerKey';
import type { PageLoadEvent } from './$types';

export async function load({ params }: PageLoadEvent) {
	if (!isWishBannerKey(params.slug)) {
		return error(404, 'Not found');
	}

	return { pageType: params.slug };
}
