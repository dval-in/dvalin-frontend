<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import Text from '$lib/components/typography/Text.svelte';
</script>

<div class="col-span-2 row-span-2">
	<Card.Root class="size-full flex flex-col">
		<Card.Header>
			<Card.Title>Changelog:</Card.Title>
		</Card.Header>
		<Card.Content class="flex-1">
			<Text type="p">Changelog TXT</Text>
		</Card.Content>
		<Card.Footer class="flex-1 items-end gap-5 justify-end">
			<Button variant="default">More</Button>
			<Button variant="ghost">Hide</Button>
		</Card.Footer>
	</Card.Root>
</div>
