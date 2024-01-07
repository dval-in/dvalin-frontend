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

<div>
	<div class="grid grid-cols-4 gap-4 auto-rows-fr">
		<!-- Welcome card -->
		<div class="col-span-2 row-span-1">
			<Card.Root class="size-full text-white flex flex-col">
				<Card.Header>
					<!--TODO: Replace this with i18n key-->
					<Card.Title>Welcome to Dval.in!</Card.Title>
				</Card.Header>
				<Card.Content class="flex-1">
					<p>
						Your best Genshin Impact companion! Dval.in helps you plan what to farm with an
						ascension calculator, and it also tracks your progress with a todo list and a wish
						counter.
					</p>
				</Card.Content>
				<Card.Footer class="flex-1 items-end justify-end">
					<Button class="rounded-xl border-2 border-gray-600">Hide</Button>
				</Card.Footer>
			</Card.Root>
		</div>
		<!-- Changelog card -->
		<div class="col-span-2 row-span-2">
			<Card.Root class="size-full text-white flex flex-col">
				<Card.Header>
					<!--TODO: Replace this with i18n key-->
					<Card.Title>Changelog:</Card.Title>
				</Card.Header>
				<Card.Content class="flex-1">
					<p class="whitespace-pre-line">{changeLog}</p>
				</Card.Content>
				<Card.Footer class="flex-1 items-end justify-end">
					<Button class="rounded-xl border-2 border-gray-600">More</Button>
					<Button class="rounded-xl border-2 border-gray-600 ml-5">Hide</Button>
				</Card.Footer>
			</Card.Root>
		</div>
		<!-- Reminder card -->
		<div class="align-start">
			<Card.Root class="size-full text-white">
				<Card.Header>
					<!--TODO: Replace this with i18n key-->
					<Card.Title>Reminder</Card.Title>
				</Card.Header>
				<Card.Content>
					<p class="whitespace-pre-line"></p>
				</Card.Content>
			</Card.Root>
		</div>
		<!-- Events card -->
		<div class="align-start">
			<Card.Root class="size-full text-white">
				<Card.Header>
					<!--TODO: Replace this with i18n key-->
					<Card.Title>Current Events</Card.Title>
				</Card.Header>
				<Card.Content>
					<p class="whitespace-pre-line"></p>
				</Card.Content>
			</Card.Root>
		</div>
		<!-- To-do card -->
		<div class="align-start">
			<Card.Root class="size-full text-white">
				<Card.Header>
					<!--TODO: Replace this with i18n key-->
					<Card.Title>To-do List</Card.Title>
				</Card.Header>
				<Card.Content>
					<p class="whitespace-pre-line"></p>
				</Card.Content>
			</Card.Root>
		</div>
	</div>

</div>
