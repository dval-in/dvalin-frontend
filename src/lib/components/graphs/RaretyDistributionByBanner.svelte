<script lang="ts">
	import { BarChart, Tooltip } from 'layerchart';
	import type { IWish } from '$lib/types/wish';
	import { derived, type Readable } from 'svelte/store';

	export let wishData: Readable<IWish[]>;

	const data = derived([wishData], ([wishDataStore]) => {
		const rarityCount: { [key: number]: number } = {};

		wishDataStore.forEach((wish: IWish) => {
			if (wish.rarity === 0) {
				return;
			}
			if (rarityCount[wish.rarity] === undefined) {
				rarityCount[wish.rarity] = 0;
			}
			rarityCount[wish.rarity] = rarityCount[wish.rarity] + 1;
		});

		return [
			{
				test: 0,
				'3': rarityCount['3'] / wishDataStore.length,
				'4': rarityCount['4'] / wishDataStore.length,
				'5': rarityCount['5'] / wishDataStore.length,
				count: { ...rarityCount }
			}
		];
	});
</script>

<div class="h-[100px] w-full">
	<BarChart
		data={$data}
		y="test"
		orientation="horizontal"
		series={[
			{
				key: '5',
				label: 'Fivestar',
				color: 'var(--fivestar)'
			},
			{
				key: '4',
				label: 'Fourstar',
				color: 'var(--color-fourstar)'
			},
			{ key: '3', label: 'Threestar', color: 'var(--color-threestar)' }
		]}
		seriesLayout="stack"
		axis={false}
		grid={false}
		props={{
			bars: { radius: 4.0, rounded: 'all', strokeWidth: 0 },
			highlight: { axis: 'none' }
		}}
		stackPadding={4}
		legend={{ onclick: undefined }}
	>
		<svelte:fragment slot="tooltip" let:series>
			<Tooltip.Root class="bg-neutral" let:data>
				<Tooltip.Header>
					{'Total pulls: ' + (data.count['3'] + data.count['4'] + data.count['5'])}
				</Tooltip.Header>
				<Tooltip.List>
					{#each series as s}
						<Tooltip.Item label={s.label} color={s.color}>
							{`${data.count[s.key]} (${(data[s.key] * 100).toFixed(2)}%)`}
						</Tooltip.Item>
					{/each}
				</Tooltip.List>
			</Tooltip.Root>
		</svelte:fragment>
	</BarChart>
</div>
