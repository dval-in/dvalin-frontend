<script lang="ts">
	import Text from '$lib/components/typography/Text.svelte';
	import BannerOverviewCard from '$lib/components/ui/banner-overview-card/BannerOverviewCard.svelte';
	import IconButton from '$lib/components/ui/icon-button/IconButton.svelte';
	import {
		mdiAccount,
		mdiBaby,
		mdiGlobeModel,
		mdiImport,
		mdiSwordCross,
		mdiTrashCanOutline
	} from '@mdi/js';
	import PullDistributionByMonth from '$lib/components/graphs/PullDistributionByMonth.svelte';
	import { applicationState } from '$lib/store/global_state';
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
</script>

<DefaultLayout title="Wish statistics">
	<svelte:fragment slot="titlebarActions">
		<IconButton icon={mdiImport}>Import wishes</IconButton>
		<IconButton icon={mdiGlobeModel}>Global statistics</IconButton>
	</svelte:fragment>

	<div class="flex flex-wrap gap-4">
		{#if $applicationState.wishes?.CharacterEvent !== undefined}
			<BannerOverviewCard
				data={$applicationState.wishes.CharacterEvent}
				icon={mdiAccount}
				title="Character"
			/>
		{/if}
		{#if $applicationState.wishes?.WeaponEvent !== undefined}
			<BannerOverviewCard
				data={$applicationState.wishes.WeaponEvent}
				icon={mdiSwordCross}
				title="Weapon"
			/>
		{/if}
		{#if $applicationState.wishes?.Standard !== undefined}
			<BannerOverviewCard
				data={$applicationState.wishes.Standard}
				icon={mdiTrashCanOutline}
				title="Standard"
			/>
		{/if}
		{#if $applicationState.wishes?.Beginner !== undefined}
			<BannerOverviewCard
				data={$applicationState.wishes.Beginner}
				icon={mdiBaby}
				title="Beginner"
			/>
		{/if}
	</div>
	<div class="flex flex-wrap gap-4">
		{#if $applicationState.wishes}
			<div class="flex flex-1 flex-col gap-2">
				<Text type="h3">Wish distribution over time</Text>
				<div class="flex flex-1 bg-tertiary rounded-md p-4">
					<PullDistributionByMonth data={$applicationState.wishes} />
				</div>
			</div>
		{/if}
	</div>
</DefaultLayout>
