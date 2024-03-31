<script lang="ts">
	import { applicationState } from '$lib/store/global_state';
	import Text from '$lib/components/typography/Text.svelte';
	import RaretyDistributionByBanner from '$lib/components/graphs/RaretyDistributionByBanner.svelte';
	import type { IMappedWish, IWish } from '$lib/types/wish';
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import type { WishBannerKey } from '$lib/types/keys/WishBannerKey';
	import type { CharacterIndex } from '$lib/types/index/character';
	import type { WeaponIndex } from '$lib/types/index/weapon';
	import { isCharacterKey } from '$lib/types/keys/CharacterKey';
	import BannerHistoryTable from '$lib/components/tables/banner-history-table/BannerHistoryTable.svelte';
	import { Card } from '$lib/components/ui/card';
	import { CardContent, CardHeader } from '$lib/components/ui/card/index.js';
	import InfoCell from '$lib/components/ui/info-cell/InfoCell.svelte';
	import { mdiMoonWaningCrescent } from '@mdi/js';
	import Icon from '$lib/components/ui/icon/icon.svelte';

	/** @type {import('../../../../.svelte-kit/types/src/routes').PageData} */
	export let data: {
		pageType: WishBannerKey;
		index: { Character: CharacterIndex; Weapon: WeaponIndex };
	};
	let wishData: IMappedWish[] = [];
	const wishes: IWish[] | undefined = $applicationState.wishes?.[data.pageType];
	let fiveStars = [];
	let fourStars = [];
	let threeStars = [];

	if (wishes !== undefined) {
		wishData = wishes.map((wish: IWish) => {
			const index = isCharacterKey(wish.key)
				? data.index['Character'][wish.key]
				: data.index['Weapon'][wish.key];

			return {
				...wish,
				name: index.name,
				rarity: index.rarity
			};
		});

		fiveStars = wishData
			.filter((wish: IMappedWish) => wish.rarity === 5)
			.sort((a, b) => b.number - a.number);

		fourStars = wishData.filter((wish: IMappedWish) => wish.rarity === 4);

		threeStars = wishData.filter((wish: IMappedWish) => wish.rarity === 3);
	}
</script>

<DefaultLayout
	title={data.pageType.at(0)?.toUpperCase() + data.pageType.slice(1) + ' banner history'}
>
	<div class="flex flex-1 flex-col sm:flex-row sm:flex-wrap gap-4">
		<div class="flex flex-col gap-4">
			<div class="flex flex-row gap-2">
				<InfoCell class="bg-tertiary" title="Total pulls">
					<Text type="h4">{wishData.length}</Text>

					<svelte:fragment slot="tooltip">
						<Icon path={mdiMoonWaningCrescent} />
						<Text type="h4">{wishData.length * 160}</Text>
					</svelte:fragment>
				</InfoCell>
				<InfoCell class="bg-tertiary" title="% of total pulls">
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
				<InfoCell class="bg-tertiary" title="Pity">
					<Text type="h4">{0}</Text>
					<Text type="h4">{0}</Text>
				</InfoCell>
			</div>

			<Card class="flex flex-col">
				<CardHeader>
					<Text type="h3">Rarity distribution</Text>
				</CardHeader>
				<CardContent>
					<RaretyDistributionByBanner {wishData} />
				</CardContent>
			</Card>
		</div>
		<Card class="flex flex-1 flex-row overflow-x-auto">
			<BannerHistoryTable data={wishData} />
		</Card>
	</div>
</DefaultLayout>
