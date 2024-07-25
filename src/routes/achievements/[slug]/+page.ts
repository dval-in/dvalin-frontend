import type { PageLoadEvent } from '../../../../.svelte-kit/types/src/routes/characters/[slug]/$types';
import type { AchievementCategoryKey } from '$lib/types/keys/AchievementCategoryKey';

export async function load({ params, parent, fetch }: PageLoadEvent) {
	const { queryClient, backend } = await parent();
	const key = params.slug;

	await queryClient.prefetchQuery({
		queryKey: ['fetchAchievementCategoryData', key],
		queryFn: async () =>
			(
				await fetch(
					backend.data.getAchievementCategoryDataUrl(key as AchievementCategoryKey)
				)
			).json()
	});

	return { achievementCategoryKey: key };
}
