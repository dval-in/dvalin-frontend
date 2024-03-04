<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import Text from '$lib/components/typography/Text.svelte';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import PullChip from '$lib/components/ui/pull-chip/PullChip.svelte';
	import type { IWish } from '$lib/types/wish';
	import type { IMappedWish } from '$lib/types/wish.js';

	export let icon: string;
	export let title: string;
	export let data: IMappedWish[];

	const filterFiveStars = (): IMappedWish[] => {
		return data
			.filter((wish: IMappedWish) => wish.rarity === 5)
			.sort((a, b) => b.number - a.number)
			.slice(0, 10);
	};
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
		<Text type="h4">Latest 5* pulls</Text>
		<div class="flex flex-wrap gap-2">
			{#if filterFiveStars().length > 0}
				{#each filterFiveStars() as pull}
					<PullChip name={pull.name} key={pull.key} counter={pull.pity} />
				{/each}
			{:else}
				You haven't pulled a 5* in this banner yet
			{/if}
		</div>
	</div>
</div>
