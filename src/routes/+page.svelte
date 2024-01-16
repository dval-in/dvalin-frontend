<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
</script>

<div class="col-span-2 row-span-2">
	<Card.Root class="size-full text-white flex flex-col">
		<Card.Header>
			<!--TODO: Replace this with i18n key-->
			<Card.Title>Changelog:</Card.Title>
		</Card.Header>
		<Card.Content class="flex-1">
			<p class="whitespace-pre-line">Changelog TXT</p>
		</Card.Content>
		<Card.Footer class="flex-1 items-end justify-end">
			<Button variant="default" class="rounded-xl border-2 border-gray-600">More</Button>
			<Button variant="link" class="rounded-xl border-2 border-gray-600 ml-5">Hide</Button>
		</Card.Footer>
	</Card.Root>
</div>
