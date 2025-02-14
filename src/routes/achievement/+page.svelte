<script lang="ts">
	import i18n from '$lib/services/i18n';
	import AchievementCategoryCard from '$lib/components/achievement/AchievementCategoryCard.svelte';
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Progress from '$lib/components/ui/progress/progress.svelte';
	import S3Service from '$lib/services/s3';
	import { userProfile } from '$lib/store/user_profile';
	import { dataIndex } from '$lib/store/index_store';
	import { derived } from 'svelte/store';

	$: showUnachievedCategory = false;
	$: totalAchivementCount = 0;

	const transformedAchievementCategoryStore = derived(
		[userProfile, dataIndex],
		([_userProfileStore, dataIndexStore]) => {
			const categoryArray = Object.keys(dataIndexStore.achievementCategory).map((key) => ({
				key: key,
				name: dataIndexStore.achievementCategory[key].name,
				order: dataIndexStore.achievementCategory[key].order,
				totalAchievementCount:
					dataIndexStore.achievementCategory[key].totalAchievementCount,
				userAchievedCount: 0
			}));

			const filteredCategories = categoryArray.filter((a) => {
				if (a.order === undefined) {
					return false;
				}
				if (showUnachievedCategory && a.totalAchievementCount === a.userAchievedCount) {
					return false;
				}

				return true;
			});

			return filteredCategories.toSorted((a, b) => a.order - b.order);
		}
	);

	$: {
		$transformedAchievementCategoryStore.forEach((category) => {
			totalAchivementCount += category.totalAchievementCount;
		});
	}
</script>

<DefaultLayout title={$i18n.t('achievement.title')}>
	<svelte:fragment slot="titlebarActions">
		<div class="flex flex-row items-center gap-2">
			<Checkbox bind:checked={showUnachievedCategory} />
			{$i18n.t('achievement.show_unachived_category')}
		</div>
	</svelte:fragment>

	<Progress value={0} max={totalAchivementCount} />

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
		{#each $transformedAchievementCategoryStore as achievementCategory}
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
