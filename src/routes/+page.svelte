<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import Text from '$lib/components/typography/Text.svelte';
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
</script>

<DefaultLayout title="Dashboard">
	<div class="col-span-2 row-span-2">
		<Card.Root class="size-full flex flex-col">
			<Card.Header>
				<Card.Title>Changelog:</Card.Title>
			</Card.Header>
			<Card.Content class="flex-1">
				<Text type="p">
					Improved import (support a wider range of exports, no multi account though!!)
				</Text>
				<Text type="p">Beginner's banner</Text>
				<Text type="p">
					Improved pull list (added pull number, highlight 4 & 5 star, filter by dates)
				</Text>
				<Text type="p">
					Fixed images (no brokey anymore!!!!, huge thanks to @Flappydom for helping with renaming
					files)
				</Text>
				<Text type="p">Improved search experience</Text>
				<Text type="p">Characters are retrieved from user data</Text>
				<Text type="p">
					Use GOOD types under the hood (You cant see it but believe me... its there)
				</Text>
				<Text type="p">Character/weapon/rarity mapping</Text>
			</Card.Content>
			<Card.Footer class="flex-1 items-end gap-5 justify-end">
				<Button variant="default">More</Button>
				<Button variant="ghost">Hide</Button>
			</Card.Footer>
		</Card.Root>
	</div>
</DefaultLayout>
