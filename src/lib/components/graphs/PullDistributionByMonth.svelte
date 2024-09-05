<script lang="ts">
	import { scaleOrdinal, scaleTime } from 'd3-scale';
	import {
		Area,
		AreaStack,
		Axis,
		Chart,
		Highlight,
		Legend,
		LinearGradient,
		RectClipPath,
		Svg,
		Tooltip
	} from 'layerchart';
	import { stack } from 'd3-shape';
	import { flatten } from 'svelte-ux/utils/array';
	import type { WishBannerKey } from '$lib/types/keys/WishBannerKey';
	import { mdiStar } from '@mdi/js';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import { applicationState } from '$lib/store/application_state';
	import { derived, type Readable } from 'svelte/store';
	import type { INamedWishes, IWish } from '$lib/types/wish';

	export let data: Readable<INamedWishes>;

	const keys = ['5', '4', '3'];
	const colorKeys = ['#5E93B2', '#7B5C90', '#FFB13F'];

	const getMonthlyData = derived([data], ([dataStore]) => {
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

		return stack().keys(keys)(
			Object.keys(pullsByMonth)
				.map((key) => {
					return {
						date: new Date(key).getTime(),
						'5': pullsByMonth[key]['5'],
						'4': pullsByMonth[key]['4'],
						'3': pullsByMonth[key]['3']
					};
				})
				.sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf())
		);
	});

	const hexToHSL = (hex: string) => {
		// Remove the # if present
		hex = hex.replace(/^#/, '');

		// Convert hex to RGB
		let r = parseInt(hex.slice(0, 2), 16) / 255;
		let g = parseInt(hex.slice(2, 4), 16) / 255;
		let b = parseInt(hex.slice(4, 6), 16) / 255;

		// Find greatest and smallest channel values
		let cmin = Math.min(r, g, b),
			cmax = Math.max(r, g, b),
			delta = cmax - cmin,
			h = 0,
			s = 0,
			l = 0;

		// Calculate hue
		if (delta === 0) h = 0;
		else if (cmax === r) h = ((g - b) / delta) % 6;
		else if (cmax === g) h = (b - r) / delta + 2;
		else h = (r - g) / delta + 4;

		h = Math.round(h * 60);
		if (h < 0) h += 360;

		// Calculate lightness
		l = (cmax + cmin) / 2;

		// Calculate saturation
		s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

		// Convert to percentages
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);

		return `${h}, ${s}%, ${l}%`;
	};

	const formatDateLabel = (d: string) =>
		new Date(d).toLocaleDateString($applicationState.settings.locale, {
			month: 'short',
			year: '2-digit'
		});
</script>

<div class="h-[350px] w-full">
	<Chart
		data={$getMonthlyData}
		flatData={flatten($getMonthlyData)}
		let:height
		let:padding
		let:tooltip
		let:width
		padding={{ left: 16, bottom: 62 }}
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
			<Axis
				tickLabelProps={{
					textAnchor: 'end',
					class: 'fill-text font-semibold'
				}}
				ticks={5}
				placement="left"
				rule
				grid={{ style: 'stroke-dasharray: 2; stroke: white' }}
			/>
			<Axis
				format={formatDateLabel}
				tickLabelProps={{
					class: 'fill-text font-semibold'
				}}
				placement="bottom"
				rule
			/>
			<AreaStack let:data>
				{@const primaryColorScale = scaleOrdinal([
					colorKeys[2],
					colorKeys[1],
					colorKeys[0]
				])}
				{@const secondaryColorScale = scaleOrdinal([
					`hsl(${hexToHSL(colorKeys[2])}, 0.2)`,
					`hsl(${hexToHSL(colorKeys[1])}, 0.2)`,
					`hsl(${hexToHSL(colorKeys[0])}, 0.2)`
				])}
				{#each data as seriesData, index}
					{@const primaryColor = primaryColorScale(String(index))}
					{@const secondaryColor = secondaryColorScale(String(index))}
					<LinearGradient stops={[primaryColor, secondaryColor]} vertical let:url>
						<Area
							data={seriesData}
							y0={(d) => d[0]}
							y1={(d) => d[1]}
							fill={url}
							fill-opacity={0.5}
							line={{ stroke: primaryColor, 'stroke-width': 2 }}
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
								fill={url}
								line={{ stroke: primaryColor, 'stroke-width': 2 }}
							/>
						</RectClipPath>
					</LinearGradient>
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
			{new Date(data.data.date).toLocaleDateString($applicationState.settings.locale, {
				month: 'long',
				year: 'numeric'
			})}
		</Tooltip>
	</Chart>
</div>
