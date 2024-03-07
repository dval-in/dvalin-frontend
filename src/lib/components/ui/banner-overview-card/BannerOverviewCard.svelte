<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import Text from '$lib/components/typography/Text.svelte';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import PullChip from '$lib/components/ui/pull-chip/PullChip.svelte';
	import type { IWish } from '$lib/types/wish';
	import type { IMappedWish } from '$lib/types/wish.js';
	import { Card, CardHeader } from '$lib/components/ui/card';
	import { CardContent } from '$lib/components/ui/card/index.js';
	import InfoCell from '$lib/components/ui/info-cell/InfoCell.svelte';
	import { mdiMoonWaningCrescent } from '@mdi/js';

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

<Card class="flex flex-1 flex-col bg-tertiary rounded-md gap-3">
	<CardHeader class="flex flex-row flex-wrap justify-between">
		<div class="flex items-center gap-1">
			<Icon path={icon} />
			<Text type="h3">{title}</Text>
		</div>
		<Button href={'/wish-statistics/' + title.toLowerCase()}>View more</Button>
	</CardHeader>
	<CardContent class="flex flex-col gap-2">
		<div class="flex flex-row gap-2">
			<InfoCell title="Total pulls">
				<Text type="h4">{data.length}</Text>

				<svelte:fragment slot="tooltip">
					<Icon path={mdiMoonWaningCrescent} />
					<Text type="h4">{data.length * 160}</Text>
				</svelte:fragment>
			</InfoCell>
			<InfoCell title="% of total pulls">
				<Text type="h4">{0}</Text>
				<Text type="h4">{0}</Text>
			</InfoCell>
			<InfoCell title="Pity">
				<Text type="h4">{0}</Text>
				<Text type="h4">{0}</Text>
			</InfoCell>
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
	</CardContent>
</Card>
