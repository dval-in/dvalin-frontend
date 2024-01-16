<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';

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
				<Card.Title>Welcome to Dval.in!</Card.Title>
			</Card.Header>
			<Card.Content class="flex-1">
				<p>
					Your best Genshin Impact companion! Dval.in helps you plan what to farm with an ascension
					calculator, and it also tracks your progress with a todo list and a wish counter.
				</p>
			</Card.Content>
			<Card.Footer class="flex-1 items-end justify-end">
				<Button class="rounded-xl border-2 border-gray-600">Hide</Button>
			</Card.Footer>
		</Card.Root>
		<!-- Changelog card -->
		<Card.Root class="text-white flex flex-col">
			<Card.Header>
				<!--TODO: Replace this with i18n key-->
				<Card.Title>Changelog:</Card.Title>
			</Card.Header>
			<Card.Content class="flex-1">
				<p class="whitespace-pre-line">{changeLog}</p>
			</Card.Content>
			<Card.Footer class="flex-1 items-end justify-end">
				<Button variant="default" class="rounded-xl border-2 border-gray-600">More</Button>
			</Card.Footer>
		</Card.Root>
		<!-- Reminder card -->
		<Card.Root class="text-white">
			<Card.Header>
				<!--TODO: Replace this with i18n key-->
				<Card.Title>Reminder</Card.Title>
			</Card.Header>
			<Card.Content>
				<p class="whitespace-pre-line">
					Daily daily quest something else 3day farm nobushi farm hilichurls weekly parametric
					crystalfly
				</p>
			</Card.Content>
		</Card.Root>
		<!-- Events card -->
		<Card.Root class="text-white">
			<Card.Header>
				<!--TODO: Replace this with i18n key-->
				<Card.Title>Current Events</Card.Title>
			</Card.Header>
			<Card.Content>
				<p class="whitespace-pre-line"></p>
			</Card.Content>
		</Card.Root>
		<!-- To-do card -->
		<Card.Root class="text-white">
			<Card.Header>
				<!--TODO: Replace this with i18n key-->
				<Card.Title>To-do List</Card.Title>
			</Card.Header>
			<Card.Content>
				<p class="whitespace-pre-line">
					Farmable today: thing thing thing thing summary: some more even more thing
				</p>
			</Card.Content>
		</Card.Root>
		<!-- Achievements card -->
		<Card.Root class="text-white">
			<Card.Header>
				<!--TODO: Replace this with i18n key-->
				<Card.Title>Achievements</Card.Title>
			</Card.Header>
			<Card.Content>
				<p class="whitespace-pre-line">
					Latest achievement: name of achievement overall progress progress bar with percantages
				</p>
			</Card.Content>
		</Card.Root>
		<!-- Pity card -->
		<Card.Root class="text-white">
			<Card.Header>
				<!--TODO: Replace this with i18n key-->
				<Card.Title>Pity</Card.Title>
			</Card.Header>
			<Card.Content>
				<p class="whitespace-pre-line">
					Character Pity gold color 5* and purple for 4* weapon Pity gold color 5* and purple for 4*
					standart pity gold color 5* and purple for 4*
				</p>
			</Card.Content>
		</Card.Root>
		<!-- Display card -->
		<Card.Root class="text-white">
			<Card.Header>
				<!--TODO: Replace this with i18n key-->
				<Card.Title>Display</Card.Title>
			</Card.Header>
			<Card.Content>
				<p class="whitespace-pre-line">char or weapon icon name info</p>
			</Card.Content>
		</Card.Root>
	</div>
</div>
