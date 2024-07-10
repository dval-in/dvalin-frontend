<script lang="ts">
	import Text from '$lib/components/typography/Text.svelte';
	import RaretyDistributionByBanner from '$lib/components/graphs/RaretyDistributionByBanner.svelte';
	import type { IMappedWish, IWish } from '$lib/types/wish';
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import { isCharacterKey } from '$lib/types/keys/CharacterKey';
	import BannerHistoryTable from '$lib/components/tables/banner-history-table/BannerHistoryTable.svelte';
	import { Card } from '$lib/components/ui/card';
	import { CardContent, CardHeader } from '$lib/components/ui/card/index.js';
	import InfoCell from '$lib/components/ui/info-cell/InfoCell.svelte';
	import { mdiMoonWaningCrescent } from '@mdi/js';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import { dataIndexStore } from '$lib/store/index_store';
	import i18n from '$lib/services/i18n';
	import { userProfile } from '$lib/store/user_profile';
	import type { PageData } from '../../../../.svelte-kit/types/src/routes/wish-statistics/[slug]/$types';

	/** @type {import('../../../../.svelte-kit/types/src/routes/wish-statistics/[slug]/$types').PageData} */
	export let data: PageData;
	let wishData: IMappedWish[] = [];
	const wishes: IWish[] | undefined = $userProfile.wishes?.[data.pageType];
	let fiveStars = [];
	let fourStars = [];
	let threeStars = [];
	let fiveStarPity = 0;
	let fourStarPity = 0;

	if (wishes !== undefined) {
		wishData = wishes.map((wish: IWish) => {
			const index = isCharacterKey(wish.key)
				? $dataIndexStore.character[wish.key]
				: $dataIndexStore.weapon[wish.key];

			return {
				...wish,
				name: index !== undefined ? index.name : wish.key,
				rarity: index !== undefined ? index.rarity : 0
			};
		});

		fiveStars = wishData
			.filter((wish: IMappedWish) => wish.rarity === 5)
			.sort((a, b) => b.number - a.number);

		fourStars = wishData.filter((wish: IMappedWish) => wish.rarity === 4);
		threeStars = wishData.filter((wish: IMappedWish) => wish.rarity === 3);
		fiveStarPity =
			wishData.findIndex((wish) => wish.rarity === 5) === -1
				? wishData.length
				: wishData.findIndex((wish) => wish.rarity === 5);
		fourStarPity =
			wishData.findIndex((wish) => wish.rarity === 4) === -1
				? wishData.length
				: wishData.findIndex((wish) => wish.rarity === 4);
	}
</script>

<DefaultLayout title={$i18n.t('wish.detailed.title.' + data.pageType)}>
	<div class="flex flex-1 flex-col sm:flex-row sm:flex-wrap gap-4">
		<div class="flex flex-col gap-4">
			<div class="flex flex-row gap-2">
				<InfoCell
					class="bg-tertiary"
					title={$i18n.t('wish.detailed.info.total_pull_count')}
				>
					<Text type="h4">{wishData.length}</Text>

					<svelte:fragment slot="tooltip">
						<Icon path={mdiMoonWaningCrescent} />
						<Text type="h4">{wishData.length * 160}</Text>
					</svelte:fragment>
				</InfoCell>
				<InfoCell
					class="bg-tertiary"
					title={$i18n.t('wish.detailed.info.total_pull_percentage')}
				>
					{#if fiveStars.length > 0}
						<Text class="text-fivestar" type="h4">
							{((fiveStars.length / wishData.length) * 100).toFixed(1)}
						</Text>
					{/if}
					{#if fourStars.length > 0}
						<Text class="text-fourstar" type="h4">
							{((fourStars.length / wishData.length) * 100).toFixed(1)}
						</Text>
					{/if}
					{#if threeStars.length > 0}
						<Text class="text-threestar" type="h4">
							{((threeStars.length / wishData.length) * 100).toFixed(1)}
						</Text>
					{/if}
				</InfoCell>
				<InfoCell class="bg-tertiary" title={$i18n.t('wish.detailed.info.pity')}>
					<Text type="h4">{fiveStarPity}</Text>
					<Text type="h4">{fourStarPity}</Text>
				</InfoCell>
			</div>

			<Card class="flex flex-col">
				<CardHeader>
					<Text type="h3">{$i18n.t('chart.rarity_distribution.title')}</Text>
				</CardHeader>
				<CardContent>
					<RaretyDistributionByBanner {wishData} />
				</CardContent>
			</Card>
		</div>
		<Card class="flex flex-1 flex-col overflow-x-auto">
			<BannerHistoryTable data={wishData} />
		</Card>
	</div>
</DefaultLayout>
