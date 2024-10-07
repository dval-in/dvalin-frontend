<script lang="ts">
	import { writable } from 'svelte/store';
	import BackendService from '$lib/services/backend';
	import i18n from '$lib/services/i18n';
	import type { CreateQueryResult } from '@tanstack/svelte-query';
	import type { mergedAchievements } from '$lib/types/achievement';
	import S3Service from '$lib/services/s3';
	import AchievementCategoryCard from '$lib/components/achievement/AchievementCategoryCard.svelte';
	import AchievementList from '$lib/components/achievement/AchievementList.svelte';
	import { X } from 'lucide-svelte';

	const lang = $i18n.language;
	const backend = BackendService.getInstance();

	const categoriesQuery: CreateQueryResult<string[]> =
		backend.data.fetchAchievementCategoryList(lang);

	const achievementsQueries = writable<{
		[category: string]: CreateQueryResult<mergedAchievements>;
	}>({});
	const achievements = writable<{
		[category: string]: (mergedAchievements & { image?: string }) | undefined;
	}>({});

	let isLoading = true;
	let selectedCategory: string | null = null;

	async function fetchAchievementsAndImages() {
		if ($categoriesQuery.isSuccess && $categoriesQuery.data) {
			const categoryPromises = $categoriesQuery.data.map(async (category) => {
				const query = backend.data.fetchAchievements(lang, category);
				$achievementsQueries[category] = query;

				const achievementData = await new Promise<mergedAchievements | undefined>(
					(resolve) => {
						query.subscribe((result) => {
							if (result.isSuccess && result.data) {
								resolve(result.data);
							}
						});
					}
				);

				const image = await S3Service.getAchievementCategory(category).icon;

				if (achievementData) {
					$achievements[category] = {
						...achievementData,
						image
					};
				}
			});

			await Promise.all(categoryPromises);
			isLoading = false;
		}
	}

	$: if ($categoriesQuery.isSuccess) {
		fetchAchievementsAndImages();
	}

	function handleCategoryClick(category: string) {
		selectedCategory = category;
	}

	function closeAchievementList() {
		selectedCategory = null;
	}
</script>

<div class="flex">
	{#if selectedCategory}
		<div class="w-1/4 p-4">
			{#each Object.entries($achievements) as [category, achievementData]}
				{#if achievementData}
					<div class="mb-4">
						<AchievementCategoryCard
							name={category}
							img={achievementData.image || ''}
							total={achievementData.achievements.length}
							achieved={0}
							inSidebar={true}
							on:click={() => handleCategoryClick(category)}
						/>
					</div>
				{/if}
			{/each}
		</div>
		<div class="w-3/4 p-4 relative">
			<button
				class="absolute top-2 right-2 p-2 rounded-full transition-colors duration-200"
				on:click={closeAchievementList}
			>
				<X size={24} />
			</button>
			<AchievementList achievements={$achievements[selectedCategory]?.achievements || []} />
		</div>
	{:else}
		<div class="w-full p-4">
			{#if isLoading}
				<p>Loading achievements...</p>
			{:else}
				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{#each Object.entries($achievements) as [category, achievementData]}
						{#if achievementData}
							<div class="achievement-category">
								<AchievementCategoryCard
									name={achievementData.name}
									img={achievementData.image || ''}
									total={achievementData.achievements.length}
									achieved={0}
									inSidebar={false}
									on:click={() => handleCategoryClick(category)}
								/>
							</div>
						{/if}
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>
