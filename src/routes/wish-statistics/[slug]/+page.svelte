<script lang="ts">
	import Text from '$lib/components/typography/Text.svelte';
	import RaretyDistributionByBanner from '$lib/components/graphs/RaretyDistributionByBanner.svelte';
	import type { IWish } from '$lib/types/wish';
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import BannerHistoryTable from '$lib/components/tables/banner-history-table/BannerHistoryTable.svelte';
	import { Card } from '$lib/components/ui/card';
	import { CardContent, CardHeader } from '$lib/components/ui/card/index.js';
	import InfoCell from '$lib/components/ui/info-cell/InfoCell.svelte';
	import { mdiMoonWaningCrescent } from '@mdi/js';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import i18n from '$lib/services/i18n';
	import { userProfile } from '$lib/store/user_profile';
	import type { PageData } from '../../../../.svelte-kit/types/src/routes/wish-statistics/[slug]/$types';
	import { dataIndex } from '$lib/store/index_store';
	import { derived } from 'svelte/store';

	export let data: PageData;

	const wishData = derived([userProfile], ([userProfileStore]) => {
		const wishes: IWish[] | undefined = userProfileStore.wishes?.[data.pageType];

		if (wishes !== undefined) {
			return wishes.map((wish: IWish) => {
				const index = $dataIndex.character[wish.key]
					? $dataIndex.character[wish.key]
					: $dataIndex.weapon[wish.key];

				return {
					...wish,
					name: index !== undefined ? index.name : wish.key,
					rarity: index !== undefined ? index.rarity : 0
				};
			});
		} else {
			return [];
		}
	});

	const fiveStarPity = derived([wishData], ([wishDataStore]) => {
		return wishDataStore.findIndex((wish) => wish.rarity === 5) === -1
			? wishDataStore.length
			: wishDataStore.findIndex((wish) => wish.rarity === 5);
	});

	const fourStarPity = derived([wishData], ([wishDataStore]) => {
		return wishDataStore.findIndex((wish) => wish.rarity === 4) === -1
			? wishDataStore.length
			: wishDataStore.findIndex((wish) => wish.rarity === 4);
	});
</script>

<DefaultLayout title={$i18n.t('wish.detailed.title.' + data.pageType)}>
	<div class="flex flex-1 flex-col gap-4 lg:flex-row lg:flex-wrap">
		<div class="flex min-w-80 flex-col gap-4">
			<div class="flex flex-row gap-2">
				<InfoCell
					class="bg-tertiary"
					title={$i18n.t('wish.detailed.info.total_pull_count')}
				>
					<Text type="h4">{$wishData.length}</Text>

					<svelte:fragment slot="tooltip">
						<Icon path={mdiMoonWaningCrescent} />
						<Text type="h4">{$wishData.length * 160}</Text>
					</svelte:fragment>
				</InfoCell>
				<InfoCell class="bg-tertiary" title={$i18n.t('wish.detailed.info.pity')}>
					<Text type="h4" class="text-fivestar">{$fiveStarPity}</Text>
					<Text type="h4" class="text-fourstar">{$fourStarPity}</Text>
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
