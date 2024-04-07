import { type CharacterKey } from '$lib/types/keys/CharacterKey';
import { error } from '@sveltejs/kit';
import type { Character } from '$lib/types/data/Character';

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
	let characterData: Character;

	const character: CharacterKey = params.slug.charAt(0).toUpperCase() + params.slug.substring(1);

	const characterDataResponse = await fetch(
		`https://raw.githubusercontent.com/dval-in/dvalin-data/main/data/EN/Character/${character}.json`
	);

	if (characterDataResponse.ok) {
		characterData = await characterDataResponse.json();
	} else {
		error(500, 'Internal error');
	}

	return { character, characterData };
}
