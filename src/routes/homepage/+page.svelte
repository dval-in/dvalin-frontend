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

	let changeLog = `
`;

	let currentVer = '4.5';

	$: dragDropList = [
		{ id: 0, check: 'ChangeLog', checked: true },
		{ id: 1, check: 'Reminder', checked: true },
		{ id: 2, check: 'Events', checked: true },
		{ id: 3, check: 'To-do List', checked: true },
		{ id: 4, check: 'Domain Rotation', checked: true },
		{ id: 5, check: 'Achievements', checked: true },
		{ id: 6, check: 'Pity', checked: true },
		{ id: 7, check: 'Wishing', checked: true },
		{ id: 8, check: 'Display', checked: true },
		{ id: 9, check: 'Global wishing stats', checked: true },
		{ id: 10, check: 'Resin tracker', checked: true }
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
	let standartPity: [number, number] = [53, 5];

	let wishCount = 399;

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

			if (hoursTillRegen == 0) output = `${minutesTillRegen} min`;
			else if (minutesTillRegen > 0) output = `${hoursTillRegen} h ${minutesTillRegen} min`;
			else output = `${hoursTillRegen} h`;

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
			<AlertDialog.Title>Welcome to Dval.in!</AlertDialog.Title>
			<AlertDialog.Description>
				Your best Genshin Impact companion! Dval.in helps you plan what to farm with an
				ascension calculator, and it also tracks your progress with a todo list and a wish
				counter.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

<DefaultLayout title="Dashboard">
	<svelte:fragment slot="titlebarActions">
		<Dialog.Root>
			<Dialog.Trigger>
				<IconButton icon={mdiPencil}>Edit</IconButton>
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>
						<Text type="h3">Edit the layout</Text>
					</Dialog.Title>
					<Dialog.Description>
						<Text type="p">Edit your homepage layout to fit your needs.</Text>
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
				{#if Widget.check === 'ChangeLog' && Widget.checked == true}
					<!-- Changelog card -->
					<Card.Root class="text-white flex flex-col">
						<Card.Header>
							<!--TODO: Replace this with i18n key-->
							<Card.Title>
								<Text type="h4">Changelog:</Text>
							</Card.Title>
						</Card.Header>
						<Card.Content class="whitespace-pre-line">
							<Text type="p">{changeLog}</Text>
						</Card.Content>
						<Card.Footer class="items-end justify-end mt-2.5">
							<Button>More</Button>
						</Card.Footer>
					</Card.Root>
				{/if}
				{#if Widget.check === 'Reminder' && Widget.checked == true}
					<!-- Reminder card -->
					<Card.Root class="text-white flex flex-col">
						<Card.Header>
							<!--TODO: Replace this with i18n key-->
							<Card.Title>
								<Text type="h4">Reminder</Text>
							</Card.Title>
						</Card.Header>
						<Card.Content>
							<!-- The checks will uncheck themselves after N server resets -->

							<!-- Daily -->
							<Text type="large">Daily</Text>
							<div class="flex flex-row items-center">
								<Checkbox id="reminder_teapot" class="mr-3" />
								<Label for="reminder_teapot" class="text-base font-normal">
									<Text type="p">Teapot currency and friendship</Text>
								</Label>
							</div>
							<div class="flex flex-row items-center">
								<Checkbox id="reminder_commissions" class="mr-3" />
								<Label for="reminder_commissions" class="text-base font-normal">
									<Text type="p">Daily commissions</Text>
								</Label>
							</div>
							<div class="flex flex-row items-center">
								<Checkbox id="reminder_resin" class="mr-3" />
								<Label for="reminder_resin" class="text-base font-normal">
									<Text type="p">Spend resin</Text>
								</Label>
							</div>
							<div class="flex flex-row items-center">
								<Checkbox id="reminder_welkin" class="mr-3" />
								<Label for="reminder_welkin" class="text-base font-normal">
									<Text type="p">Welkin moon</Text>
								</Label>
							</div>

							<!-- Every 2 days -->
							<Text type="large">2 day</Text>
							<div class="flex flex-row items-center">
								<Checkbox id="reminder_local" class="mr-3" />
								<Label for="reminder_local" class="text-base font-normal">
									<Text type="p">Local specialties</Text>
								</Label>
							</div>
							<div class="flex flex-row items-center">
								<Checkbox id="reminder_ore" class="mr-3" />
								<Label for="reminder_ore" class="text-base font-normal">
									<Text type="p">Ores</Text>
								</Label>
							</div>

							<!-- Every 3 days -->
							<Text type="large">3 day</Text>
							<div class="flex flex-row items-center">
								<Checkbox id="reminder_chunks" class="mr-3" />
								<Label for="reminder_chunks" class="text-base font-normal">
									<Text type="p">Crystal chuncks</Text>
								</Label>
							</div>
							<div class="flex flex-row items-center">
								<Checkbox id="reminder_teapotFarm" class="mr-3" />
								<Label for="reminder_teapotFarm" class="text-base font-normal">
									<Text type="p">Teapot farms</Text>
								</Label>
							</div>
							<div class="flex flex-row items-center">
								<Checkbox id="reminder_fish" class="mr-3" />
								<Label for="reminder_fish" class="text-base font-normal">
									<Text type="p">Fishing</Text>
								</Label>
							</div>

							<!-- Weekly -->
							<Text type="large">Weekly</Text>
							<div class="flex flex-row items-center">
								<Checkbox id="reminder_parametric" class="mr-3" />
								<Label for="reminder_parametric" class="text-base font-normal">
									<Text type="p">Parametric transformer</Text>
								</Label>
							</div>
							<div class="flex flex-row items-center">
								<Checkbox id="reminder_trap" class="mr-3" />
								<Label for="reminder_trap" class="text-base font-normal">
									<Text type="p">Crystalfly trap</Text>
								</Label>
							</div>
							<div class="flex flex-row items-center">
								<Checkbox id="reminder_boss" class="mr-3" />
								<Label for="reminder_boss" class="text-base font-normal">
									<Text type="p">Weekly bosses</Text>
								</Label>
							</div>
							<div class="flex flex-row items-center">
								<Checkbox id="reminder_reputation" class="mr-3" />
								<Label for="reminder_reputation" class="text-base font-normal">
									<Text type="p">Reputation bounties</Text>
								</Label>
							</div>
						</Card.Content>
					</Card.Root>
				{/if}
				{#if Widget.check === 'Events' && Widget.checked == true}
					<!-- Events card -->
					<Card.Root class="text-white flex flex-col">
						<Card.Header>
							<!--TODO: Replace this with i18n key-->
							<Card.Title>
								<Text type="h4">Current Events</Text>
							</Card.Title>
						</Card.Header>
						<Card.Content>
							<Text type="large">For version {currentVer}</Text>
							<div class="flex flex-col gap-1.5 mt-2">
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
							<Button class="w-full">View timeline</Button>
						</Card.Footer>
					</Card.Root>{/if}
				{#if Widget.check === 'To-do List' && Widget.checked == true}
					<!-- To-do card -->
					<Card.Root class="text-white flex flex-col">
						<Card.Header>
							<!--TODO: Replace this with i18n key-->
							<Card.Title>
								<Text type="h4">To-do List</Text>
							</Card.Title>
						</Card.Header>
						<Card.Content>
							<Text type="p">
								Farmable today: thing thing thing thing summary: some more even more
								thing
							</Text>
						</Card.Content>
					</Card.Root>{/if}
				{#if Widget.check === 'Domain Rotation' && Widget.checked == true}
					<!-- Domain rotation card -->
					<Card.Root class="text-white flex flex-col">
						<Card.Header>
							<!--TODO: Replace this with i18n key-->
							<Card.Title>
								<Text type="h4">Domain Rotation</Text>
							</Card.Title>
						</Card.Header>
						<Card.Content>
							<Text type="p">
								talent materials, weapon materials + corresponding chars/weaps
							</Text>
						</Card.Content>
					</Card.Root>{/if}
				{#if Widget.check === 'Achievements' && Widget.checked == true}
					<!-- Achievements card -->
					<Card.Root class="text-white flex flex-col">
						<Card.Header>
							<!--TODO: Replace this with i18n key-->
							<Card.Title>
								<Text type="h4">Achievements</Text>
							</Card.Title>
						</Card.Header>
						<Card.Content>
							<div class="flex flex-row justify-between">
								<Text type="p">Overall progress:</Text>
								<Text type="p">{achievementsDone}/{achievementsTotal}</Text>
							</div>
							<Progress
								value={(achievementsDone / achievementsTotal) * 100}
								class="mt-1.5"
							></Progress>
							<div class="flex flex-col gap-1.5 justify-between">
								<Text type="p">Latest achievements:</Text>
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
							<Button class="w-full">View more achievements</Button>
						</Card.Footer>
					</Card.Root>{/if}
				{#if Widget.check === 'Pity' && Widget.checked == true}<!-- Pity card -->
					<Card.Root class="text-white flex flex-col gap-5">
						<Card.Header>
							<!--TODO: Replace this with i18n key-->
							<Card.Title>
								<Text type="h4">Pity</Text>
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
										<Text type="p" class="text-amber-500">
											{characterPity[0]}
										</Text>
										<Text type="p" class="text-violet-400">
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
										<Text type="p" class="text-amber-500">{weaponPity[0]}</Text>
										<Text type="p" class="text-violet-400">
											{weaponPity[1]}
										</Text>
									</div>
								</div>
								<!-- standart -->
								<div
									class="flex flex-col gap-3 justify-center items-center rounded-md"
								>
									<Icon path={mdiTrashCanOutline} />
									<div class="flex gap-4 font-semibold">
										<Text type="p" class="text-amber-500">
											{standartPity[0]}
										</Text>
										<Text type="p" class="text-violet-400">
											{standartPity[1]}
										</Text>
									</div>
								</div>
							</div>
						</Card.Content>
						<Card.Footer class="flex justify-end">
							<Button href="wish-statistics/overview">Wish Counter</Button>
						</Card.Footer>
					</Card.Root>{/if}
				{#if Widget.check === 'Wishing' && Widget.checked == true}
					<!-- Wish card -->
					<Card.Root class="text-white flex flex-col gap-5">
						<Card.Header>
							<!--TODO: Replace this with i18n key-->
							<Card.Title class="flex justify-between items-center">
								<Text type="h4">Wishing stats</Text>
								<IconButton icon={mdiImport} href="/settings/import">
									Import
								</IconButton>
							</Card.Title>
						</Card.Header>
						<Card.Content class="flex flex-col gap-3">
							<!-- total pulls -->
							<div class="flex justify-between items-center">
								<Text type="large">Total wishes</Text>
								<Text type="large" class="bg-neutral rounded-md p-3">
									{wishCount}
								</Text>
							</div>
							<!-- pity -->
							<Text type="large">Pity</Text>
							<div class="flex justify-between *:py-[5%] *:px-[8%] *:bg-neutral">
								<!-- char -->
								<div
									class="flex flex-col gap-3 justify-center items-center rounded-md"
								>
									<Icon path={mdiAccount} />
									<div class="flex gap-4 font-semibold">
										<Text type="p" class="text-amber-500">
											{characterPity[0]}
										</Text>
										<Text type="p" class="text-violet-400">
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
										<Text type="p" class="text-amber-500">
											{weaponPity[0]}
										</Text>
										<Text type="p" class="text-violet-400">
											{weaponPity[1]}
										</Text>
									</div>
								</div>
								<!-- standart -->
								<div
									class="flex flex-col gap-3 justify-center items-center rounded-md"
								>
									<Icon path={mdiTrashCanOutline} />
									<div class="flex gap-4 font-semibold">
										<Text type="p" class="text-amber-500">
											{standartPity[0]}
										</Text>
										<Text type="p" class="text-violet-400">
											{standartPity[1]}
										</Text>
									</div>
								</div>
							</div>
							<!-- latest pulls -->
							<div>
								<Text type="large">Latest pulls</Text>
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
							<Button href="wish-statistics/overview">View more</Button>
						</Card.Footer>
					</Card.Root>
				{/if}
				{#if Widget.check === 'Display' && Widget.checked == true}
					<!-- Display card -->
					<Card.Root class="text-white flex flex-col">
						<Card.Header>
							<!--TODO: Replace this with i18n key-->
							<Card.Title>
								<Text type="h4">Display</Text>
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
							<!-- <Text type="p">char or weapon icon name info</Text> -->

							<!-- Display setup will be in character/weapon tabs -->
						</Card.Content>
					</Card.Root>
				{/if}
				{#if Widget.check === 'Global wishing stats' && Widget.checked == true}
					<!-- Global wishing stats -->
					<Card.Root class="text-white flex flex-col gap-5">
						<Card.Header>
							<!--TODO: Replace this with i18n key-->
							<Card.Title class="flex justify-between items-center">
								<Text type="h4">
									Global wishing stats{$i18n.t('dashboard.global_whishing')}
								</Text>
							</Card.Title>
						</Card.Header>
						<Card.Content class="flex flex-col gap-3">
							<div class="flex flex-row justify-around">
								<div class="flex flex-col items-center">
									<img class="w-32 h-44" src={card} alt="Amber Gacha Card" />
									<Text type="large">{currentGachaFirst.name}</Text>
									<Text type="large">
										{Math.round(
											(currentGachaFirst.pulls / 1000 + Number.EPSILON) * 10
										) / 10}k
									</Text>
									<Text type="p">{currentGachaFirst.percentage}% of all 5*</Text>
									<Text type="p">Pity average {currentGachaFirst.average}</Text>
								</div>
								<div class="flex flex-col items-center">
									<img class="w-32 h-44" src={card} alt="Amber Gacha Card" />
									<Text type="large">{currentGachaSecond.name}</Text>
									<Text type="large">
										{Math.round(
											(currentGachaSecond.pulls / 1000 + Number.EPSILON) * 10
										) / 10}k
									</Text>
									<Text type="p">{currentGachaSecond.percentage}% of all 5*</Text>
									<Text type="p">Pity average {currentGachaSecond.average}</Text>
								</div>
							</div>
							<Text type="p" class="self-center">
								based on {submissions} submissions
							</Text>
						</Card.Content>
						<Card.Footer class="flex justify-end">
							<Button class="w-full">View more</Button>
						</Card.Footer>
					</Card.Root>
				{/if}
				{#if Widget.check === 'Resin tracker' && Widget.checked == true}
					<!-- Resin tracker  -->
					<Card.Root class="text-white flex flex-col gap-5">
						<Card.Header>
							<!--TODO: Replace this with i18n key-->
							<Card.Title class="flex justify-between items-center">
								<Text type="h4">Resin tracker</Text>
							</Card.Title>
						</Card.Header>
						<Card.Content class="flex flex-col gap-3">
							<div class="flex flex-row items-center justify-center gap-4">
								<img class="w-8 h-8" src="" alt="Resin Icon" />

								<Text type="large">
									<Input
										type="number"
										class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
										w-12 h-4 border-none text-lg font-semibold inline text-right p-0 pl-1 
										focus-visible:border-spacing-1 focus-visible:border-2 focus-visible:border-red-500 focus-visible:ring-0 focus-visible:ring-offset-0"
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
