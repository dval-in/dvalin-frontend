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
	import * as Tabs from '$lib/components/ui/tabs';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Progress from '$lib/components/ui/progress/progress.svelte';

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
	let showUnachivedCategory = false;

	const customSortAchievements = (achievements: {
		[category: string]:
			| (mergedAchievements & {
					image?: string;
			  })
			| undefined;
	}) => {
		const priorityItems = ['WondersOfTheWorld', 'MemoriesOfTheHeart'];

		return Object.entries(achievements).sort(([categoryA], [categoryB]) => {
			const indexA = priorityItems.indexOf(categoryA);
			const indexB = priorityItems.indexOf(categoryB);

			if (indexA !== -1 && indexB !== -1) {
				return indexA - indexB;
			} else if (indexA !== -1) {
				return -1;
			} else if (indexB !== -1) {
				return 1;
			} else {
				return categoryA.localeCompare(categoryB);
			}
		});
	};

	async function fetchAchievementsAndImages() {
		if ($categoriesQuery.isSuccess && $categoriesQuery.data) {
			const sortedCategories = $categoriesQuery.data.sort((a, b) => a.localeCompare(b));
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
								: achievementData.id === 'WondersOfTheWorld'
									? '0.0'
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
			$achievements = Object.fromEntries(customSortAchievements($achievements));
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
	let selectedFilters: { [key: string]: string | null } = {
		hidden: null,
		type: null,
		version: null
	};

	$: dynamicBadge = Object.entries(selectedFilters).reduce(
		(acc, [key, value]) => {
			if (value !== null) {
				acc[key] = value;
			}
			return acc;
		},
		{} as { [key: string]: string }
	);

	function handleFilterChange(filterType: string, value: any) {
		selectedFilters[filterType as 'hidden' | 'type' | 'version'] = value;
	}

	$: filteredAchievements =
		selectedCategory && $achievements[selectedCategory]
			? $achievements[selectedCategory]!.achievements.filter((achievement) => {
					if (
						selectedFilters.hidden !== null &&
						(!selectedFilters.hidden || achievement.hidden !== selectedFilters.hidden)
					)
						return false;
					if (selectedFilters.type !== null && achievement.type !== selectedFilters.type)
						return false;
					if (
						selectedFilters.version !== null &&
						!achievement.version.startsWith(selectedFilters.version)
					)
						return false;
					return true;
				})
			: [];

	$: filterOptions =
		selectedCategory && $achievements[selectedCategory]
			? {
					hidden: Array.from(
						new Set(
							$achievements[selectedCategory]!.achievements.map(
								(a) => a.hidden
							).filter(Boolean)
						)
					),
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
								(a) => a.version.split('.')[0] + '.X'
							)
								.filter(Boolean)
								.sort((a, b) => {
									return Number(a[0]) - Number(b[0]);
								})
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

	function getVersionSubmenu(majorVersion: string) {
		return $achievements[selectedCategory!]!.achievements.map((a) => a.version)
			.filter((v) => v.startsWith(majorVersion.split('.')[0]))
			.reduce((acc, curr) => {
				const minorVersion = curr.split('.')[1];
				if (!acc.includes(minorVersion)) {
					acc.push(minorVersion);
				}
				return acc;
			}, [] as string[])
			.sort((a, b) => parseInt(a) - parseInt(b));
	}

	$: totalAchievements = Object.values($achievements).reduce(
		(acc, category) => (category ? acc + category.achievements.length : acc),
		0
	);
	$: totalAchieved = Object.values($achievements).reduce(
		(acc, category) =>
			category ? acc + category.achievements.filter((a) => a.achieved).length : acc,
		0
	);
	$: filteredAchievementsCat = Object.entries($achievements).filter(([_, categoryData]) => {
		if (!showUnachivedCategory) return true;
		return (
			categoryData && categoryData.achievements.some((achievement) => !achievement.achieved)
		);
	});
</script>

<DefaultLayout title={$i18n.t('achievement.title')}>
	<Progress value={totalAchieved} max={totalAchievements} />
	<div class="flex flex-row items-center gap-2">
		<Checkbox bind:checked={showUnachivedCategory} />
		{$i18n.t('achievement.show_unachived_category')}
	</div>
	<div class="flex flex-col md:flex-row">
		{#if selectedCategory}
			<ScrollArea class="md:w-1/3 p-4 w-full pl-0 md:h-screen" orientation="both">
				<div class="flex flex-row md:flex-col gap-2">
					{#each filteredAchievementsCat as [category, achievementData]}
						{#if achievementData}
							<div class="md:mb-4 w-full">
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
				</div>
			</ScrollArea>
			<div class="md:w-3/4 p-4">
				<div class="w-full flex flex-row-reverse flex-wrap gap-4 mb-4">
					<Button class="p-2 bg-transparent" on:click={closeAchievementList}>
						<X size={24} />
					</Button>
					<div class="flex flex-row items-center gap-2">
						<Checkbox bind:checked={showUnDoneFirst} />
						<p>{$i18n.t('achievement.unachieved')}</p>
					</div>

					{#each Object.entries(filterOptions) as [filterType, options]}
						<DrawerDropdown>
							<svelte:fragment slot="trigger">
								<IconButton icon={getFilterIcon(filterType)} class={`flex w-full`}>
									{$i18n.t(`achievement.filter.${filterType}`, {
										value: selectedFilters[filterType]
											? selectedFilters[filterType]
											: $i18n.t('achievement.filter.all')
									})}
								</IconButton>
							</svelte:fragment>
							<svelte:fragment slot="dropdown-content">
								<DropdownMenuItem
									class="flex hover:bg-tertiary gap-2"
									on:click={() => handleFilterChange(filterType, null)}
								>
									<Icon path={mdiFilter} />
									{$i18n.t('achievement.filter.all')}
								</DropdownMenuItem>
								{#if filterType === 'version'}
									<Tabs.Root value="1.X" class="min-w-[200px]">
										<Tabs.List>
											{#each options as majorVersion}
												<Tabs.Trigger value={majorVersion}>
													{majorVersion}
												</Tabs.Trigger>
											{/each}
										</Tabs.List>
										{#each options as majorVersion}
											<Tabs.Content value={majorVersion}>
												<div
													class="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3"
												>
													{#each getVersionSubmenu(majorVersion) as minorVersion}
														<Button
															on:click={() =>
																handleFilterChange(
																	filterType,
																	`${majorVersion.split('.')[0]}.${minorVersion}`
																)}
															class="bg-tertiary"
														>
															{`${majorVersion.split('.')[0]}.${minorVersion}`}
														</Button>
													{/each}
												</div>
											</Tabs.Content>
										{/each}
									</Tabs.Root>
								{:else}
									{#each options as option}
										<DropdownMenuItem
											class="flex hover:bg-tertiary gap-2"
											on:click={() => handleFilterChange(filterType, option)}
										>
											<Icon path={getFilterIcon(filterType)} />
											{option}
										</DropdownMenuItem>
									{/each}
								{/if}
							</svelte:fragment>
						</DrawerDropdown>
					{/each}
				</div>
				<div class="flex flex-row items-center">
					{#each Object.entries(dynamicBadge) as [filter, value]}
						<Badge
							class="flex flex-row items-center justify-between"
							isClosing
							onClose={() => {
								handleFilterChange(filter, null);
							}}
						>
							{value}
						</Badge>
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
						{#each filteredAchievementsCat as [category, achievementData]}
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
