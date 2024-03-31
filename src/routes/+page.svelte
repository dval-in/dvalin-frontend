<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Text from '$lib/components/typography/Text.svelte';
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import { Card, CardContent, CardFooter, CardHeader } from '$lib/components/ui/card';
</script>

<DefaultLayout title="Dashboard">
	<div class="col-span-2 row-span-2">
		<Card class="size-full flex flex-col">
			<CardHeader>
				<Text type="h3">Changelog:</Text>
			</CardHeader>
			<CardContent class="flex-1">
				<Text type="p">
					Improved import (support a wider range of exports, no multi account though!!)
				</Text>
				<Text type="p">Beginner's banner</Text>
				<Text type="p">
					Improved pull list (added pull number, highlight 4 & 5 star, filter by dates)
				</Text>
				<Text type="p">
					Fixed images (no brokey anymore!!!!, huge thanks to @Flappydom for helping with
					renaming files)
				</Text>
				<Text type="p">Improved search experience</Text>
				<Text type="p">Characters are retrieved from user data</Text>
				<Text type="p">
					Use GOOD types under the hood (You cant see it but believe me... its there)
				</Text>
				<Text type="p">Character/weapon/rarity mapping</Text>
			</CardContent>
			<CardFooter class="flex-1 justify-end gap-2">
				<Button variant="default">More</Button>
				<Button variant="ghost">Hide</Button>
			</CardFooter>
		</Card>
	</div>
</DefaultLayout>
