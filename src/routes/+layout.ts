import { error } from '@sveltejs/kit';
import type { CharacterIndex } from '$lib/types/index/character';
import type { WeaponIndex } from '$lib/types/index/weapon';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ fetch }) {
	let characterIndex: CharacterIndex;
	let weaponIndex: WeaponIndex;

	const characterIndexResponse = await fetch('https://backend.dval.in/data/Character/index');
	const weaponIndexResponse = await fetch('https://backend.dval.in/data/Weapon/index');

	if (characterIndexResponse.ok && weaponIndexResponse.ok) {
		characterIndex = await characterIndexResponse.json();
		weaponIndex = await weaponIndexResponse.json();
		weaponIndex['Unknown3Star'] = { name: 'Unknown 3 star', rarity: 3 };
	} else {
		error(500, 'Internal error');
	}

	// eslint-disable-next-line @typescript-eslint/naming-convention
	return { character: characterIndex, weapon: weaponIndex };
}
