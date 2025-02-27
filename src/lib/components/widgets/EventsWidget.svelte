<script lang="ts">
	import Text from '$lib/components/typography/Text.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import {
		Card,
		CardContent,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card/index.js';
	import i18n from '$lib/services/i18n';

	type Event = {
		id: number;
		name: string;
		desc: string;
		start: Date;
		end: Date;
	};

	const mockEvent: Event = {
		id: 0,
		name: 'Test Event',
		desc: 'lorem ipsum',
		start: new Date(2024, 3, 8, 5, 59),
		end: new Date(2024, 3, 18, 5, 59)
	};

	let currentVer = `4.5`;
	let currentDate = new Date();
	$: currentTime = currentDate.getTime();
</script>

<Card class=" flex flex-col">
	<CardHeader>
		<CardTitle>
			<Text type="h4">
				{$i18n.t('dashboard.widget.events.title')} Current Events
			</Text>
		</CardTitle>
	</CardHeader>
	<CardContent>
		<Text type="large">
			{$i18n.t('dashboard.widget.events.version')}
			{currentVer}
		</Text>
		<div class="mt-2 flex flex-col gap-1.5">
			<!-- TODO: get localized event names -->
			<div class="bg-neutral flex flex-row justify-between rounded-md px-2 py-3">
				<Text type="p">{mockEvent.name}</Text>
				<Text type="p">
					{Math.floor((mockEvent.end.getTime() - currentTime) / 3600000 / 24)}d
					{Math.floor((mockEvent.end.getTime() - currentTime) / 3600000) -
						24 * Math.floor((mockEvent.end.getTime() - currentTime) / 3600000 / 24)}h
				</Text>
			</div>
			<div class="bg-neutral flex flex-row justify-between rounded-md px-2 py-3">
				<Text type="p">{mockEvent.name}</Text>
				<Text type="p">
					{Math.floor((mockEvent.end.getTime() - currentTime) / 3600000 / 24)}d
					{Math.floor((mockEvent.end.getTime() - currentTime) / 3600000) -
						24 * Math.floor((mockEvent.end.getTime() - currentTime) / 3600000 / 24)}h
				</Text>
			</div>
			<div class="bg-neutral flex flex-row justify-between rounded-md px-2 py-3">
				<Text type="p">{mockEvent.name}</Text>
				<Text type="p">
					{Math.floor((mockEvent.end.getTime() - currentTime) / 3600000 / 24)}d
					{Math.floor((mockEvent.end.getTime() - currentTime) / 3600000) -
						24 * Math.floor((mockEvent.end.getTime() - currentTime) / 3600000 / 24)}h
				</Text>
			</div>
			<div class="bg-neutral flex flex-row justify-between rounded-md px-2 py-3">
				<Text type="p">{mockEvent.name}</Text>
				<Text type="p">
					{Math.floor((mockEvent.end.getTime() - currentTime) / 3600000 / 24)}d
					{Math.floor((mockEvent.end.getTime() - currentTime) / 3600000) -
						24 * Math.floor((mockEvent.end.getTime() - currentTime) / 3600000 / 24)}h
				</Text>
			</div>
		</div>
	</CardContent>
	<CardFooter class="mt-2.5">
		<Button class="w-full">
			{$i18n.t('dashboard.widget.events.timeline.button')}
		</Button>
	</CardFooter>
</Card>
