import { error } from '@sveltejs/kit';
import type { CharacterIndex } from '$lib/types/index/character';

/** @type {import('./$types').PageLoad} */
export async function load() {
	let characterIndex: CharacterIndex;

	const characterIndexResponse = await fetch(
		'https://raw.githubusercontent.com/dval-in/dvalin-data/main/data/EN/Character/index.json'
	);

	if (characterIndexResponse.ok) {
		characterIndex = await characterIndexResponse.json();
	} else {
		error(500, 'Internal error');
	}

	return { index: characterIndex };
}
