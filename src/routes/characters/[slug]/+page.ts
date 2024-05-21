import { isCharacterKey } from '$lib/types/keys/CharacterKey';
import { error } from '@sveltejs/kit';
import type { PageLoadEvent } from '../../../../.svelte-kit/types/src/routes/characters/[slug]/$types';

/** @type {import('./$types').PageLoad} */
export async function load({ params, parent, fetch }: PageLoadEvent) {
	const { queryClient, backend } = await parent();
	const key = params.slug;

	if (!isCharacterKey(key)) {
		return error(404, 'Not found');
	}

	await queryClient.prefetchQuery({
		queryKey: ['fetchCharacterData', key],
		queryFn: async () => (await fetch(backend.data.getCharacterDataUrl(key))).json()
	});

	return { characterKey: key };
}
