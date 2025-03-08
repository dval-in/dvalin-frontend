<script lang="ts">
	import { scaleTime } from 'd3-scale';
	import type { WishBannerKey } from '$lib/types/keys/WishBannerKey';
	import { applicationState } from '$lib/store/application_state';
	import { derived, type Readable } from 'svelte/store';
	import type { INamedWishes, IWish } from '$lib/types/wish';
	import { Area, AreaChart, LinearGradient, RectClipPath, Tooltip } from 'layerchart';

	export let data: Readable<INamedWishes>;

	const monthlyData = derived([data], ([dataStore]) => {
		let pullsByMonth: { [key: string]: { [key: string]: number } } = {};

		const bannerHistoryData: IWish[] = [];

		Object.keys(dataStore).forEach((key: string) => {
			const wishes = dataStore[key as WishBannerKey];

			bannerHistoryData.push(...(wishes !== undefined ? wishes : []));
		});

		bannerHistoryData.forEach((d) => {
			const date = new Date(d.date);
			const dateKey = date.getMonth() + 1 + '.01.' + date.getFullYear();
			if (pullsByMonth[dateKey] === undefined) {
				pullsByMonth[dateKey] = { '3': 0, '4': 0, '5': 0 };
			}
			pullsByMonth[dateKey][d.rarity] = pullsByMonth[dateKey][d.rarity] + 1;
		});

		return Object.keys(pullsByMonth)
			.map((key) => {
				return {
					date: new Date(key),
					...pullsByMonth[key]
				};
			})
			.sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf());
	});

	$: {
		console.log($monthlyData);
	}

	const formatDateLabel = (d: string, m: 'long' | 'short' = 'short') =>
		new Date(d).toLocaleDateString($applicationState.settings.locale, {
			month: m,
			year: '2-digit'
		});
</script>

<div class=" h-[350px] w-full">
	<AreaChart
		data={$monthlyData}
		x="date"
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
		legend={{ onclick: undefined }}
		props={{
			tooltip: {
				header: {
					format: formatDateLabel
				}
			},
			xAxis: {
				format: formatDateLabel,
				ticks: (scale) => scaleTime(scale.domain(), scale.range()).ticks()
			}
		}}
		padding={{ left: 16, bottom: 62 }}
	>
		<svelte:fragment slot="marks" let:series let:getAreaProps let:tooltip let:width let:height>
			{#each series as s, i (s.key)}
				<LinearGradient
					stops={[s.color, 'color-mix(in hsl, ' + s.color + ' 20%, transparent)']}
					vertical
					let:gradient
				>
					<Area
						{...getAreaProps(s, i)}
						fill={gradient}
						fill-opacity={0.4}
						line={{ class: `stroke-2`, stroke: s.color }}
					/>
					<RectClipPath
						x={0}
						y={0}
						width={tooltip.data ? tooltip.x : width}
						{height}
						spring
					>
						<Area
							{...getAreaProps(s, i)}
							fill={gradient}
							fill-opacity={1}
							line={{ class: 'stroke-2', stroke: s.color }}
						/>
					</RectClipPath>
				</LinearGradient>
			{/each}
		</svelte:fragment>
		<svelte:fragment slot="tooltip" let:series let:height let:padding>
			<Tooltip.Root class="bg-neutral" let:data x="data">
				<Tooltip.Header>
					{'Total pulls: ' + (data['3'] + data['4'] + data['5'])}
				</Tooltip.Header>
				<Tooltip.List>
					{#each series as s}
						<Tooltip.Item label={s.label} color={s.color}>{data[s.key]}</Tooltip.Item>
					{/each}
				</Tooltip.List>
			</Tooltip.Root>
			<Tooltip.Root
				anchor="top"
				class="bg-primary text-text-content whitespace-nowrap rounded-sm px-2 py-1 text-sm font-semibold leading-3"
				let:data
				variant="none"
				x="data"
				y={height + padding.top + 2}
			>
				{formatDateLabel(data.date, 'long')}
			</Tooltip.Root>
		</svelte:fragment>
	</AreaChart>
</div>
