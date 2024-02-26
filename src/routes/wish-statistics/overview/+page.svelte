<script lang="ts">
	import Text from '$lib/components/typography/Text.svelte';
	import BannerOverviewCard from './banner-overview-card/BannerOverviewCard.svelte';
	import IconButton from '$lib/components/ui/icon-button/IconButton.svelte';
	import { mdiAccount, mdiGlobeModel, mdiImport, mdiSwordCross, mdiTrashCanOutline } from '@mdi/js';
	import PullDistributionByMonth from '$lib/components/graphs/PullDistributionByMonth.svelte';
	import { applicationState } from '$lib/store/global_state';
</script>

<div class="flex flex-col gap-6">
	<div class="flex justify-between">
		<Text type="h1">Wish statistics</Text>
		<div class="flex flex-wrap gap-2 justify-end">
			<IconButton icon={mdiImport}>Import wishes</IconButton>
			<IconButton icon={mdiGlobeModel}>Global statistics</IconButton>
		</div>
	</div>
	<div class="flex flex-wrap gap-4">
		<BannerOverviewCard
			data={$applicationState.wishes.bannerHistory.character}
			icon={mdiAccount}
			title="Character"
		/>
		<BannerOverviewCard
			data={$applicationState.wishes.bannerHistory.weapon}
			icon={mdiSwordCross}
			title="Weapon"
		/>
		<BannerOverviewCard
			data={$applicationState.wishes.bannerHistory.standard}
			icon={mdiTrashCanOutline}
			title="Standard"
		/>
	</div>
	<div class="flex flex-wrap gap-4">
		<div class="flex flex-1 flex-col gap-2">
			<Text type="h3">Wish distribution over time</Text>
			<div class="flex flex-1 bg-tertiary rounded-md p-4">
				<PullDistributionByMonth data={$applicationState.wishes} />
			</div>
		</div>
	</div>
</div>
