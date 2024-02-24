<script lang="ts">
	import { applicationState } from '$lib/store/global_state';
	import Text from '$lib/components/typography/Text.svelte';
	import { Root as CardRoot, Content as CardContent } from '$lib/components/ui/card';
	import type { Banner, Wish } from '$lib/structs/wish';
	import BannerHistoryTable from '$lib/components/tables/BannerHistoryTable.svelte';

	/** @type {import('./$types').PageData} */
	export let data: { type: Banner };

	const bannerHistory: Wish[] = $applicationState.wishes.bannerHistory[data.type];
</script>

<div class="flex flex-1 flex-col gap-6">
	<Text type="h1">{data.type + ' banner history'}</Text>
	<div class="flex flex-wrap">
		<div class="flex flex-1">
			<div>{bannerHistory.length}</div>
			<CardRoot>
				<CardContent>
					<!--<RaretyDistributionByBanner />-->
				</CardContent>
			</CardRoot>
		</div>
		<div class="flex flex-1 flex-col">
			<CardRoot>
				<CardContent>
					<BannerHistoryTable data={bannerHistory} />
				</CardContent>
			</CardRoot>
		</div>
	</div>
</div>
