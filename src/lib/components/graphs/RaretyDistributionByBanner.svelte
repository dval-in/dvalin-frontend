<script lang="ts">
	import { scaleOrdinal } from 'd3-scale';
	import { Chart, Pie, Svg, Tooltip } from 'layerchart';
	import type { IWish } from '$lib/types/wish';
	import { derived, type Readable } from 'svelte/store';

	export let wishData: Readable<IWish[]>;

	const getData = derived([wishData], ([wishDataStore]) => {
		const rarityCount: { [key: number]: number } = {};

		wishDataStore.forEach((wish: IWish) => {
			if (rarityCount[wish.rarity] === undefined) {
				rarityCount[wish.rarity] = 0;
			}
			rarityCount[wish.rarity] = rarityCount[wish.rarity] + 1;
		});

		return Object.keys(rarityCount)
			.map((key) => {
				const rarity = Number.parseInt(key);
				return { rarity, value: rarityCount[rarity] };
			})
			.sort((a, b) => a.rarity - b.rarity);
	});

	const colorKeys = [3, 4, 5];
	const keyColors = ['#5E93B2', '#7B5C90', '#FFB13F'];
</script>

<div class="h-[300px] min-w-[300px] w-full">
	<Chart
		data={$getData}
		let:tooltip
		r="rarity"
		rDomain={colorKeys}
		rRange={keyColors}
		rScale={scaleOrdinal()}
		x="value"
	>
		<Svg>
			<Pie {tooltip} />
		</Svg>
		<Tooltip.Root class="bg-neutral" let:data>
			<Tooltip.List>
				<Tooltip.Item
					format="integer"
					label="Star"
					value={data.rarity}
					valueAlign="right"
				/>
				<Tooltip.Item
					format="integer"
					label="value"
					value={data.value}
					valueAlign="right"
				/>
				<Tooltip.Item
					format="percent"
					label="percent"
					value={data.value / $wishData.length}
					valueAlign="right"
				/>
			</Tooltip.List>
		</Tooltip.Root>
	</Chart>
</div>
