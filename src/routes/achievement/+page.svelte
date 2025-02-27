<script lang="ts">
	import i18n from '$lib/services/i18n';
	import AchievementCategoryCard from '$lib/components/achievement/AchievementCategoryCard.svelte';
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Progress from '$lib/components/ui/progress/progress.svelte';
	import S3Service from '$lib/services/s3';
	import { userProfile } from '$lib/store/user_profile';
	import { dataIndex } from '$lib/store/index_store';
	import { derived, writable } from 'svelte/store';
	import { applicationState } from '$lib/store/application_state';

	const hideAchievedCategories = writable(false);
	$: totalAchivementCount = 0;
	$: ac = 0;

	const transformedAchievementCategoryStore = derived(
		[userProfile, dataIndex],
		([_userProfileStore, dataIndexStore]) => {
			return Object.keys(dataIndexStore.achievementCategory).map((key) => ({
				key: key,
				name: dataIndexStore.achievementCategory[key].name,
				order: dataIndexStore.achievementCategory[key].order,
				totalAchievementCount:
					dataIndexStore.achievementCategory[key].totalAchievementCount,
				userAchievedCount: 0
			}));
		}
	);

	const filterStore = derived(
		[transformedAchievementCategoryStore, hideAchievedCategories],
		([achievementCategoryStore, hideAchievedCategoriesStore]) => {
			const filteredCategories = achievementCategoryStore.filter((a) => {
				if (a.order === undefined) {
					return false;
				}
				if (hideAchievedCategoriesStore && a.userAchievedCount >= a.totalAchievementCount) {
					return false;
				}

				return true;
			});

			return filteredCategories.toSorted((a, b) => a.order - b.order);
		}
	);

	$: {
		totalAchivementCount = 0;
		ac = 0;
		$transformedAchievementCategoryStore.forEach((category) => {
			totalAchivementCount += category.totalAchievementCount;
		});
		const a = $userProfile.achievements;
		if (a !== undefined) {
			Object.keys(a).forEach((key) => {
				if (a[key].achieved) {
					ac++;
				}
			});
		}
	}
</script>

<DefaultLayout title={$i18n.t('achievement.title')}>
	<svelte:fragment slot="titlebarActions">
		{#if $applicationState.isAuthenticated}
			<div class="flex flex-row items-center gap-2">
				<Checkbox bind:checked={$hideAchievedCategories} />
				{$i18n.t('achievement.hide_achieved_category')}
			</div>
		{/if}
	</svelte:fragment>

	{#if $applicationState.isAuthenticated}
		<Progress value={ac} max={totalAchivementCount} />
	{/if}

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
		{#each $filterStore as achievementCategory}
			<div class="achievement-category">
				<AchievementCategoryCard
					name={achievementCategory.name}
					img={S3Service.getAchievementCategory(achievementCategory.key).icon}
					total={achievementCategory.totalAchievementCount}
					achieved={achievementCategory.userAchievedCount}
					link={'/achievement/' + achievementCategory.key}
				/>
			</div>
		{/each}
	</div>
</DefaultLayout>
