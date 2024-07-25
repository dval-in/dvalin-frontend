<script lang="ts">
	import type { PageData } from '../../../../.svelte-kit/types/src/routes/achievements/[slug]/$types';
	import type { AchievementCategoryKey } from '$lib/types/keys/AchievementCategoryKey';
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import Card from '../../../lib/components/ui/card/card.svelte';
	import Text from '$lib/components/typography/Text.svelte';

	export let data: PageData;

	const fetchAchievementCategoryData = data.backend.data.fetchAchievementCategoryData(
		data.achievementCategoryKey as AchievementCategoryKey
	);
</script>

<DefaultLayout isLoading={$fetchAchievementCategoryData.status === 'pending'}>
	{#if $fetchAchievementCategoryData.status === 'success'}
		<section class="grid grid-cols-1 gap-4">
			{#each $fetchAchievementCategoryData.data.achievements as achievement}
				<Card
					class="flex flex-col bg-neutral border-secondary h-full w-full lg:overflow-auto sm:p-0 p-3"
				>
					<Text type="h4" class="font-bold text-lg w-full px-2 py-0">
						{achievement.name}
					</Text>
					<Text type="p" class="w-full px-2">
						{achievement.desc}
					</Text>
				</Card>
			{/each}
		</section>
	{/if}
</DefaultLayout>
