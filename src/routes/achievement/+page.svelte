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
	import Button from '$lib/components/ui/button/button.svelte';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import { userProfile } from '$lib/store/user_profile';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import { mdiEye, mdiCardBulletedOutline, mdiClockOutline, mdiFilter } from '@mdi/js';
	import DrawerDropdown from '$lib/components/ui/drawer-dropdown/DrawerDropdown.svelte';
	import IconButton from '$lib/components/ui/icon-button/IconButton.svelte';
	import { DropdownMenuItem } from '$lib/components/ui/dropdown-menu';
	import Icon from '$lib/components/ui/icon/icon.svelte';

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
	$userProfile.achievements;

	async function fetchAchievementsAndImages() {
		if ($categoriesQuery.isSuccess && $categoriesQuery.data) {
			const sortedCategories = $categoriesQuery.data.sort((a, b) => {
				// Special cases: these two categories should come first
				if (a === 'WondersOfTheWorld') return -1;
				if (b === 'WondersOfTheWorld') return 1;
				if (a === 'MemoriesOfTheHeart') return -1;
				if (b === 'MemoriesOfTheHeart') return 1;

				return a.localeCompare(b);
			});
			const categoryPromises = sortedCategories.map(async (category) => {
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
					const updatedAchievements = achievementData.achievements.map((achievement) => {
						const userAchievement = $userProfile.achievements?.[achievement.id];
						return {
							...achievement,
							achieved: userAchievement?.achieved ?? false,
							progression: userAchievement?.progression ?? '',
							version: achievement.version
								? achievement.version
								: achievementData.version
						};
					});

					$achievements[category] = {
						...achievementData,
						achievements: updatedAchievements,
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

	let showUnDoneFirst = false;
	let selectedFilters = {
		hidden: null,
		type: null,
		version: null
	};

	function handleFilterChange(filterType: string, value: any) {
		selectedFilters[filterType as 'hidden' | 'type' | 'version'] = value;
	}

	$: filteredAchievements =
		selectedCategory && $achievements[selectedCategory]
			? $achievements[selectedCategory]!.achievements.filter((achievement) => {
					if (
						selectedFilters.hidden !== null &&
						achievement.hidden !== selectedFilters.hidden
					)
						return false;
					if (selectedFilters.type !== null && achievement.type !== selectedFilters.type)
						return false;
					if (
						selectedFilters.version !== null &&
						achievement.version !== selectedFilters.version
					)
						return false;
					return true;
				})
			: [];

	$: filterOptions =
		selectedCategory && $achievements[selectedCategory]
			? {
					hidden: [true, false],
					type: Array.from(
						new Set(
							$achievements[selectedCategory]!.achievements.map((a) => a.type).filter(
								Boolean
							)
						)
					),
					version: Array.from(
						new Set(
							$achievements[selectedCategory]!.achievements.map(
								(a) => a.version
							).filter(Boolean)
						)
					)
				}
			: { hidden: [], type: [], version: [] };

	function getFilterIcon(filterType: string) {
		switch (filterType) {
			case 'hidden':
				return mdiEye;
			case 'type':
				return mdiCardBulletedOutline;
			case 'version':
				return mdiClockOutline;
			default:
				return mdiFilter;
		}
	}
</script>

<DefaultLayout title={'Achievement'}>
	<div class="flex">
		{#if selectedCategory}
			<ScrollArea class="w-1/3 p-4 pl-0 h-screen">
				{#each Object.entries($achievements) as [category, achievementData]}
					{#if achievementData}
						<div class="mb-4">
							<AchievementCategoryCard
								name={achievementData.name}
								img={achievementData.image || ''}
								total={achievementData.achievements.length}
								isSelected={category === selectedCategory}
								achieved={achievementData.achievements.filter((a) => a.achieved)
									.length}
								inSidebar={true}
								on:click={() => handleCategoryClick(category)}
							/>
						</div>
					{/if}
				{/each}
			</ScrollArea>
			<div class="w-3/4 p-4">
				<div class="w-full flex flex-row-reverse gap-4 mb-4">
					<Button class="p-2 bg-transparent" on:click={closeAchievementList}>
						<X size={24} />
					</Button>
					<div class="flex flex-row items-center gap-2">
						<Checkbox bind:checked={showUnDoneFirst} />
						<p>Show unachieved first</p>
					</div>
					{#each Object.entries(filterOptions) as [filterType, options]}
						<DrawerDropdown>
							<svelte:fragment slot="trigger">
								<IconButton icon={getFilterIcon(filterType)} class={`flex w-full`}>
									{$i18n.t(`filter.${filterType}`, {
										value:
											selectedFilters[filterType] !== null
												? selectedFilters[filterType]
												: $i18n.t('filter.all')
									})}
								</IconButton>
							</svelte:fragment>
							<svelte:fragment slot="dropdown-content">
								<DropdownMenuItem
									class="flex hover:bg-tertiary gap-2"
									on:click={() => handleFilterChange(filterType, null)}
								>
									<Icon path={mdiFilter} />
									{$i18n.t('filter.all')}
								</DropdownMenuItem>
								{#each options as option}
									<DropdownMenuItem
										class="flex hover:bg-tertiary gap-2"
										on:click={() => handleFilterChange(filterType, option)}
									>
										<Icon path={getFilterIcon(filterType)} />
										{$i18n.t(`filter.${filterType}_${option}`)}
									</DropdownMenuItem>
								{/each}
							</svelte:fragment>
						</DrawerDropdown>
					{/each}
				</div>

				<AchievementList
					uid={$userProfile.account.uid.toString()}
					achievements={filteredAchievements}
					{showUnDoneFirst}
				/>
			</div>
		{:else}
			<div class="w-full p-4">
				{#if isLoading}
					<p>Loading achievements...</p>
				{:else}
					<div
						class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
					>
						{#each Object.entries($achievements) as [category, achievementData]}
							{#if achievementData}
								<div class="achievement-category">
									<AchievementCategoryCard
										name={achievementData.name}
										img={achievementData.image || ''}
										total={achievementData.achievements.length}
										achieved={achievementData.achievements.filter(
											(a) => a.achieved
										).length}
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
</DefaultLayout>
