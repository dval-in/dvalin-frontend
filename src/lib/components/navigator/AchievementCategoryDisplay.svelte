<script lang="ts">
	import S3Service from '$lib/services/s3';
	import type { AchievementCategoryKey } from '$lib/types/keys/AchievementCategoryKey';
	import { dataIndexStore } from '$lib/store/index_store';
	import { derived } from 'svelte/store';
	import AchievementCategoryCard from '$lib/components/ui/card/AchievementCategoryCard.svelte';

	export let asSidebar: boolean = false;
	export const transformedAchievements = derived([dataIndexStore], ([dataIndexStore]) => {
		const achievements = Object.keys(dataIndexStore.achievementCategory).map((key) => {
			const achievement = dataIndexStore.achievementCategory[key as AchievementCategoryKey];
			return {
				link: `/achievements/${key}`,
				name: achievement!.name,
				order: achievement!.order,
				img: S3Service.getAchievementCategory(key as AchievementCategoryKey).icon,
				total: achievement!.total
			};
		});
		return achievements.sort((a, b) => a.order - b.order);
	});
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
<!-- svelte-ignore a11y-label-has-associated-control -->

{#if asSidebar}
	<div class="flex flex-col justify-center">
		{#each $transformedAchievements as achievement}
			<AchievementCategoryCard
				link={achievement.link}
				name={achievement.name}
				img={achievement.img}
				total={achievement.total}
				achieved={achievement.total}
			/>
		{/each}
	</div>
{:else}
	<div class="flex flex-wrap gap-3 justify-center">
		{#each $transformedAchievements as achievement}
			<AchievementCategoryCard
				link={achievement.link}
				name={achievement.name}
				img={achievement.img}
				total={achievement.total}
				achieved={achievement.total}
			/>
		{/each}
	</div>
{/if}
