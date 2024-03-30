<script lang="ts">
	import { scaleOrdinal, scaleTime } from 'd3-scale';
	import { format, formatDate, PeriodType } from 'svelte-ux';
	import {
		Area,
		AreaStack,
		Axis,
		Chart,
		Highlight,
		Legend,
		RectClipPath,
		Svg,
		Tooltip
	} from 'layerchart';
	import { stack } from 'd3-shape';
	import { flatten } from 'svelte-ux/utils/array';
	import type { IMappedWish, IMappedWishes } from '$lib/types/wish';
	import type { WishBannerKey } from '$lib/types/keys/WishBannerKey';
	import { mdiStar } from '@mdi/js';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import Text from '$lib/components/typography/Text.svelte';

	export let data: IMappedWishes;

	const keys = ['5', '4', '3'];
	const colorKeys = ['#5E93B2', '#7B5C90', '#FFB13F'];

	const getMonthlyData = () => {
		let pullsByMonth: { [key: string]: { [key: string]: number } } = {};

		const bannerHistoryData: IMappedWish[] = [];

		Object.keys(data).forEach((key: string) => {
			const wishes = data[key as WishBannerKey];

			bannerHistoryData.push(...(wishes !== undefined ? wishes : []));
		});

		bannerHistoryData.forEach((d) => {
			const date = new Date(d.date);
			const dateKey = date.getMonth() + 1 + '.01.' + date.getFullYear();
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
						date: new Date(key).getTime(),
						// eslint-disable-next-line @typescript-eslint/naming-convention
						'5': pullsByMonth[key]['5'],
						// eslint-disable-next-line @typescript-eslint/naming-convention
						'4': pullsByMonth[key]['4'],
						// eslint-disable-next-line @typescript-eslint/naming-convention
						'3': pullsByMonth[key]['3']
					};
				})
				.sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf())
		);
	};

	const formatDateLabel = (d: string) =>
		formatDate(d, PeriodType.MonthYear, { variant: 'short' });
</script>

<div class="h-[350px] w-full">
	<Chart
		data={getMonthlyData()}
		flatData={flatten(getMonthlyData())}
		let:height
		let:padding
		let:tooltip
		let:width
		padding={{ left: 16, bottom: 48 }}
		r="key"
		rDomain={keys}
		rRange={colorKeys}
		rScale={scaleOrdinal()}
		tooltip={{ mode: 'bisect-x' }}
		x={(d) => d.data.date}
		xScale={scaleTime()}
		y={['0', '1']}
		yNice
	>
		<Svg>
			<Axis grid labelProps={{ class: 'fill-text' }} placement="left" rule />
			<Axis
				format={formatDateLabel}
				labelProps={{ class: 'fill-text' }}
				placement="bottom"
				rule
			/>
			<AreaStack let:data>
				{#each data as seriesData}
					<Area
						data={seriesData}
						y0={(d) => d[0]}
						y1={(d) => d[1]}
						fill={colorKeys.at(seriesData.key - 3)}
						fill-opacity={0.5}
					/>
					<RectClipPath
						x={0}
						y={0}
						width={tooltip.data ? tooltip.x : width}
						{height}
						spring
					>
						<Area
							data={seriesData}
							y0={(d) => d[0]}
							y1={(d) => d[1]}
							fill={colorKeys.at(seriesData.key - 3)}
						/>
					</RectClipPath>
				{/each}
			</AreaStack>

			<Highlight lines={{ class: 'stroke-text [stroke-dasharray:unset]' }} />
		</Svg>

		<Legend let:values placement="bottom">
			{#if values !== undefined}
				<div class="flex gap-4">
					{#each values as value}
						<div class="flex gap-1">
							<div
								class="h-4 w-4 rounded-full"
								style:background-color={colorKeys.at(Number.parseInt(value) - 3)}
							/>
							<div class="text-xs text-surface-content/50">{value}</div>
						</div>
					{/each}
				</div>
			{/if}
		</Legend>

		<Tooltip
			class="bg-neutral"
			header={(data) => 'Total pulls: ' + (data.data['3'] + data.data['4'] + data.data['5'])}
			let:data
			x="data"
			y={0}
		>
			<div class="flex flex-col gap-2 justify-center items-start">
				{#each keys as key}
					<div class="flex gap-1 justify-center items-center">
						<Icon
							path={mdiStar}
							class={`fill-[${colorKeys.at(Number.parseInt(key) - 3)}]`}
						/>
						<Text type="p">{key}: {data.data[key]}</Text>
					</div>
				{/each}
			</div>
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
