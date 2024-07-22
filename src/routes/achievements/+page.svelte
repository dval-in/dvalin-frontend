<script lang="ts">
	import { applicationState } from '$lib/store/application_state';
	import { get, derived } from 'svelte/store';
	import { userProfile } from '$lib/store/user_profile';
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import { dataIndexStore } from '$lib/store/index_store';
	import i18n from '$lib/services/i18n';
	import type { AchievementCategoryKey } from '$lib/types/keys/AchievementCategoryKey';
	import AchievementCategoryCard from '$lib/components/ui/card/AchievementCategoryCard.svelte';

	const transformedAchievements = derived([dataIndexStore], ([dataIndexStore]) => {
		const achievements = Object.keys(dataIndexStore.achievementCategory).map((key) => {
			const achievement = dataIndexStore.achievementCategory[key as AchievementCategoryKey];
			return {
				link: `/achievement/${key}`,
				name: achievement!.name,
				order: achievement!.order,
				total: achievement!.total
			};
		});
		return achievements.sort((a, b) => a.order - b.order);
	});

	console.log(get(applicationState));
	console.log(get(userProfile));
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
<!-- svelte-ignore a11y-label-has-associated-control -->
<DefaultLayout title={$i18n.t('achievements.categories.title')}>
	<svelte:fragment slot="titlebarActions"></svelte:fragment>
	<div class="flex flex-wrap gap-3 justify-center">
		{#each $transformedAchievements as achievement}
			<AchievementCategoryCard
				link={achievement.link}
				name={achievement.name}
				img=""
				total={achievement.total}
				achieved={achievement.total}
			/>
		{/each}
	</div>
</DefaultLayout>
