<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';

	let changeLog = "Version 4.3:<br> New characters: Navia, Cehevreuse";
</script>

<div>
	<div class="flex flex-row gap-x-3">
		<!-- Welcome card -->
		<div class="flex-1">
			<Card.Root class="text-white">
				<Card.Header>
					<!--TODO: Replace this with i18n key-->
					<Card.Title>Welcome to Dval.in!</Card.Title>
				</Card.Header>
				<Card.Content class="flex flex-col">
					<p>
						Your best Genshin Impact companion! Dval.in helps you plan what to farm with an
						ascension calculator, and it also tracks your progress with a todo list and a wish
						counter.
					</p>
					<Button class="place-self-end mt-2 rounded-xl border-2 border-gray-600">Hide</Button>
				</Card.Content>
			</Card.Root>
		</div>
		<!-- Changelog card -->
		<div class="flex-1">
			<Card.Root class="text-white">
				<Card.Header>
					<!--TODO: Replace this with i18n key-->
					<Card.Title>Changelog:</Card.Title>
				</Card.Header>
				<Card.Content class="flex flex-col">
					<p>
						{@html changeLog}
					</p>
					<Button class="place-self-end mt-2 rounded-xl border-2 border-gray-600">More</Button>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</div>
