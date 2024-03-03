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
	import type { CharacterIndex } from '$lib/types/index/character';
	import type { IMappedWishes, IWish, IWishes } from '$lib/types/wish';
	import type { WeaponIndex } from '$lib/types/index/weapon';
	import { isWishBannerKey } from '$lib/types/keys/WishBannerKey';
	import { isCharacterKey } from '$lib/types/keys/CharacterKey';

	/** @type {import('../../../../.svelte-kit/types/src/routes').PageData} */
	export let data: { Character: CharacterIndex; Weapon: WeaponIndex };
	let wishData: IMappedWishes = {};
	const wishes: IWishes | undefined = $applicationState.wishes;

	if (wishes !== undefined) {
		Object.keys(wishes).forEach((key: string) => {
			if (isWishBannerKey(key)) {
				wishData[key] = wishes[key]?.map((wish: IWish) => {
					const index = isCharacterKey(wish.key)
						? data['Character'][wish.key]
						: data['Weapon'][wish.key];

					return {
						...wish,
						name: index.name,
						rarity: index.rarity
					};
				});
			}
		});
	}
</script>

<DefaultLayout title="Wish statistics">
	<svelte:fragment slot="titlebarActions">
		<IconButton icon={mdiImport}>Import wishes</IconButton>
		<IconButton icon={mdiGlobeModel}>Global statistics</IconButton>
	</svelte:fragment>

	<div class="flex flex-wrap gap-4">
		{#if wishData?.CharacterEvent !== undefined}
			<BannerOverviewCard data={wishData.CharacterEvent} icon={mdiAccount} title="Character" />
		{/if}
		{#if wishData?.WeaponEvent !== undefined}
			<BannerOverviewCard data={wishData.WeaponEvent} icon={mdiSwordCross} title="Weapon" />
		{/if}
		{#if wishData?.Standard !== undefined}
			<BannerOverviewCard data={wishData.Standard} icon={mdiTrashCanOutline} title="Standard" />
		{/if}
		{#if wishData?.Beginner !== undefined}
			<BannerOverviewCard data={wishData.Beginner} icon={mdiBaby} title="Beginner" />
		{/if}
	</div>
	<div class="flex flex-wrap gap-4">
		{#if $applicationState.wishes}
			<div class="flex flex-1 flex-col gap-2">
				<Text type="h3">Wish distribution over time</Text>
				<div class="flex flex-1 bg-tertiary rounded-md p-4">
					<PullDistributionByMonth data={wishData} />
				</div>
			</div>
		{/if}
	</div>
</DefaultLayout>
