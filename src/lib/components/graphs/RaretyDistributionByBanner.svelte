<script lang="ts">
	import { PieChart } from 'layerchart';
	import type { IWish } from '$lib/types/wish';
	import { derived, type Readable } from 'svelte/store';

	export let wishData: Readable<IWish[]>;

	const getData = derived([wishData], ([wishDataStore]) => {
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

		return Object.keys(rarityCount)
			.map((key) => {
				const rarity = Number.parseInt(key);
				return { rarity, value: rarityCount[rarity] };
			})
			.sort((a, b) => a.rarity - b.rarity);
	});

	const keyColors = ['#5E93B2', '#7B5C90', '#FFB13F'];
</script>

<div class="h-[300px] w-full">
	<PieChart
		data={$getData}
		key="rarity"
		cRange={keyColors}
		value="value"
		outerRadius={300 / 2}
		innerRadius={-20}
		cornerRadius={10}
		padAngle={0.02}
		range={[-90, 90]}
		props={{ group: { y: 80 } }}
		legend
	/>
</div>
