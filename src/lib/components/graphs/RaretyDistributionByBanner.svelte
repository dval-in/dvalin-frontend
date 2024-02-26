<script lang="ts">
	import { scaleOrdinal } from 'd3-scale';
	import { Chart, Pie, Svg, Tooltip, TooltipItem } from 'layerchart';
	import type { Wish } from '$lib/structs/wish';

	export let wishData: Wish[];

	const getData = () => {
		const test: { [key: number]: number } = {};

		wishData.forEach((wish) => {
			if (test[wish.rarity] === undefined) {
				test[wish.rarity] = 0;
			}
			test[wish.rarity] = test[wish.rarity] + 1;
		});

		return Object.keys(test)
			.map((key) => {
				const a = Number.parseInt(key);
				return { rarity: a, value: test[a] };
			})
			.sort((a, b) => a.rarity - b.rarity);
	};

	const colorKeys = [0, 1, 2];
	const keyColors = ['#5E93B2', '#7B5C90', '#FFB13F'];
</script>

<div class="h-[300px] w-full">
	<Chart
		data={getData()}
		let:tooltip
		r="rarity"
		rDomain={colorKeys}
		rRange={keyColors}
		rScale={scaleOrdinal()}
		tooltip={{ mode: 'manual' }}
		x="value"
	>
		<Svg>
			<Pie {tooltip} />
		</Svg>
		<Tooltip let:data>
			<TooltipItem format="integer" label="Star" value={data.rarity} valueAlign="right" />
			<TooltipItem format="integer" label="value" value={data.value} valueAlign="right" />
			<TooltipItem
				format="percent"
				label="percent"
				value={data.value / wishData.length}
				valueAlign="right"
			/>
		</Tooltip>
	</Chart>
</div>
