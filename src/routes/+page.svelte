<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import Text from '$lib/components/typography/Text.svelte';
	import S3Service from '$lib/services/s3';
	import i18n from '$lib/services/i18n';
	import { Progress } from '$lib/components/ui/progress';
	import * as Dialog from '$lib/components/ui/dialog';
	import DragDropList from '$lib/components/ui/dragdrop/DragDropList.svelte';
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import IconButton from '$lib/components/ui/icon-button/IconButton.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import PullChip from '$lib/components/ui/pull-chip/PullChip.svelte';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';

	import {
		mdiPencil,
		mdiImport,
		mdiAccount,
		mdiSwordCross,
		mdiCheckAll,
		mdiInfinity
	} from '@mdi/js';
	import CharCard from '$lib/components/ui/card/WeapCard.svelte';
	import type { Elements } from '$lib/types/elements';
	import type { WeaponTypes } from '$lib/types/weapon';
	import { onMount } from 'svelte';
	import { userProfile } from '$lib/store/user_profile';
	import BackendService from '$lib/services/backend';
	import type { CreateQueryResult } from '@tanstack/svelte-query';
	import { writable } from 'svelte/store';
	import type { achievementData, mergedAchievements } from '$lib/types/achievement';
	import type { UserProfile } from '$lib/types/user_profile';
	import type { IWish } from '$lib/types/wish';

	let changeLog = ` `;
	let currentVer = `4.5`;

	$: changeLogWidget = $i18n.t('dashboard.widget.changelog.title');
	$: reminderWidget = $i18n.t('dashboard.widget.reminder.title');
	$: eventsWidget = $i18n.t('dashboard.widget.events.title');
	$: todoWidget = $i18n.t('dashboard.widget.todo.title');
	$: domainWidget = $i18n.t('dashboard.widget.domain.title');
	$: achievementsWidget = $i18n.t('dashboard.widget.achievements.title');
	$: pityWidget = $i18n.t('dashboard.widget.pity.title');
	$: wishingWidget = $i18n.t('dashboard.widget.wishing.title');
	$: displayWidget = $i18n.t('dashboard.widget.display.title');
	$: globalWishingWidget = $i18n.t('dashboard.widget.global_wishing.title');
	$: resinWidget = $i18n.t('dashboard.widget.resin.title');

	$: dragDropList = [
		{ id: 0, check: changeLogWidget, checked: true },
		{ id: 1, check: reminderWidget, checked: true },
		{ id: 2, check: eventsWidget, checked: true },
		{ id: 3, check: todoWidget, checked: true },
		{ id: 4, check: domainWidget, checked: true },
		{ id: 5, check: achievementsWidget, checked: true },
		{ id: 6, check: pityWidget, checked: true },
		{ id: 7, check: wishingWidget, checked: true },
		{ id: 8, check: displayWidget, checked: true },
		{ id: 9, check: globalWishingWidget, checked: true },
		{ id: 10, check: resinWidget, checked: true }
	];

	type Event = {
		id: number;
		name: string;
		desc: string;
		start: Date;
		end: Date;
	};

	const mockEvent: Event = {
		id: 0,
		name: 'Test Event',
		desc: 'lorem ipsum',
		start: new Date(2024, 3, 8, 5, 59),
		end: new Date(2024, 3, 18, 5, 59)
	};

	type character = {
		obtained: boolean;
		link: string;
		name: string;
		element: Elements;
		weapon: WeaponTypes;
		img: string;
		rarity: number;
	};

	const transformIntoElements = (element: string): Elements => {
		switch (element) {
			case 'Pyro':
				return 'pyro';
			case 'Hydro':
				return 'hydro';
			case 'Anemo':
				return 'anemo';
			case 'Electro':
				return 'electro';
			case 'Dendro':
				return 'dendro';
			case 'Cryo':
				return 'cryo';
			case 'Geo':
				return 'geo';
			default:
				return 'anemo';
		}
	};

	const transformIntoWeapons = (weapon: string): WeaponTypes => {
		switch (weapon) {
			case 'Sword':
				return 'sword';
			case 'Claymore':
				return 'claymore';
			case 'Polearm':
				return 'polearm';
			case 'Catalyst':
				return 'catalyst';
			case 'Bow':
				return 'bow';
			default:
				return 'sword';
		}
	};

	const displayed_character: character = {
		obtained: true,
		link: `/characters/${'Amber'}`,
		name: 'David',
		element: transformIntoElements('Anemo'),
		weapon: transformIntoWeapons('Catalyst'),
		img: S3Service.getCharacter('Amber').icon,
		rarity: 5
	};

	const backend = BackendService.getInstance();
	const lang = $i18n.language;
	const categoriesQuery: CreateQueryResult<string[]> =
		backend.data.fetchAchievementCategoryList(lang);
	const achievementsQueries = writable<{
		[category: string]: CreateQueryResult<mergedAchievements>;
	}>({});
	const achievements = writable<{
		[category: string]: (mergedAchievements & { image?: string }) | undefined;
	}>({});
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
						achievements: updatedAchievements
					};
				}
			});

			await Promise.all(categoryPromises);
		}
	}
	$: if ($categoriesQuery.isSuccess) {
		fetchAchievementsAndImages();
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

	function calculateFiveStarPity(wishes: IWish[]): number {
		let pityCount = 0;

		for (const wish of wishes) {
			if (wish.rarity === 5) {
				break;
			}
			pityCount++;
		}

		return pityCount;
	}

	function calculateFourStarPity(wishes: IWish[]): number {
		let pityCount = 0;

		for (const wish of wishes) {
			if (wish.rarity === 4) {
				break;
			}
			pityCount++;
		}

		return pityCount;
	}

	const card = S3Service.getCharacter('Amber').gachaCard;

	let firstTimeUser = false;

	type GachaCharacterWishingData = {
		name: string;
		pulls: number;
		percentage: number;
		average: number;
	};

	let currentGachaFirst: GachaCharacterWishingData = {
		name: 'Amber',
		pulls: 13994,
		percentage: 23,
		average: 25
	};

	let currentGachaSecond: GachaCharacterWishingData = {
		name: 'Amber',
		pulls: 1994,
		percentage: 12,
		average: 55
	};

	let submissions: number = 69420;

	let currentResin: number = 12;
	let maxResin: number = 200;

	let resinRegenTime = 8;

	let currentDate = new Date();

	$: currentTime = currentDate.getTime();

	onMount(() => {
		const interval = setInterval(() => {
			currentDate = new Date();
		}, 5000);

		return () => {
			clearInterval(interval);
		};
	});

	$: ResinCounter = {
		HandleInput(): void {
			let temp = currentResin.toString();
			temp = temp.replace(/[.e]/g, '');
			currentResin = parseInt(temp);
			if (currentResin > 2000) currentResin = maxResin;
			else if (currentResin < 1 || !currentResin) currentResin = 0;
		},

		increaseResin(n: number): void {
			currentResin += n;
			if (currentResin > 2000) currentResin = maxResin;
		},

		decreaseResin(n: number): void {
			currentResin -= n;
			if (currentResin < 0) currentResin = 0;
		},

		countTimeLeft(goal: number): string {
			let output: string;

			let minutesTillRegen = (goal - currentResin) * resinRegenTime;
			let hoursTillRegen = Math.floor(minutesTillRegen / 60);
			minutesTillRegen -= hoursTillRegen * 60;

			if (hoursTillRegen == 0)
				output = `${minutesTillRegen}${$i18n.t('dashboard.widget.resin.hour')}`;
			else if (minutesTillRegen > 0)
				output = `${hoursTillRegen}${$i18n.t('dashboard.widget.resin.hour')} ${minutesTillRegen}${$i18n.t('dashboard.widget.resin.minute')}`;
			else output = `${hoursTillRegen}${$i18n.t('dashboard.widget.resin.hour')}`;

			return output;
		},

		countEndTime(goal: number): string {
			let output: string;

			let currentMins = currentDate.getMinutes();
			let currentHours = currentDate.getHours();

			let minutesTillRegen = currentMins + (goal - currentResin) * resinRegenTime;
			let hoursTillRegen = Math.floor(minutesTillRegen / 60);
			minutesTillRegen -= hoursTillRegen * 60;

			let endHours = ((currentHours + hoursTillRegen) % 24).toString().padStart(2, '0');
			let endMins = minutesTillRegen.toString().padStart(2, '0');

			output = `${endHours}:${endMins}`;

			return output;
		}
	};
	function getLatestWishes(userProfile: UserProfile, count: number = 6) {
		// Combine all wishes from different banners
		const allWishes = [
			...(userProfile.wishes?.Beginner ?? []),
			...(userProfile.wishes?.CharacterEvent ?? []),
			...(userProfile.wishes?.Chronicled ?? []),
			...(userProfile.wishes?.Standard ?? []),
			...(userProfile.wishes?.WeaponEvent ?? [])
		];

		// Sort wishes by date in descending order (most recent first)
		const sortedWishes = allWishes
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
			.filter((wish) => wish.rarity === 5);

		// Return the specified number of latest wishes
		return sortedWishes.slice(0, count);
	}
</script>

<AlertDialog.Root open={firstTimeUser}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>{$i18n.t('dashboard.welcome.title')}</AlertDialog.Title>
			<AlertDialog.Description>
				{$i18n.t('dashboard.welcome.message')}
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>{$i18n.t('action.cancel')}</AlertDialog.Cancel>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

<DefaultLayout title={$i18n.t('dashboard.title')}>
	<svelte:fragment slot="titlebarActions">
		<Dialog.Root>
			<Dialog.Trigger>
				<IconButton icon={mdiPencil}>{$i18n.t('dashboard.edit_layout.button')}</IconButton>
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>
						<Text type="h3">{$i18n.t('dashboard.edit_layout.title')}</Text>
					</Dialog.Title>
					<Dialog.Description>
						<Text type="p">{$i18n.t('dashboard.edit_layout.description')}</Text>
					</Dialog.Description>
				</Dialog.Header>
				<div>
					<DragDropList bind:data={dragDropList} />
				</div>
			</Dialog.Content>
		</Dialog.Root>
	</svelte:fragment>
	<div>
		<div
			class="h-fit gap-2 [column-count:auto] [column-width:370px] [&>div:not(:first-child)]:mt-2 [&>div]:break-inside-avoid"
		>
			{#each dragDropList as Widget}
				{#if Widget.check === `${$i18n.t('dashboard.widget.changelog.title')}` && Widget.checked == true}
					<!-- Changelog card -->
					<Card.Root class=" flex flex-col">
						<Card.Header>
							<Card.Title>
								<Text type="h4">
									{$i18n.t('dashboard.widget.changelog.title')}:
								</Text>
							</Card.Title>
						</Card.Header>
						<Card.Content class="whitespace-pre-line">
							<Text type="p">{changeLog}</Text>
						</Card.Content>
						<Card.Footer class="mt-2.5 items-end justify-end">
							<Button>{$i18n.t('action.more')}</Button>
						</Card.Footer>
					</Card.Root>
				{/if}
				{#if Widget.check === `${$i18n.t('dashboard.widget.reminder.title')}` && Widget.checked == true}
					<!-- Reminder card -->
					<Card.Root class=" flex flex-col">
						<Card.Header>
							<Card.Title>
								<Text type="h4">{$i18n.t('dashboard.widget.reminder.title')}</Text>
							</Card.Title>
						</Card.Header>
						<Card.Content>
							<!-- The checks will uncheck themselves after N server resets -->

							<!-- Daily -->
							<Text type="large">{$i18n.t('dashboard.widget.reminder.daily')}</Text>
							<div class="flex flex-row items-center">
								<Checkbox id="reminder_teapot" class="mr-3" />
								<Label for="reminder_teapot" class="text-base font-normal">
									<Text type="p">
										{$i18n.t('dashboard.widget.reminder.daily.teapot_currency')}
									</Text>
								</Label>
							</div>
							<div class="flex flex-row items-center">
								<Checkbox id="reminder_commissions" class="mr-3" />
								<Label for="reminder_commissions" class="text-base font-normal">
									<Text type="p">
										{$i18n.t('dashboard.widget.reminder.daily.commissions')}
									</Text>
								</Label>
							</div>
							<div class="flex flex-row items-center">
								<Checkbox id="reminder_resin" class="mr-3" />
								<Label for="reminder_resin" class="text-base font-normal">
									<Text type="p">
										{$i18n.t('dashboard.widget.reminder.daily.resin')}
									</Text>
								</Label>
							</div>
							<div class="flex flex-row items-center">
								<Checkbox id="reminder_welkin" class="mr-3" />
								<Label for="reminder_welkin" class="text-base font-normal">
									<Text type="p">
										{$i18n.t('dashboard.widget.reminder.daily.welkin')}
									</Text>
								</Label>
							</div>

							<!-- Every 2 days -->
							<Text type="large">
								{$i18n.t('dashboard.widget.reminder.two_day.title')}
							</Text>
							<div class="flex flex-row items-center">
								<Checkbox id="reminder_local" class="mr-3" />
								<Label for="reminder_local" class="text-base font-normal">
									<Text type="p">
										{$i18n.t(
											'dashboard.widget.reminder.two_day.local_specialties'
										)}
									</Text>
								</Label>
							</div>
							<div class="flex flex-row items-center">
								<Checkbox id="reminder_ore" class="mr-3" />
								<Label for="reminder_ore" class="text-base font-normal">
									<Text type="p">
										{$i18n.t('dashboard.widget.reminder.two_day.ores')}
									</Text>
								</Label>
							</div>

							<!-- Every 3 days -->
							<Text type="large">
								{$i18n.t('dashboard.widget.reminder.three_day.title')}
							</Text>
							<div class="flex flex-row items-center">
								<Checkbox id="reminder_chunks" class="mr-3" />
								<Label for="reminder_chunks" class="text-base font-normal">
									<Text type="p">
										{$i18n.t('dashboard.widget.reminder.three_day.crystals')}
									</Text>
								</Label>
							</div>
							<div class="flex flex-row items-center">
								<Checkbox id="reminder_teapotFarm" class="mr-3" />
								<Label for="reminder_teapotFarm" class="text-base font-normal">
									<Text type="p">
										{$i18n.t('dashboard.widget.reminder.three_day.teapot_farm')}
									</Text>
								</Label>
							</div>
							<div class="flex flex-row items-center">
								<Checkbox id="reminder_fish" class="mr-3" />
								<Label for="reminder_fish" class="text-base font-normal">
									<Text type="p">
										{$i18n.t('dashboard.widget.reminder.three_day.fishing')}
									</Text>
								</Label>
							</div>

							<!-- Weekly -->
							<Text type="large">
								{$i18n.t('dashboard.widget.reminder.weekly.title')}
							</Text>
							<div class="flex flex-row items-center">
								<Checkbox id="reminder_parametric" class="mr-3" />
								<Label for="reminder_parametric" class="text-base font-normal">
									<Text type="p">
										{$i18n.t(
											'dashboard.widget.reminder.weekly.parametric_transformer'
										)}
									</Text>
								</Label>
							</div>
							<div class="flex flex-row items-center">
								<Checkbox id="reminder_trap" class="mr-3" />
								<Label for="reminder_trap" class="text-base font-normal">
									<Text type="p">
										{$i18n.t(
											'dashboard.widget.reminder.weekly.crystalfly_trap'
										)}
									</Text>
								</Label>
							</div>
							<div class="flex flex-row items-center">
								<Checkbox id="reminder_boss" class="mr-3" />
								<Label for="reminder_boss" class="text-base font-normal">
									<Text type="p">
										{$i18n.t('dashboard.widget.reminder.weekly.bosses')}
									</Text>
								</Label>
							</div>
							<div class="flex flex-row items-center">
								<Checkbox id="reminder_reputation" class="mr-3" />
								<Label for="reminder_reputation" class="text-base font-normal">
									<Text type="p">
										{$i18n.t('dashboard.widget.reminder.weekly.reputation')}
									</Text>
								</Label>
							</div>
						</Card.Content>
					</Card.Root>
				{/if}
				{#if Widget.check === `${$i18n.t('dashboard.widget.events.title')}` && Widget.checked == true}
					<!-- Events card -->
					<Card.Root class=" flex flex-col">
						<Card.Header>
							<Card.Title>
								<Text type="h4">
									{$i18n.t('dashboard.widget.events.title')} Current Events
								</Text>
							</Card.Title>
						</Card.Header>
						<Card.Content>
							<Text type="large">
								{$i18n.t('dashboard.widget.events.version')}
								{currentVer}
							</Text>
							<div class="mt-2 flex flex-col gap-1.5">
								<!-- TODO: get localized event names -->
								<div
									class="bg-neutral flex flex-row justify-between rounded-md px-2 py-3"
								>
									<Text type="p">{mockEvent.name}</Text>
									<Text type="p">
										{Math.floor(
											(mockEvent.end.getTime() - currentTime) / 3600000 / 24
										)}d
										{Math.floor(
											(mockEvent.end.getTime() - currentTime) / 3600000
										) -
											24 *
												Math.floor(
													(mockEvent.end.getTime() - currentTime) /
														3600000 /
														24
												)}h
									</Text>
								</div>
								<div
									class="bg-neutral flex flex-row justify-between rounded-md px-2 py-3"
								>
									<Text type="p">{mockEvent.name}</Text>
									<Text type="p">
										{Math.floor(
											(mockEvent.end.getTime() - currentTime) / 3600000 / 24
										)}d
										{Math.floor(
											(mockEvent.end.getTime() - currentTime) / 3600000
										) -
											24 *
												Math.floor(
													(mockEvent.end.getTime() - currentTime) /
														3600000 /
														24
												)}h
									</Text>
								</div>
								<div
									class="bg-neutral flex flex-row justify-between rounded-md px-2 py-3"
								>
									<Text type="p">{mockEvent.name}</Text>
									<Text type="p">
										{Math.floor(
											(mockEvent.end.getTime() - currentTime) / 3600000 / 24
										)}d
										{Math.floor(
											(mockEvent.end.getTime() - currentTime) / 3600000
										) -
											24 *
												Math.floor(
													(mockEvent.end.getTime() - currentTime) /
														3600000 /
														24
												)}h
									</Text>
								</div>
								<div
									class="bg-neutral flex flex-row justify-between rounded-md px-2 py-3"
								>
									<Text type="p">{mockEvent.name}</Text>
									<Text type="p">
										{Math.floor(
											(mockEvent.end.getTime() - currentTime) / 3600000 / 24
										)}d
										{Math.floor(
											(mockEvent.end.getTime() - currentTime) / 3600000
										) -
											24 *
												Math.floor(
													(mockEvent.end.getTime() - currentTime) /
														3600000 /
														24
												)}h
									</Text>
								</div>
							</div>
						</Card.Content>
						<Card.Footer class="mt-2.5">
							<Button class="w-full">
								{$i18n.t('dashboard.widget.events.timeline.button')}
							</Button>
						</Card.Footer>
					</Card.Root>{/if}
				{#if Widget.check === `${$i18n.t('dashboard.widget.todo.title')}` && Widget.checked == true}
					<!-- To-do card -->
					<Card.Root class=" flex flex-col">
						<Card.Header>
							<Card.Title>
								<Text type="h4">{$i18n.t('dashboard.widget.todo.title')}</Text>
							</Card.Title>
						</Card.Header>
						<Card.Content>
							<Text type="p">
								Farmable today: thing thing thing thing summary: some more even more
								thing
							</Text>
						</Card.Content>
					</Card.Root>{/if}
				{#if Widget.check === `${$i18n.t('dashboard.widget.domain.title')}` && Widget.checked == true}
					<!-- Domain rotation card -->
					<Card.Root class=" flex flex-col">
						<Card.Header>
							<Card.Title>
								<Text type="h4">{$i18n.t('dashboard.widget.domain.title')}</Text>
							</Card.Title>
						</Card.Header>
						<Card.Content>
							<Text type="p">
								talent materials, weapon materials + corresponding chars/weaps
							</Text>
						</Card.Content>
					</Card.Root>{/if}
				{#if Widget.check === `${$i18n.t('dashboard.widget.achievements.title')}` && Widget.checked == true}
					<!-- Achievements card -->
					<Card.Root class=" flex flex-col">
						<Card.Header>
							<Card.Title>
								<Text type="h4">
									{$i18n.t('dashboard.widget.achievements.title')}
								</Text>
							</Card.Title>
						</Card.Header>
						<Card.Content>
							<div class="flex flex-row justify-between">
								<Text type="p">
									{$i18n.t('dashboard.widget.achievements.progress')}:
								</Text>
								<Text type="p">
									{totalAchieved}/{totalAchievements}
								</Text>
							</div>
							<Progress value={totalAchieved} max={totalAchievements} class="mt-1.5"
							></Progress>
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
						</Card.Content>
						<Card.Footer class="mt-2.5">
							<a href="/achievement">
								<Button class="w-full">
									{$i18n.t('dashboard.widget.achievements.more')}
								</Button>
							</a>
						</Card.Footer>
					</Card.Root>{/if}
				{#if Widget.check === `${$i18n.t('dashboard.widget.pity.title')}` && Widget.checked == true}<!-- Pity card -->
					<Card.Root class=" flex flex-col gap-5">
						<Card.Header>
							<Card.Title class="flex flex-row items-center justify-between">
								<Text type="h4">{$i18n.t('dashboard.widget.pity.title')}</Text>
								<Button href="wish-statistics/overview">
									{$i18n.t('wish.overview.title')}
								</Button>
							</Card.Title>
						</Card.Header>
						<Card.Content>
							<div class="*:bg-neutral flex justify-between *:px-[8%] *:py-[5%]">
								<!-- char -->
								<div
									class="flex flex-col items-center justify-center gap-3 rounded-md"
								>
									<Icon path={mdiAccount} />
									<div class="flex gap-4 font-semibold">
										<Text type="p" class="text-fivestar">
											{calculateFiveStarPity(
												$userProfile.wishes?.CharacterEvent ?? []
											)}
										</Text>
										<Text type="p" class="text-fourstar">
											{calculateFourStarPity(
												$userProfile.wishes?.CharacterEvent ?? []
											)}
										</Text>
									</div>
								</div>
								<!-- weap -->
								<div
									class="flex flex-col items-center justify-center gap-3 rounded-md"
								>
									<Icon path={mdiSwordCross} />
									<div class="flex gap-4 font-semibold">
										<Text type="p" class="text-fivestar">
											{calculateFiveStarPity(
												$userProfile.wishes?.WeaponEvent ?? []
											)}
										</Text>
										<Text type="p" class="text-fourstar">
											{calculateFourStarPity(
												$userProfile.wishes?.WeaponEvent ?? []
											)}
										</Text>
									</div>
								</div>
								<!-- standard -->
								<div
									class="flex flex-col items-center justify-center gap-3 rounded-md"
								>
									<Icon path={mdiInfinity} />
									<div class="flex gap-4 font-semibold">
										<Text type="p" class="text-fivestar">
											{calculateFiveStarPity(
												$userProfile.wishes?.Standard ?? []
											)}
										</Text>
										<Text type="p" class="text-fourstar">
											{calculateFourStarPity(
												$userProfile.wishes?.Standard ?? []
											)}
										</Text>
									</div>
								</div>
							</div>
						</Card.Content>
					</Card.Root>{/if}
				{#if Widget.check === `${$i18n.t('dashboard.widget.wishing.title')}` && Widget.checked == true}
					<!-- Wish card -->
					<Card.Root class=" flex flex-col gap-5">
						<Card.Header>
							<Card.Title class="flex items-center justify-between">
								<Text type="h4">{$i18n.t('dashboard.widget.wishing.title')}</Text>
								<Button href="wish-statistics/overview">
									{$i18n.t('action.more')}
								</Button>
							</Card.Title>
						</Card.Header>
						<Card.Content class="flex flex-col gap-3">
							<!-- pity -->
							<Text type="large">{$i18n.t('dashboard.widget.wishing.pity')}</Text>
							<div class="*:bg-neutral flex justify-between *:px-[8%] *:py-[5%]">
								<!-- char -->
								<div
									class="flex flex-col items-center justify-center gap-3 rounded-md"
								>
									<Icon path={mdiAccount} />
									<div class="flex gap-4 font-semibold">
										<Text type="p" class="text-fivestar">
											{calculateFiveStarPity(
												$userProfile.wishes?.CharacterEvent ?? []
											)}
										</Text>
										<Text type="p" class="text-fourstar">
											{calculateFourStarPity(
												$userProfile.wishes?.CharacterEvent ?? []
											)}
										</Text>
									</div>
								</div>
								<!-- weap -->
								<div
									class="flex flex-col items-center justify-center gap-3 rounded-md"
								>
									<Icon path={mdiSwordCross} />
									<div class="flex gap-4 font-semibold">
										<Text type="p" class="text-fivestar">
											{calculateFiveStarPity(
												$userProfile.wishes?.WeaponEvent ?? []
											)}
										</Text>
										<Text type="p" class="text-fourstar">
											{calculateFourStarPity(
												$userProfile.wishes?.WeaponEvent ?? []
											)}
										</Text>
									</div>
								</div>
								<!-- standard -->
								<div
									class="flex flex-col items-center justify-center gap-3 rounded-md"
								>
									<Icon path={mdiInfinity} />
									<div class="flex gap-4 font-semibold">
										<Text type="p" class="text-fivestar">
											{calculateFiveStarPity(
												$userProfile.wishes?.Standard ?? []
											)}
										</Text>
										<Text type="p" class="text-fourstar">
											{calculateFourStarPity(
												$userProfile.wishes?.Standard ?? []
											)}
										</Text>
									</div>
								</div>
							</div>
							<!-- total pulls -->
							<div
								class="bg-neutral flex items-center justify-between rounded-md pl-3"
							>
								<Text type="large">
									{$i18n.t('dashboard.widget.wishing.total')}
								</Text>
								<Text type="large" class="bg-neutral rounded-md p-3">
									{($userProfile.wishes?.WeaponEvent?.length ?? 0) +
										($userProfile.wishes?.CharacterEvent?.length ?? 0) +
										($userProfile.wishes?.Beginner?.length ?? 0) +
										($userProfile.wishes?.Chronicled?.length ?? 0) +
										($userProfile.wishes?.Standard?.length ?? 0)}
								</Text>
							</div>
							<!-- latest pulls -->
							<div>
								<Text type="large">
									{$i18n.t('dashboard.widget.wishing.latest')}
								</Text>
								<div class="mt-2 flex flex-row flex-wrap gap-3">
									{#each getLatestWishes($userProfile, 6) as wish}
										<PullChip
											name={wish.key}
											key={wish.key}
											counter={wish.pity}
											wonFiftyFifty={wish.wonFiftyFifty}
										></PullChip>
									{/each}
								</div>
							</div>
						</Card.Content>
						<Card.Footer class="flex justify-end">
							<IconButton icon={mdiImport} href="/settings/import">
								{$i18n.t('wish.overview.import_wish_button')}
							</IconButton>
						</Card.Footer>
					</Card.Root>
				{/if}
				{#if Widget.check === `${$i18n.t('dashboard.widget.display.title')}` && Widget.checked == true}
					<!-- Display card -->
					<Card.Root class=" flex flex-col">
						<Card.Header>
							<Card.Title>
								<Text type="h4">{$i18n.t('dashboard.widget.display.title')}</Text>
							</Card.Title>
						</Card.Header>
						<Card.Content>
							<div class="mt-2 flex flex-row justify-around">
								<CharCard
									link={displayed_character.link}
									name={displayed_character.name}
									img={displayed_character.img}
									level={0}
									constellation={0}
									element={displayed_character.element}
									weapon={displayed_character.weapon}
									rarity={displayed_character.rarity}
									obtained={displayed_character.obtained}
								/>
								<CharCard
									link={displayed_character.link}
									name={displayed_character.name}
									img={displayed_character.img}
									level={0}
									constellation={0}
									element={displayed_character.element}
									weapon={displayed_character.weapon}
									rarity={displayed_character.rarity}
									obtained={displayed_character.obtained}
								/>
							</div>
							<!-- Display setup will be in character/weapon tabs -->
						</Card.Content>
					</Card.Root>
				{/if}
				{#if Widget.check === `${$i18n.t('dashboard.widget.global_wishing.title')}` && Widget.checked == true}
					<!-- Global wishing stats -->
					<Card.Root class=" flex flex-col gap-5">
						<Card.Header>
							<Card.Title class="flex items-center justify-between">
								<Text type="h4">
									{$i18n.t('dashboard.widget.global_wishing.title')}
								</Text>
							</Card.Title>
						</Card.Header>
						<Card.Content class="flex flex-col gap-3">
							<div class="flex flex-row justify-around">
								<div class="flex flex-col items-center">
									<img
										class="h-44 w-32"
										src={card}
										alt="{currentGachaFirst.name} Gacha Card"
									/>
									<Text type="large">{currentGachaFirst.name}</Text>
									<Text type="large">
										{Math.round(
											(currentGachaFirst.pulls / 1000 + Number.EPSILON) * 10
										) / 10}k
									</Text>
									<Text type="p">
										{currentGachaFirst.percentage}% {$i18n.t(
											'dashboard.widget.global_wishing.percentage'
										)} 5*
									</Text>
									<Text type="p">
										{$i18n.t('dashboard.widget.global_wishing.pity_average')}
										{currentGachaFirst.average}
									</Text>
								</div>
								<div class="flex flex-col items-center">
									<img
										class="h-44 w-32"
										src={card}
										alt="{currentGachaSecond.name} Gacha Card"
									/>
									<Text type="large">{currentGachaSecond.name}</Text>
									<Text type="large">
										{Math.round(
											(currentGachaSecond.pulls / 1000 + Number.EPSILON) * 10
										) / 10}k
									</Text>
									<Text type="p">
										{currentGachaSecond.percentage}% {$i18n.t(
											'dashboard.widget.global_wishing.percentage'
										)} 5*
									</Text>
									<Text type="p">
										{$i18n.t('dashboard.widget.global_wishing.pity_average')}
										{currentGachaSecond.average}
									</Text>
								</div>
							</div>
							<Text type="p" class="self-center">
								{$i18n.t('dashboard.widget.global_wishing.based_on', {
									number: submissions
								})}
							</Text>
						</Card.Content>
						<Card.Footer class="flex justify-end">
							<Button class="w-full">{$i18n.t('action.more')}</Button>
						</Card.Footer>
					</Card.Root>
				{/if}
				{#if Widget.check === `${$i18n.t('dashboard.widget.resin.title')}` && Widget.checked == true}
					<!-- Resin tracker  -->
					<Card.Root class=" flex flex-col gap-5">
						<Card.Header>
							<Card.Title class="flex items-center justify-between">
								<Text type="h4">{$i18n.t('dashboard.widget.resin.title')}</Text>
							</Card.Title>
						</Card.Header>
						<Card.Content class="flex flex-col gap-3">
							<div class="flex flex-row items-center justify-center gap-4">
								<img class="h-8 w-8" src="" alt="Resin Icon" />
								<Text type="large">
									<Input
										type="number"
										class="hover:border-text/30 focus-visible:border-text/30 inline
										h-5 w-12 rounded-none border-none p-0 pb-1 pl-1 text-right text-lg font-semibold [appearance:textfield]
										hover:border-0 hover:border-b-2 hover:border-solid focus-visible:border-0
										focus-visible:border-b-2 focus-visible:border-solid focus-visible:ring-0 focus-visible:ring-offset-0
										[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
										bind:value={currentResin}
										on:input={() => ResinCounter.HandleInput()}
									/>/{maxResin}
								</Text>
							</div>
							<div class="flex flex-row justify-center">
								<Button
									on:click={() => ResinCounter.decreaseResin(20)}
									class="rounded-l-md rounded-r-none"
								>
									-20
								</Button>
								<Button
									on:click={() => ResinCounter.decreaseResin(30)}
									class="rounded-none"
								>
									-30
								</Button>
								<Button
									on:click={() => ResinCounter.decreaseResin(40)}
									class="rounded-none"
								>
									-40
								</Button>
								<Button
									on:click={() => ResinCounter.decreaseResin(60)}
									class="rounded-none"
								>
									-60
								</Button>
								<Button
									on:click={() => ResinCounter.increaseResin(60)}
									class="rounded-l-none rounded-r-md"
								>
									+60
								</Button>
							</div>

							{#if currentResin < maxResin}
								<div class="flex flex-col items-center">
									{#if currentResin < 20}
										<Text type="p">
											20 in {ResinCounter.countTimeLeft(20)}
											({ResinCounter.countEndTime(20)})
										</Text>
									{/if}
									{#if currentResin < 30}
										<Text type="p">
											30 in {ResinCounter.countTimeLeft(30)}
											({ResinCounter.countEndTime(30)})
										</Text>
									{/if}
									{#if currentResin < 40}
										<Text type="p">
											40 in {ResinCounter.countTimeLeft(40)}
											({ResinCounter.countEndTime(40)})
										</Text>
									{/if}
									{#if currentResin < 60}
										<Text type="p">
											60 in {ResinCounter.countTimeLeft(60)}
											({ResinCounter.countEndTime(60)})
										</Text>
									{/if}
									<Text type="p">
										{maxResin} in {ResinCounter.countTimeLeft(maxResin)}
										({ResinCounter.countEndTime(maxResin)})
									</Text>
								</div>
							{/if}
						</Card.Content>
						<!-- <Card.Footer class="flex justify-end">
							<Button class="w-full">View more</Button>
						</Card.Footer> -->
					</Card.Root>
				{/if}
			{/each}
		</div>
	</div>
</DefaultLayout>
