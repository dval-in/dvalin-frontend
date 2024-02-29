<script lang="ts">
	import { applicationState } from '$lib/store/global_state';
	import Text from '$lib/components/typography/Text.svelte';
	import BannerHistoryTable from '$lib/components/tables/BannerHistoryTable.svelte';
	import RaretyDistributionByBanner from '$lib/components/graphs/RaretyDistributionByBanner.svelte';
	import type { IWish } from '$lib/types/wish';
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import type { WishBannerKey } from '$lib/types/keys/WishBannerKey';

	/** @type {import('../../../../.svelte-kit/types/src/routes').PageData} */
	export let data: { type: WishBannerKey };

	let bannerHistory: IWish[] = [];

	if ($applicationState.wishes !== undefined) {
		const wishes: IWish[] | undefined = $applicationState.wishes[data.type];

		bannerHistory = wishes !== undefined ? wishes : [];
	}
</script>

<DefaultLayout title={data.type.at(0)?.toUpperCase() + data.type.slice(1) + ' banner history'}>
	<div class="flex flex-1 flex-row flex-wrap gap-4">
		<div class="flex flex-1 flex-col gap-4">
			<div class="flex flex-col gap-2">
				<Text type="h3">Rarity distribution</Text>
				<div class="flex bg-tertiary rounded-md p-4">
					<RaretyDistributionByBanner wishData={bannerHistory} />
				</div>
			</div>
		</div>
		<div class="flex flex-1 flex-col bg-tertiary rounded-md p-4">
			<BannerHistoryTable data={bannerHistory} />
		</div>
	</div>
</DefaultLayout>
