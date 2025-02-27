<script lang="ts">
	import { mdiCheckAll } from '@mdi/js';
	import Text from '$lib/components/typography/Text.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import {
		Card,
		CardContent,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card/index.js';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import { Progress } from '$lib/components/ui/progress/index.js';
	import i18n from '$lib/services/i18n';
	import { writable } from 'svelte/store';
	import type { achievementData, mergedAchievements } from '$lib/types/achievement.js';
	import { dataIndex } from '$lib/store/index_store';
	import { userProfile } from '$lib/store/user_profile';

	const achievements = writable<{
		[category: string]: (mergedAchievements & { image?: string }) | undefined;
	}>({});

	$: totalAchivementCount = 0;
	$: ac = 0;

	$: {
		totalAchivementCount = 0;
		ac = 0;
		Object.keys($dataIndex.achievementCategory).forEach((key) => {
			totalAchivementCount += $dataIndex.achievementCategory[key].totalAchievementCount;
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

	$: topFiveUniqueAchievements = (() => {
		// Find the category with the highest version
		const latestCategory = Object.values($achievements).reduce<mergedAchievements | undefined>(
			(acc, category) => {
				if (category && (!acc || compareVersions(category.version, acc.version) > 0)) {
					return category;
				}
				return acc;
			},
			undefined
		);

		// If no valid category was found, return an empty array
		if (!latestCategory) {
			return [];
		}

		// Sort achievements by order and filter out duplicates by name
		const uniqueAchievements: achievementData[] = [];
		const seenNames = new Set<string>();

		return latestCategory.achievements
			.sort((a, b) => a.order - b.order)
			.filter((achievement) => {
				if (!seenNames.has(achievement.name)) {
					seenNames.add(achievement.name);
					uniqueAchievements.push(achievement);
					return uniqueAchievements.length <= 5;
				}
				return false;
			});
	})();

	// Helper function to compare version strings
	function compareVersions(v1: string, v2: string): number {
		const parts1 = v1.split('.').map(Number);
		const parts2 = v2.split('.').map(Number);

		for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
			const part1 = parts1[i] || 0;
			const part2 = parts2[i] || 0;

			if (part1 > part2) return 1;
			if (part1 < part2) return -1;
		}

		return 0;
	}
</script>

<Card class="flex flex-col">
	<CardHeader>
		<CardTitle class="flex items-center justify-between">
			<Text type="h4">
				{$i18n.t('dashboard.widget.achievements.title')}
			</Text>
			<Button href="/achievement">
				{$i18n.t('action.more')}
			</Button>
		</CardTitle>
	</CardHeader>
	<CardContent>
		<div class="flex flex-row justify-between">
			<Text type="p">
				{$i18n.t('dashboard.widget.achievements.progress')}:
			</Text>
			<Text type="p">
				{ac}/{totalAchivementCount}
			</Text>
		</div>
		<Progress value={ac} max={totalAchivementCount} class="mt-1.5"></Progress>
		<div class="flex flex-col justify-between gap-1.5">
			<Text type="p">
				{$i18n.t('dashboard.widget.achievements.latest')}:
			</Text>
			<div class="flex flex-col gap-2">
				{#each topFiveUniqueAchievements as achievement}
					<div
						class="bg-neutral relative flex flex-col justify-between rounded-md px-2 py-3"
					>
						<Icon
							path={mdiCheckAll}
							class={`absolute ${
								achievement.achieved ? '!fill-primary' : ''
							}  right-2 top-2`}
						/>
						<Text type="h4">
							{achievement.name}
						</Text>
						<Text type="p">{achievement.desc}</Text>
					</div>
				{/each}
			</div>
		</div>
	</CardContent>
	<CardFooter class="mt-2.5"></CardFooter>
</Card>
