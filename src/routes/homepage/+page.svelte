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

	import { mdiPencil, mdiImport, mdiAccount, mdiSwordCross, mdiTrashCanOutline } from '@mdi/js';
	import CharCard from '$lib/components/ui/card/CharCard.svelte';
	import type { Elements } from '$lib/types/elements';
	import type { WeaponTypes } from '$lib/types/weapon';
	import { onMount } from 'svelte';
	import { userProfile } from '$lib/store/user_profile';

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

	type Achievement = {
		id: number;
		name: string;
		desc: string;
		reward: number;
		hidden: boolean;
		order: number;
	};

	const mockAchievement: Achievement = {
		id: 0,
		name: 'Test Achievement',
		desc: 'lorem ipsum',
		reward: 1,
		hidden: false,
		order: 0
	};

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

	let achievementsDone = 998;
	let achievementsTotal = 1143;

	let characterPity: [number, number] = [76, 8];
	let weaponPity: [number, number] = [23, 2];
	let standardPity: [number, number] = [53, 5];

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
			class="h-fit [column-count:auto] [column-width:370px] gap-2 [&>div:not(:first-child)]:mt-2 [&>div]:break-inside-avoid"
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
						<Card.Footer class="items-end justify-end mt-2.5">
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
							<div class="flex flex-col gap-1.5 mt-2">
								<!-- TODO: get localized event names -->
								<div
									class="flex flex-row justify-between bg-neutral rounded-md py-3 px-2"
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
									class="flex flex-row justify-between bg-neutral rounded-md py-3 px-2"
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
									class="flex flex-row justify-between bg-neutral rounded-md py-3 px-2"
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
									class="flex flex-row justify-between bg-neutral rounded-md py-3 px-2"
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
									<!-- TODO: check if that works, when we have achievement data -->

									<!-- {Object.values($userProfile.achievements ?? {}).reduce(
										(count, achievements) =>
											count +
											Object.values(achievements).filter(
												(achievement) => achievement.achieved
											).length,
										0
									)}/
									{Object.values($userProfile.achievements ?? {}).reduce(
										(count, achievements) =>
											count + Object.values(achievements).length,
										0
									)} -->

									{achievementsDone}/{achievementsTotal}
								</Text>
							</div>
							<Progress
								value={(achievementsDone / achievementsTotal) * 100}
								class="mt-1.5"
							></Progress>
							<div class="flex flex-col gap-1.5 justify-between">
								<Text type="p">
									{$i18n.t('dashboard.widget.achievements.latest')}:
								</Text>
								<div class="bg-neutral rounded-md py-3 px-2">
									<Text type="p">{mockAchievement.name}</Text>
								</div>
								<div class="bg-neutral rounded-md py-3 px-2">
									<Text type="p">{mockAchievement.name}</Text>
								</div>
								<div class="bg-neutral rounded-md py-3 px-2">
									<Text type="p">{mockAchievement.name}</Text>
								</div>
								<div class="bg-neutral rounded-md py-3 px-2">
									<Text type="p">{mockAchievement.name}</Text>
								</div>
								<div class="bg-neutral rounded-md py-3 px-2">
									<Text type="p">{mockAchievement.name}</Text>
								</div>
							</div>
						</Card.Content>
						<Card.Footer class="mt-2.5">
							<Button class="w-full">
								{$i18n.t('dashboard.widget.achievements.more')}
							</Button>
						</Card.Footer>
					</Card.Root>{/if}
				{#if Widget.check === `${$i18n.t('dashboard.widget.pity.title')}` && Widget.checked == true}<!-- Pity card -->
					<Card.Root class=" flex flex-col gap-5">
						<Card.Header>
							<Card.Title class="flex flex-row justify-between items-center">
								<Text type="h4">{$i18n.t('dashboard.widget.pity.title')}</Text>
								<Button href="wish-statistics/overview">
									{$i18n.t('wish.overview.title')}
								</Button>
							</Card.Title>
						</Card.Header>
						<Card.Content>
							<div class="flex justify-between *:py-[5%] *:px-[8%] *:bg-neutral">
								<!-- char -->
								<div
									class="flex flex-col gap-3 justify-center items-center rounded-md"
								>
									<Icon path={mdiAccount} />
									<div class="flex gap-4 font-semibold">
										<Text type="p" class="text-fivestar">
											{characterPity[0]}
										</Text>
										<Text type="p" class="text-fourstar">
											{characterPity[1]}
										</Text>
									</div>
								</div>
								<!-- weap -->
								<div
									class="flex flex-col gap-3 justify-center items-center rounded-md"
								>
									<Icon path={mdiSwordCross} />
									<div class="flex gap-4 font-semibold">
										<Text type="p" class="text-fivestar">{weaponPity[0]}</Text>
										<Text type="p" class="text-fourstar">
											{weaponPity[1]}
										</Text>
									</div>
								</div>
								<!-- standard -->
								<div
									class="flex flex-col gap-3 justify-center items-center rounded-md"
								>
									<Icon path={mdiTrashCanOutline} />
									<div class="flex gap-4 font-semibold">
										<Text type="p" class="text-fivestar">
											{standardPity[0]}
										</Text>
										<Text type="p" class="text-fourstar">
											{standardPity[1]}
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
							<Card.Title class="flex justify-between items-center">
								<Text type="h4">{$i18n.t('dashboard.widget.wishing.title')}</Text>
								<Button href="wish-statistics/overview">
									{$i18n.t('action.more')}
								</Button>
							</Card.Title>
						</Card.Header>
						<Card.Content class="flex flex-col gap-3">
							<!-- pity -->
							<Text type="large">{$i18n.t('dashboard.widget.wishing.pity')}</Text>
							<div class="flex justify-between *:py-[5%] *:px-[8%] *:bg-neutral">
								<!-- char -->
								<div
									class="flex flex-col gap-3 justify-center items-center rounded-md"
								>
									<Icon path={mdiAccount} />
									<div class="flex gap-4 font-semibold">
										<Text type="p" class="text-fivestar">
											{characterPity[0]}
										</Text>
										<Text type="p" class="text-fourstar">
											{characterPity[1]}
										</Text>
									</div>
								</div>
								<!-- weap -->
								<div
									class="flex flex-col gap-3 justify-center items-center rounded-md"
								>
									<Icon path={mdiSwordCross} />
									<div class="flex gap-4 font-semibold">
										<Text type="p" class="text-fivestar">
											{weaponPity[0]}
										</Text>
										<Text type="p" class="text-fourstar">
											{weaponPity[1]}
										</Text>
									</div>
								</div>
								<!-- standard -->
								<div
									class="flex flex-col gap-3 justify-center items-center rounded-md"
								>
									<Icon path={mdiTrashCanOutline} />
									<div class="flex gap-4 font-semibold">
										<Text type="p" class="text-fivestar">
											{standardPity[0]}
										</Text>
										<Text type="p" class="text-fourstar">
											{standardPity[1]}
										</Text>
									</div>
								</div>
							</div>
							<!-- total pulls -->
							<div
								class="flex justify-between items-center bg-neutral pl-3 rounded-md"
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
								<div class="flex flex-row flex-wrap gap-1">
									<PullChip name="Xiao" key="Xiao" counter={20}></PullChip>
									<PullChip name="Xiao" key="Xiao" counter={20}></PullChip>
									<PullChip
										name="Ballad of The Boundless Blue"
										key="BalladOfTheBoundlessBlue"
										counter={20}
									></PullChip>
									<PullChip name="Xiao" key="Xiao" counter={20}></PullChip>
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
							<div class="flex flex-row justify-around mt-2">
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
							<Card.Title class="flex justify-between items-center">
								<Text type="h4">
									{$i18n.t('dashboard.widget.global_wishing.title')}
								</Text>
							</Card.Title>
						</Card.Header>
						<Card.Content class="flex flex-col gap-3">
							<div class="flex flex-row justify-around">
								<div class="flex flex-col items-center">
									<img
										class="w-32 h-44"
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
										class="w-32 h-44"
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
							<Card.Title class="flex justify-between items-center">
								<Text type="h4">{$i18n.t('dashboard.widget.resin.title')}</Text>
							</Card.Title>
						</Card.Header>
						<Card.Content class="flex flex-col gap-3">
							<div class="flex flex-row items-center justify-center gap-4">
								<img class="w-8 h-8" src="" alt="Resin Icon" />
								<Text type="large">
									<Input
										type="number"
										class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
										w-12 h-5 border-none text-lg font-semibold inline text-right p-0 pl-1 rounded-none pb-1
										hover:border-solid hover:border-0 hover:border-b-2 hover:border-text/30
										focus-visible:border-solid focus-visible:border-0 focus-visible:border-b-2 focus-visible:border-text/30
										focus-visible:ring-0 focus-visible:ring-offset-0"
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
									class="rounded-r-md rounded-l-none"
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
