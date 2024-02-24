<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import Text from '$lib/components/typography/Text.svelte';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import type { Wish } from '$lib/structs/wish';
	import PullChip from './pull-chip/PullChip.svelte';

	export let icon: string;
	export let title: string;
	export let data: Wish[];

	const sortedWishData = data.sort(
		(a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
	);
</script>

<div class="flex flex-1 flex-col bg-tertiary rounded-md p-4 gap-3">
	<div class="flex justify-between">
		<div class="flex items-center gap-1">
			<Icon path={icon} />
			<Text type="h3">{title}</Text>
		</div>
		<Button href={'/wish-statistics/' + title.toLowerCase()}>View more</Button>
	</div>
	<div class="flex justify-between gap-2">
		<div
			class="flex flex-1 flex-col p-2 min-w-24 items-center justify-center gap-2 bg-neutral rounded-md text-center"
		>
			<Text type="h4">Total pulls</Text>
			<Text type="h4">{data.length}</Text>
			<Text type="p">{data.length * 160}</Text>
		</div>
		<div
			class="flex flex-1 flex-col p-2 min-w-24 items-center justify-center gap-2 bg-neutral rounded-md text-center"
		>
			<Text type="h4">% of total pulls</Text>
			<Text type="h4">{0}</Text>
		</div>
		<div
			class="flex flex-1 flex-col p-2 min-w-24 items-center justify-center gap-2 bg-neutral rounded-md text-center"
		>
			<Text type="h4">Pity</Text>
			<div class="flex gap-2">
				<Text type="h4">{0}</Text>
				<Text type="h4">{0}</Text>
			</div>
		</div>
	</div>
	<div class="flex flex-col gap-2">
		<Text type="h4">Latest pulls</Text>
		<div class="flex flex-wrap gap-2">
			{#each sortedWishData.slice(0, 10) as pull}
				<PullChip type={pull.type} name={pull.name} counter={pull.pity} />
			{/each}
		</div>
	</div>
</div>
