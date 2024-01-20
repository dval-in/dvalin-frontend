<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import Text from '$lib/components/typography/Text.svelte';
	import { Progress } from '$lib/components/ui/progress';

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

	type Achievement = {
		id: number;
		name: string;
		desc: string;
		reward: number;
		hidden: boolean;
		order: number;
	};

	// type AchievementCategory = {
	// 	idN: number;
	// 	id: string;
	// 	name: string;
	// 	order: number;
	// 	achievements: Achievement[];
	// };

	const mockAchievement: Achievement = {
		id: 0,
		name: 'Test Achievement',
		desc: 'lorem ipsum',
		reward: 1,
		hidden: false,
		order: 0
	};

	// const mockAchievementCategory: AchievementCategory = {
	// 	idN: 0,
	// 	id: 'testCategory',
	// 	name: 'Test Category',
	// 	order: 0,
	// 	achievements: [mockAchievement]
	// };

	let achievementsDone = 998;
	let achievementsTotal = 1143;

	let characterPity = [76, 8];
	let weaponPity = [23, 2];
	let standartPity = [53, 5];
</script>

<div class="h-[calc(100dvh-1rem)]">
	<section class="flex flex-row justify-between px-5 items-center mb-5">
		<h1 class="text-4xl font-semibold">Home</h1>
		<Button class="rounded-xl border-2 border-gray-600">Edit</Button>
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
					<Text type="large">Latest achievement:</Text>
					<Text type="p">{mockAchievement.name}</Text>
				</div>
				<div class="flex flex-row justify-between mt-4">
					<Text type="large">Overall progress:</Text>
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
					<Text type="large">Character Banner</Text>
					<div class="flex flex-row">
						<div
							class="text-amber-500 w-14 h-14 flex justify-center items-center rounded-md bg-fill/[.03] mr-5"
						>
							<Text type="large">
								{characterPity[0]}
							</Text>
						</div>
						<div
							class="text-violet-400 w-14 h-14 flex justify-center items-center rounded-md bg-fill/[.03]"
						>
							<Text type="large">
								{characterPity[1]}
							</Text>
						</div>
					</div>
				</div>
				<div class="flex flex-row justify-between items-center mt-4">
					<Text type="large">Weapon Banner</Text>
					<div class="flex flex-row">
						<div
							class="text-amber-500 w-14 h-14 flex justify-center items-center rounded-md bg-fill/[.03] mr-5"
						>
							<Text type="large">
								{weaponPity[0]}
							</Text>
						</div>
						<div
							class="text-violet-400 w-14 h-14 flex justify-center items-center rounded-md bg-fill/[.03]"
						>
							<Text type="large">
								{weaponPity[1]}
							</Text>
						</div>
					</div>
				</div>
				<div class="flex flex-row justify-between items-center mt-4">
					<Text type="large">Standart Banner</Text>
					<div class="flex flex-row">
						<div
							class="text-amber-500 w-14 h-14 flex justify-center items-center rounded-md bg-fill/[.03] mr-5"
						>
							<Text type="large">
								{standartPity[0]}
							</Text>
						</div>
						<div
							class="text-violet-400 w-14 h-14 flex justify-center items-center rounded-md bg-fill/[.03]"
						>
							<Text type="large">
								{standartPity[1]}
							</Text>
						</div>
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
