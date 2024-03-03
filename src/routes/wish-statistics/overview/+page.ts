import { error } from '@sveltejs/kit';
import type { CharacterIndex } from '$lib/types/index/character';
import type { WeaponIndex } from '$lib/types/index/weapon';

/** @type {import('./$types').PageLoad} */
export async function load() {
	let characterIndex: CharacterIndex;
	let weaponIndex: WeaponIndex;

	const characterIndexResponse = await fetch(
		'https://raw.githubusercontent.com/dval-in/dvalin-data/character/data/EN/Character/index.json'
	);

	const weaponIndexResponse = await fetch(
		'https://raw.githubusercontent.com/dval-in/dvalin-data/weapons/data/EN/Weapon/index.json'
	);

	if (characterIndexResponse.ok && weaponIndexResponse.ok) {
		characterIndex = await characterIndexResponse.json();
		weaponIndex = await weaponIndexResponse.json();
	} else {
		error(500, 'Internal error');
	}

	// eslint-disable-next-line @typescript-eslint/naming-convention
	return { Character: characterIndex, Weapon: weaponIndex };
}
