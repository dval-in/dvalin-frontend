<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import Text from '$lib/components/typography/Text.svelte';

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
			<Card.Content class="flex-1">
				<Text type="p">{changeLog}</Text>
			</Card.Content>
			<Card.Footer class="flex-1 items-end justify-end">
				<Button variant="default" class="rounded-xl border-2 border-gray-600">More</Button>
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
					Daily daily quest something else 3day farm nobushi farm hilichurls weekly parametric
					crystalfly
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
		<!-- Achievements card -->
		<Card.Root class="text-white">
			<Card.Header>
				<!--TODO: Replace this with i18n key-->
				<Card.Title>
					<Text type="h4">Achievements</Text>
				</Card.Title>
			</Card.Header>
			<Card.Content>
				<Text type="p">
					Latest achievement: name of achievement overall progress progress bar with percantages
				</Text>
			</Card.Content>
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
				<Text type="p">
					Character Pity gold color 5* and purple for 4* weapon Pity gold color 5* and purple for 4*
					standart pity gold color 5* and purple for 4*
				</Text>
			</Card.Content>
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
