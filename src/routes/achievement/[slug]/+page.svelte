<script lang="ts">
	import BackendService from '$lib/services/backend';
	import S3Service from '$lib/services/s3';
	import AchievementCategoryCard from '$lib/components/achievement/AchievementCategoryCard.svelte';
	import AchievementList from '$lib/components/achievement/AchievementList.svelte';
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import Progress from '$lib/components/ui/progress/progress.svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { derived } from 'svelte/store';
	import { userProfile } from '$lib/store/user_profile';
	import { dataIndex } from '$lib/store/index_store';
	import i18n from '$lib/services/i18n';
	import type { achievementData } from '$lib/types/achievement';

	export let data: PageData;

	const backend = BackendService.getInstance();
	let sortedAchievements: achievementData[];

	$: fetchAchievements = backend.data.fetchAchievements($i18n.language, data.category);
	$: totalAchivementCount = 0;
	$: sortedAchievements = [];

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

			return categoryArray.toSorted((a, b) => a.order - b.order);
		}
	);

	$: {
		$transformedAchievementCategoryStore.forEach((category) => {
			totalAchivementCount += category.totalAchievementCount;
		});

		if ($fetchAchievements.isSuccess) {
			const a = $fetchAchievements.data.achievements.map((b) => ({
				...b,
				achieved:
					$userProfile.achievements !== undefined
						? Object.keys($userProfile.achievements).includes(b.id.toString())
						: false
			}));

			sortedAchievements = a.toSorted((a, b) => a.id - b.id);
		}
	}

	const closeAchievementList = () => {
		goto('/achievement/');
	};
</script>

<DefaultLayout
	title={$fetchAchievements.data?.name}
	isLoading={$fetchAchievements.isPending}
	onBackClick={closeAchievementList}
>
	<svelte:fragment slot="titlebarActions">
		<Progress value={0} max={totalAchivementCount} />
	</svelte:fragment>

	<div class="flex flex-1 flex-row gap-4">
		<div class="lg:flex flex-col gap-2 hidden">
			{#each $transformedAchievementCategoryStore as category (category.key)}
				<AchievementCategoryCard
					name={category.name}
					img={S3Service.getAchievementCategory(category.key).icon}
					total={category.totalAchievementCount}
					isSelected={category.key === data.category}
					achieved={category.userAchievedCount}
					inSidebar={true}
					link={'/achievement/' + category.key}
				/>
			{/each}
		</div>

		{#if $fetchAchievements.isSuccess}
			<AchievementList achievements={sortedAchievements} />
		{/if}
	</div>
</DefaultLayout>
