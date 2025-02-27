<script lang="ts">
	import Text from '$lib/components/typography/Text.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import {
		Card,
		CardContent,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card/index.js';
	import S3Service from '$lib/services/s3.js';
	import i18n from '$lib/services/i18n';

	const card = S3Service.getCharacter('Amber').gachaCard;

	type GachaCharacterWishingData = {
		name: string;
		pulls: number;
		percentage: number;
		average: number;
	};

	let currentGachaFirst: GachaCharacterWishingData = {
		name: 'Amber',
		pulls: 13994,
		percentage: 23,
		average: 25
	};

	let currentGachaSecond: GachaCharacterWishingData = {
		name: 'Amber',
		pulls: 1994,
		percentage: 12,
		average: 55
	};
	let submissions: number = 69420;
</script>

<Card class=" flex flex-col gap-5">
	<CardHeader>
		<CardTitle class="flex items-center justify-between">
			<Text type="h4">
				{$i18n.t('dashboard.widget.global_wishing.title')}
			</Text>
		</CardTitle>
	</CardHeader>
	<CardContent class="flex flex-col gap-3">
		<div class="flex flex-row justify-around">
			<div class="flex flex-col items-center">
				<img class="h-44 w-32" src={card} alt="{currentGachaFirst.name} Gacha Card" />
				<Text type="large">{currentGachaFirst.name}</Text>
				<Text type="large">
					{Math.round((currentGachaFirst.pulls / 1000 + Number.EPSILON) * 10) / 10}k
				</Text>
				<Text type="p">
					{currentGachaFirst.percentage}% {$i18n.t(
						'dashboard.widget.global_wishing.percentage'
					)} 5*
				</Text>
				<Text type="p">
					{$i18n.t('dashboard.widget.global_wishing.pity_average')}
					{currentGachaFirst.average}
				</Text>
			</div>
			<div class="flex flex-col items-center">
				<img class="h-44 w-32" src={card} alt="{currentGachaSecond.name} Gacha Card" />
				<Text type="large">{currentGachaSecond.name}</Text>
				<Text type="large">
					{Math.round((currentGachaSecond.pulls / 1000 + Number.EPSILON) * 10) / 10}k
				</Text>
				<Text type="p">
					{currentGachaSecond.percentage}% {$i18n.t(
						'dashboard.widget.global_wishing.percentage'
					)} 5*
				</Text>
				<Text type="p">
					{$i18n.t('dashboard.widget.global_wishing.pity_average')}
					{currentGachaSecond.average}
				</Text>
			</div>
		</div>
		<Text type="p" class="self-center">
			{$i18n.t('dashboard.widget.global_wishing.based_on', {
				number: submissions
			})}
		</Text>
	</CardContent>
	<CardFooter class="flex justify-end">
		<Button class="w-full">{$i18n.t('action.more')}</Button>
	</CardFooter>
</Card>
