<script lang="ts">
	import { applicationState } from '$lib/store/global_state';
	import Text from '$lib/components/typography/Text.svelte';
	import BannerHistoryTable from '$lib/components/tables/BannerHistoryTable.svelte';
	import RaretyDistributionByBanner from '$lib/components/graphs/RaretyDistributionByBanner.svelte';
	import type { IMappedWish, IWish } from '$lib/types/wish';
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import type { WishBannerKey } from '$lib/types/keys/WishBannerKey';
	import type { CharacterIndex } from '$lib/types/index/character';
	import type { WeaponIndex } from '$lib/types/index/weapon';
	import { isCharacterKey } from '$lib/types/keys/CharacterKey';

	/** @type {import('../../../../.svelte-kit/types/src/routes').PageData} */
	export let data: {
		pageType: WishBannerKey;
		index: { Character: CharacterIndex; Weapon: WeaponIndex };
	};
	let wishData: IMappedWish[] = [];
	const wishes: IWish[] | undefined = $applicationState.wishes?.[data.pageType];

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
	}
</script>

<DefaultLayout
	title={data.pageType.at(0)?.toUpperCase() + data.pageType.slice(1) + ' banner history'}
>
	<div class="flex flex-1 flex-row flex-wrap gap-4">
		<div class="flex flex-1 flex-col gap-4">
			<div class="flex flex-col gap-2">
				<Text type="h3">Rarity distribution</Text>
				<div class="flex bg-tertiary rounded-md p-4">
					<RaretyDistributionByBanner {wishData} />
				</div>
			</div>
		</div>
		<div class="flex flex-1 flex-col bg-tertiary rounded-md p-4">
			<BannerHistoryTable data={wishData} />
		</div>
	</div>
</DefaultLayout>
