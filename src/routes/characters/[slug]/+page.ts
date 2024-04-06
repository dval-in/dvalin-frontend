import { type CharacterKey } from '$lib/types/keys/CharacterKey';
import { error } from '@sveltejs/kit';
import type { RouteParams } from '../../characters/[slug]/$types';
import type { Character } from '$lib/types/data/Character';
import type { WeaponIndex } from '$lib/types/index/weapon';

/** @type {import('./$types').PageLoad} */
export async function load({ params }: { params: RouteParams }) {
	let characterData: Character;
	let weaponIndex: WeaponIndex;

	const character: CharacterKey = params.slug.charAt(0).toUpperCase() + params.slug.substring(1);

	const characterDataResponse = await fetch(
		`https://raw.githubusercontent.com/dval-in/dvalin-data/main/data/EN/Character/${character}.json`
	);

	const weaponIndexResponse = await fetch(
		'https://raw.githubusercontent.com/dval-in/dvalin-data/main/data/EN/Weapon/index.json'
	);

	if (characterDataResponse.ok && weaponIndexResponse.ok) {
		characterData = await characterDataResponse.json();
		weaponIndex = await weaponIndexResponse.json();
	} else {
		error(500, 'Internal error');
	}

	return { character, characterData, weaponIndex };
}
