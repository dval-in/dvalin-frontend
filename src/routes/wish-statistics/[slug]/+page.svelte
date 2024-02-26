<script lang="ts">
	import { applicationState } from '$lib/store/global_state';
	import Text from '$lib/components/typography/Text.svelte';
	import type { Banner, Wish } from '$lib/structs/wish';
	import BannerHistoryTable from '$lib/components/tables/BannerHistoryTable.svelte';
	import RaretyDistributionByBanner from '$lib/components/graphs/RaretyDistributionByBanner.svelte';

	/** @type {import('../../../../.svelte-kit/types/src/routes').PageData} */
	export let data: { type: Banner };

	const bannerHistory: Wish[] = $applicationState.wishes.bannerHistory[data.type];
</script>

<div class="flex flex-1 flex-col gap-6">
	<Text type="h1">{data.type.at(0)?.toUpperCase() + data.type.slice(1) + ' banner history'}</Text>
	<div class="flex flex-wrap gap-4">
		<div class="flex flex-1 flex-col gap-4">
			<div class="flex flex-col gap-2">
				<Text type="h3">Rarity distribution</Text>
				<div class="flex bg-tertiary rounded-md p-4">
					<RaretyDistributionByBanner wishData={bannerHistory} />
				</div>
			</div>
			<div class="flex flex-col gap-2">
				<Text type="h3">Rarity distribution</Text>
				<div class="flex bg-tertiary rounded-md p-4">
					<RaretyDistributionByBanner wishData={bannerHistory} />
				</div>
			</div>
		</div>
		<div class="flex flex-1 bg-tertiary rounded-md p-4">
			<BannerHistoryTable data={bannerHistory} />
		</div>
	</div>
</div>
