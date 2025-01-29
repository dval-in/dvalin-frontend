<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import Text from '$lib/components/typography/Text.svelte';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import PullChip from '$lib/components/ui/pull-chip/PullChip.svelte';
	import type { IWish } from '$lib/types/wish.js';
	import { Card, CardHeader } from '$lib/components/ui/card';
	import { CardContent } from '$lib/components/ui/card/index.js';
	import InfoCell from '$lib/components/ui/info-cell/InfoCell.svelte';
	import { mdiCloseCircle } from '@mdi/js';
	import { Alert, AlertDescription, AlertTitle } from '$lib/components/ui/alert';
	import i18n from '$lib/services/i18n';
	import type { WishBannerKey } from '$lib/types/keys/WishBannerKey';
	import PrimogemIcon from '$lib/assets/icons/primogem.webp';

	export let icon: string;
	export let key: WishBannerKey;
	export let data: (IWish & { name: string })[];
	data.sort((a, b) => b.order - a.order);
	const MAX_CHARACTER_LENGTH = 200;
	const PICTURE_AND_PITY_LENGTH = 6;
	const fiveStars = data.filter((wish) => wish.rarity === 5);

	const fourStars = data.filter((wish) => wish.rarity === 4);

	const threeStars = data.filter((wish) => wish.rarity === 3);

	const fiveStarToDisplay = () => {
		let charLength = 0;
		let char = [];
		for (let i = 0; i < fiveStars.length; i++) {
			if (
				charLength + fiveStars[i].name.length + PICTURE_AND_PITY_LENGTH <
				MAX_CHARACTER_LENGTH
			) {
				char.push(fiveStars[i]);
				charLength += fiveStars[i].name.length + PICTURE_AND_PITY_LENGTH;
			} else {
				break;
			}
		}
		return char;
	};
	const fiveStarPity =
		data.findIndex((wish) => wish.rarity === 5) === -1
			? data.length
			: data.findIndex((wish) => wish.rarity === 5);
	const fourStarPity =
		data.findIndex((wish) => wish.rarity === 4) === -1
			? data.length
			: data.findIndex((wish) => wish.rarity === 4);
</script>

<Card class="bg-tertiary flex flex-1 flex-col gap-3 rounded-md">
	<CardHeader class="flex flex-row flex-wrap justify-between">
		<div class="flex items-center gap-1">
			<Icon path={icon} />
			<Text type="h3">{$i18n.t(`wish.overview.card.title.${key}`)}</Text>
		</div>
		<Button href={'/wish-statistics/' + key}>{$i18n.t('action.more')}</Button>
	</CardHeader>
	<CardContent class="flex flex-col gap-2">
		<div class="flex flex-row gap-2">
			<InfoCell class="bg-neutral" title={$i18n.t('wish.overview.info.total_pull_count')}>
				<Text type="h4">{data.length}</Text>

				<svelte:fragment slot="tooltip">
					<img src={PrimogemIcon} class="size-7" alt="primogem icon" />
					<Text type="h4">{data.length * 160}</Text>
				</svelte:fragment>
			</InfoCell>
			<InfoCell
				class="bg-neutral"
				title={$i18n.t('wish.overview.info.total_pull_percentage')}
			>
				{#if fiveStars.length > 0}
					<Text class="text-fivestar" type="h4">
						{((fiveStars.length / data.length) * 100).toFixed(1)}
					</Text>
				{/if}
				{#if fourStars.length > 0}
					<Text class="text-fourstar" type="h4">
						{((fourStars.length / data.length) * 100).toFixed(1)}
					</Text>
				{/if}
				{#if threeStars.length > 0}
					<Text class="text-threestar" type="h4">
						{((threeStars.length / data.length) * 100).toFixed(1)}
					</Text>
				{/if}
			</InfoCell>
			<InfoCell class="bg-neutral" title={$i18n.t('wish.overview.info.pity')}>
				<Text class="text-fivestar" type="h4">{fiveStarPity}</Text>
				<Text class="text-fourstar" type="h4">{fourStarPity}</Text>
			</InfoCell>
		</div>
		<div class="flex flex-col gap-2">
			{#if fiveStarToDisplay().length > 0}
				<Text type="h4">{$i18n.t('wish.overview.card.latest_pulls.title')}</Text>
				<div class="flex flex-wrap gap-2">
					{#each fiveStarToDisplay() as pull}
						<PullChip
							name={pull.name}
							key={pull.key}
							counter={pull.pity}
							wonFiftyFifty={pull.wonFiftyFifty}
						/>
					{/each}
				</div>
			{:else}
				<Alert class="gap-6">
					<Icon path={mdiCloseCircle} />
					<AlertTitle>
						{$i18n.t('wish.overview.card.latest_pulls.no_pulls.title')}
					</AlertTitle>
					<AlertDescription>
						{$i18n.t('wish.overview.card.latest_pulls.no_pulls.description')}
					</AlertDescription>
				</Alert>
			{/if}
		</div>
	</CardContent>
</Card>
