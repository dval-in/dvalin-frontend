import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	switch (params.slug) {
		case 'character':
			return { type: 'CharacterEvent' };
		case 'weapon':
			return { type: 'WeaponEvent' };
		case 'standard':
			return { type: 'Standard' };
		case 'beginner':
			return { type: 'Beginner' };
	}

	error(404, 'Not found');
}
