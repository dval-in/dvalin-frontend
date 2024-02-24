import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	if (params.slug === 'character' || params.slug === 'weapon' || params.slug === 'standard') {
		return {
			type: params.slug
		};
	}

	error(404, 'Not found');
}
