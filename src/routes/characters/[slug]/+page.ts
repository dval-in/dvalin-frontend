import { isCharacterKey } from '$lib/types/keys/CharacterKey';
import { error } from '@sveltejs/kit';
import type { Character } from '$lib/types/data/Character';
import BackendService from '$lib/services/backend';
import type { PageLoadEvent } from '../../../../.svelte-kit/types/src/routes/characters/[slug]/$types';

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }: PageLoadEvent) {
	let characterData: Character;
	const backend = new BackendService();

	const key = params.slug;

	if (isCharacterKey(key)) {
		const characterDataResponse = await fetch(backend.data.getCharacter(key));
		if (characterDataResponse.ok) {
			characterData = await characterDataResponse.json();
			return { character: key, characterData };
		}
	}

	error(500, 'Internal error');
}
