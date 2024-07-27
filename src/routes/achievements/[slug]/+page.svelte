<script lang="ts">
	import type { PageData } from '../../../../.svelte-kit/types/src/routes/achievements/[slug]/$types';
	import type { AchievementCategoryKey } from '$lib/types/keys/AchievementCategoryKey';
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import Card from '../../../lib/components/ui/card/card.svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import AchievementCheckbox from '$lib/components/ui/checkbox/AchievementCheckbox.svelte';
	export let data: PageData;

	const fetchAchievementCategoryData = data.backend.data.fetchAchievementCategoryData(
		data.achievementCategoryKey as AchievementCategoryKey
	);
</script>

<DefaultLayout isLoading={$fetchAchievementCategoryData.status === 'pending'}>
	{#if $fetchAchievementCategoryData.status === 'success'}
		<div class="grid grid-cols-1 gap-3">
			{#each $fetchAchievementCategoryData.data.achievements as achievement}
				<Card
					class="flex flex-row bg-tertiary/80 justify-between h-full w-full lg:overflow-auto sm:p-0 p-3 border-0"
				>
					<div class="flex flex-col p-3">
						<Text type="h4" class="font-bold text-lg w-full">
							{achievement.name}
						</Text>
						<Text type="p" class="w-full">
							{achievement.desc}
						</Text>
					</div>
					<div class="p-3 flex justify-evenly h-full">
						<AchievementCheckbox size="7" />
					</div>
				</Card>
			{/each}
		</div>
	{/if}
</DefaultLayout>
