import { type CharacterKey } from '$lib/types/keys/CharacterKey';
import { error } from '@sveltejs/kit';
import type { Character } from '$lib/types/data/Character';
import BackendService from '$lib/services/backend';

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
	let characterData: Character;
	const backend = new BackendService();

	const character: CharacterKey = params.slug.charAt(0).toUpperCase() + params.slug.substring(1);

	const characterDataResponse = await fetch(backend.data.getCharacter(character));

	if (characterDataResponse.ok) {
		characterData = await characterDataResponse.json();
	} else {
		error(500, 'Internal error');
	}

	return { character, characterData };
}
