import type { PageLoadEvent } from './$types';
import { get } from 'svelte/store';
import i18n from '$lib/services/i18n';

export async function load({ params, parent, fetch }: PageLoadEvent) {
	const { queryClient, backend } = await parent();
	const lang = get(i18n).language;
	const key = params.slug;

	await queryClient.prefetchQuery({
		queryKey: ['fetchAchievement', lang, key],
		queryFn: async () => (await fetch(backend.data.getAchievementDataUrl(lang, key))).json()
	});

	return { category: key };
}
