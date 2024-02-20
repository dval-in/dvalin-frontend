<script lang="ts">
	import { scaleTime } from 'd3-scale';
	import { format, PeriodType } from 'svelte-ux';
	import {
		Area,
		Axis,
		Chart,
		Highlight,
		LinearGradient,
		RectClipPath,
		Svg,
		Tooltip
	} from 'layerchart';
	import type { Wishes } from '$lib/structs/application_state';

	export let data: Wishes;

	const getMonthlyData = () => {
		let pullsByMonth: { [key: string]: number } = {};

		const bannerHistoryData = [
			...data.bannerHistory.character,
			...data.bannerHistory.weapon,
			...data.bannerHistory.standard
		];

		bannerHistoryData.forEach((d) => {
			const date = new Date(d.date);
			const dateKey = date.getFullYear() + '-' + (date.getMonth() + 1);
			if (pullsByMonth[dateKey] === undefined) {
				pullsByMonth[dateKey] = 0;
			}
			pullsByMonth[dateKey] = pullsByMonth[dateKey] + 1;
		});

		return Object.keys(pullsByMonth).map((key) => {
			return { date: new Date(key), value: pullsByMonth[key] };
		});
	};
</script>

<div class="h-[300px] w-full">
	<Chart
		data={getMonthlyData()}
		let:height
		let:padding
		let:tooltip
		let:width
		padding={{ top: 48, bottom: 24, left: 16, right: 16 }}
		tooltip
		x={'date'}
		xScale={scaleTime()}
		y="value"
		yDomain={[0, null]}
		yNice
	>
		<Svg>
			<Axis grid placement="left" rule />
			<Axis labelProps={{ class: 'fill-text' }} placement="bottom" />
			<LinearGradient class="from-text/50 to-text/0" let:url vertical>
				<Area fill={url} line={{ class: 'stroke-2 stroke-text opacity-20' }} />
				<RectClipPath {height} spring width={tooltip.data ? tooltip.x : width} x={0} y={0}>
					<Area fill={url} line={{ class: 'stroke-2 stroke-text' }} />
				</RectClipPath>
			</LinearGradient>
			<Highlight lines={{ class: 'stroke-text [stroke-dasharray:unset]' }} points />
		</Svg>

		<Tooltip
			anchor="top"
			class="text-sm font-semibold bg-primary text-text-content leading-3 px-2 py-1 rounded whitespace-nowrap"
			let:data
			variant="none"
			x="data"
			y={0}
		>
			{data.value}
		</Tooltip>

		<Tooltip
			anchor="top"
			class="text-sm font-semibold bg-primary text-text-content leading-3 px-2 py-1 rounded whitespace-nowrap"
			let:data
			variant="none"
			x="data"
			y={height + padding.top + 2}
		>
			{format(data.date, PeriodType.MonthYear)}
		</Tooltip>
	</Chart>
</div>
