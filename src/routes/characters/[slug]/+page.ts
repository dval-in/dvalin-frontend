import { isCharacterKey } from '$lib/types/keys/CharacterKey';
import { error } from '@sveltejs/kit';
import type { PageLoadEvent } from '../../../../.svelte-kit/types/src/routes/characters/[slug]/$types';
import { get } from 'svelte/store';
import i18n from '$lib/services/i18n';

/** @type {import('./$types').PageLoad} */
export async function load({ params, parent, fetch }: PageLoadEvent) {
	const { queryClient, backend } = await parent();
	const lang = get(i18n).language;
	const key = params.slug;

	await queryClient.prefetchQuery({
		queryKey: ['fetchCharacterData', lang, key],
		queryFn: async () => (await fetch(backend.data.getCharacterDataUrl(lang, key))).json()
	});

	return { characterKey: key };
}
