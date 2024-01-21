<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import Text from '$lib/components/typography/Text.svelte';
	import { Progress } from '$lib/components/ui/progress';
	import * as Dialog from '$lib/components/ui/dialog';
	import DragDropList from '$lib/components/ui/dragdrop/DragDropList.svelte';
	// import { Label } from '$lib/components/ui/label';
	// import { Checkbox } from '$lib/components/ui/checkbox';

	let changeLog = `Version 4.3:

New Characters
- 5-Star Character "Helm of the Radiant Rose" Navia (Geo)
  - Vision: Geo
  - Weapon: Claymore
  - Elemental Skill: Ceremonial Crystalshot
  - Elemental Burst: As the Sunlit Sky's Singing Salute

- 4-Star Character "Executor of Justice" Chevreuse (Pyro)
  - Vision: Pyro
  - Weapon: Polearm
  - Elemental Skill: Short-Range Rapid Interdiction Fire
  - Elemental Burst: Ring of Bursting Grenades

`;

	// let order: string[] = [
	// 	'welcome',
	// 	'changelog',
	// 	'reminder',
	// 	'events',
	// 	'todo',
	// 	'rotation',
	// 	'achievments',
	// 	'pity',
	// 	'display'
	// ];

	let dragDropList = [
		{ id: 0, check: 'Welcome' },
		{ id: 1, check: 'ChangeLog' },
		{ id: 2, check: 'Reminder' },
		{ id: 3, check: 'Events' },
		{ id: 4, check: 'To-do List' },
		{ id: 5, check: 'Domain Rotation' },
		{ id: 6, check: 'Achievements' },
		{ id: 7, check: 'Pity' },
		{ id: 8, check: 'Display' }
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

	let achievementsDone = 998;
	let achievementsTotal = 1143;

	let characterPity: [number, number] = [76, 8];
	let weaponPity: [number, number] = [23, 2];
	let standartPity: [number, number] = [53, 5];
</script>

<div class="h-[calc(100dvh-1rem)]">
	<section class="flex flex-row flex-wrap justify-between px-5 items-center mb-5">
		<h1 class="text-4xl font-semibold">Home</h1>
		<Dialog.Root>
			<Dialog.Trigger>
				<Button class="rounded-xl border-2 border-gray-600">Edit</Button>
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
		<DragDropList></DragDropList>
	</section>
	<div
		class="h-fit [column-count:auto] [column-width:max(20em,_min(26vw,_70vw))] gap-2 [&>div:not(:first-child)]:mt-2 [&>div:not(:first-child)]:break-inside-avoid"
	>
		<!-- Welcome card -->
		<Card.Root class="break-inside-avoid text-white flex flex-col">
			<Card.Header>
				<!--TODO: Replace this with i18n key-->
				<Card.Title>
					<Text type="h4">Welcome to Dval.in!</Text>
				</Card.Title>
			</Card.Header>
			<Card.Content class="flex-1">
				<Text type="p">
					Your best Genshin Impact companion! Dval.in helps you plan what to farm with an ascension
					calculator, and it also tracks your progress with a todo list and a wish counter.
				</Text>
			</Card.Content>
			<Card.Footer class="flex-1 items-end justify-end">
				<Button class="rounded-xl border-2 border-gray-600">Hide</Button>
			</Card.Footer>
		</Card.Root>
		<!-- Changelog card -->
		<Card.Root class="text-white flex flex-col">
			<Card.Header>
				<!--TODO: Replace this with i18n key-->
				<Card.Title>
					<Text type="h4">Changelog:</Text>
				</Card.Title>
			</Card.Header>
			<Card.Content class="flex-1 whitespace-pre-line">
				<Text type="p">{changeLog}</Text>
			</Card.Content>
			<Card.Footer class="flex-1 items-end justify-end">
				<Button class="rounded-xl border-2 border-gray-600">More</Button>
			</Card.Footer>
		</Card.Root>
		<!-- Reminder card -->
		<Card.Root class="text-white">
			<Card.Header>
				<!--TODO: Replace this with i18n key-->
				<Card.Title>
					<Text type="h4">Reminder</Text>
				</Card.Title>
			</Card.Header>
			<Card.Content>
				<Text type="p">
					Daily teapot currency/friendship, dailies/encounters, [enemies], welkin 2day local
					specialties, iron, electro crystals 3day crystal chunks, teapot farm, fish weekly
					parametric crystalfly [weekly bosses] reputation
				</Text>
			</Card.Content>
		</Card.Root>
		<!-- Events card -->
		<Card.Root class="text-white">
			<Card.Header>
				<!--TODO: Replace this with i18n key-->
				<Card.Title>
					<Text type="h4">Current Events</Text>
				</Card.Title>
			</Card.Header>
			<Card.Content>
				<Text type="p"></Text>
			</Card.Content>
		</Card.Root>
		<!-- To-do card -->
		<Card.Root class="text-white">
			<Card.Header>
				<!--TODO: Replace this with i18n key-->
				<Card.Title>
					<Text type="h4">To-do List</Text>
				</Card.Title>
			</Card.Header>
			<Card.Content>
				<Text type="p">
					Farmable today: thing thing thing thing summary: some more even more thing
				</Text>
			</Card.Content>
		</Card.Root>
		<!-- Farmable today card -->
		<Card.Root class="text-white">
			<Card.Header>
				<!--TODO: Replace this with i18n key-->
				<Card.Title>
					<Text type="h4">Domain Rotation</Text>
				</Card.Title>
			</Card.Header>
			<Card.Content>
				<Text type="p">talent materials, weapon materials + corresponding chars/weaps</Text>
			</Card.Content>
		</Card.Root>
		<!-- Achievements card -->
		<Card.Root class="text-white">
			<Card.Header>
				<!--TODO: Replace this with i18n key-->
				<Card.Title>
					<Text type="h4">Achievements</Text>
				</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="flex flex-row justify-between">
					<Text type="p">Latest achievement:</Text>
					<Text type="p">{mockAchievement.name}</Text>
				</div>
				<div class="flex flex-row justify-between mt-4">
					<Text type="p">Overall progress:</Text>
					<Text type="p">{achievementsDone}/{achievementsTotal}</Text>
				</div>
				<Progress value={(achievementsDone / achievementsTotal) * 100} class="mt-1.5"></Progress>
			</Card.Content>
			<Card.Footer class="flex justify-end">
				<Button class="rounded-xl border-2 border-gray-600">Achievements</Button>
			</Card.Footer>
		</Card.Root>
		<!-- Pity card -->
		<Card.Root class="text-white">
			<Card.Header>
				<!--TODO: Replace this with i18n key-->
				<Card.Title>
					<Text type="h4">Pity</Text>
				</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="flex flex-row justify-between items-center">
					<Text type="p">Character Banner</Text>
					<div class="flex flex-row">
						<Text type="p">
							<div
								class="text-amber-500 w-14 h-14 flex justify-center items-center rounded-md bg-gray-300/[.03] mr-5"
							>
								{characterPity[0]}
							</div>
						</Text>
						<Text type="p">
							<div
								class="text-violet-400 w-14 h-14 flex justify-center items-center rounded-md bg-gray-300/[.03]"
							>
								{characterPity[1]}
							</div>
						</Text>
					</div>
				</div>
				<div class="flex flex-row justify-between items-center mt-4">
					<Text type="p">Weapon Banner</Text>
					<div class="flex flex-row">
						<Text type="p">
							<div
								class="text-amber-500 w-14 h-14 flex justify-center items-center rounded-md bg-gray-300/[.03] mr-5"
							>
								{weaponPity[0]}
							</div>
						</Text>
						<Text type="p">
							<div
								class="text-violet-400 w-14 h-14 flex justify-center items-center rounded-md bg-gray-300/[.03]"
							>
								{weaponPity[1]}
							</div>
						</Text>
					</div>
				</div>
				<div class="flex flex-row justify-between items-center mt-4">
					<Text type="p">Standart Banner</Text>
					<div class="flex flex-row">
						<Text type="p">
							<div
								class="text-amber-500 w-14 h-14 flex justify-center items-center rounded-md bg-gray-300/[.03] mr-5"
							>
								{standartPity[0]}
							</div>
						</Text>
						<Text type="p">
							<div
								class="text-violet-400 w-14 h-14 flex justify-center items-center rounded-md bg-gray-300/[.03]"
							>
								{standartPity[1]}
							</div>
						</Text>
					</div>
				</div>
			</Card.Content>
			<Card.Footer class="flex justify-end">
				<Button class="rounded-xl border-2 border-gray-600">Wish Counter</Button>
			</Card.Footer>
		</Card.Root>
		<!-- Display card -->
		<Card.Root class="text-white">
			<Card.Header>
				<!--TODO: Replace this with i18n key-->
				<Card.Title>
					<Text type="h4">Display</Text>
				</Card.Title>
			</Card.Header>
			<Card.Content>
				<Text type="p">char or weapon icon name info</Text>
			</Card.Content>
		</Card.Root>
	</div>
</div>
