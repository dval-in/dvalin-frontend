import { error } from '@sveltejs/kit';
import type { CharacterIndex } from '$lib/types/index/character';
import type { WeaponIndex } from '$lib/types/index/weapon';
import BackendService from '$lib/services/backend';
import type { LayoutLoadEvent } from '../../.svelte-kit/types/src/routes/$types';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ fetch }: LayoutLoadEvent) {
	let characterIndex: CharacterIndex;
	let weaponIndex: WeaponIndex;
	const backend = new BackendService();

	const characterIndexResponse = await fetch(backend.data.getCharacterIndex());
	const weaponIndexResponse = await fetch(backend.data.getWeaponIndex());

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
