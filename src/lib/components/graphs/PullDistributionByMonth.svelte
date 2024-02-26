<script lang="ts">
	import { scaleOrdinal, scaleTime } from 'd3-scale';
	import { format, formatDate, PeriodType } from 'svelte-ux';
	import { AreaStack, Axis, Chart, Highlight, Svg, Tooltip, TooltipItem } from 'layerchart';
	import type { Wishes } from '$lib/structs/application_state';
	import { stack } from 'd3-shape';
	import { flatten } from 'svelte-ux/utils/array';

	export let data: Wishes;

	const keys = ['3', '4', '5'];

	const getMonthlyData = () => {
		let pullsByMonth: { [key: string]: { [key: string]: number } } = {};

		const bannerHistoryData = [
			...data.bannerHistory.character,
			...data.bannerHistory.weapon,
			...data.bannerHistory.standard
		];

		bannerHistoryData.forEach((d) => {
			const date = new Date(d.date);
			const dateKey = date.getFullYear() + '-' + (date.getMonth() + 1);
			if (pullsByMonth[dateKey] === undefined) {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				pullsByMonth[dateKey] = { '3': 0, '4': 0, '5': 0 };
			}
			pullsByMonth[dateKey][d.rarity] = pullsByMonth[dateKey][d.rarity] + 1;
		});

		return stack().keys(keys)(
			Object.keys(pullsByMonth)
				.map((key) => {
					return {
						date: new Date(key),
						// eslint-disable-next-line @typescript-eslint/naming-convention
						'3': pullsByMonth[key]['3'],
						// eslint-disable-next-line @typescript-eslint/naming-convention
						'4': pullsByMonth[key]['4'],
						// eslint-disable-next-line @typescript-eslint/naming-convention
						'5': pullsByMonth[key]['5']
					};
				})
				.sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf())
		);
	};
</script>

<div class="h-[300px] w-full">
	<Chart
		data={getMonthlyData()}
		flatData={flatten(getMonthlyData())}
		let:height
		let:padding
		padding={{ left: 16, bottom: 24 }}
		r="key"
		rDomain={keys}
		rRange={['#5E93B2', '#7B5C90', '#FFB13F']}
		rScale={scaleOrdinal()}
		tooltip
		x={(d) => d.data.date}
		xScale={scaleTime()}
		y={[0, 1]}
		yNice
	>
		<Svg>
			<Axis grid labelProps={{ class: 'fill-text' }} placement="left" rule />
			<Axis
				format={(d) => formatDate(d, PeriodType.MonthYear, { variant: 'short' })}
				labelProps={{ class: 'fill-text' }}
				placement="bottom"
				rule
			/>
			<AreaStack />
			<Highlight lines={{ class: 'stroke-text [stroke-dasharray:unset]' }} points />
		</Svg>
		<Tooltip header={(data) => format(data.data.date, PeriodType.MonthYear)} let:data>
			<TooltipItem label={'total'} value={data.data['3'] + data.data['4'] + data.data['5']} />
			{#each keys as key}
				<TooltipItem label={key} value={data.data[key]} />
			{/each}
		</Tooltip>
		<Tooltip
			anchor="top"
			class="text-sm font-semibold bg-primary text-text-content leading-3 px-2 py-1 rounded whitespace-nowrap"
			let:data
			variant="none"
			x="data"
			y={height + padding.top + 2}
		>
			{format(data.data.date, PeriodType.MonthYear)}
		</Tooltip>
	</Chart>
</div>
