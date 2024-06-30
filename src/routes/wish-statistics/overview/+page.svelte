<script lang="ts">
	import Text from '$lib/components/typography/Text.svelte';
	import BannerOverviewCard from '$lib/components/ui/banner-overview-card/BannerOverviewCard.svelte';
	import IconButton from '$lib/components/ui/icon-button/IconButton.svelte';
	import {
		mdiAccount,
		mdiBaby,
		mdiBook,
		mdiFileCloud,
		mdiGlobeModel,
		mdiImport,
		mdiLogin,
		mdiSwordCross,
		mdiTrashCanOutline
	} from '@mdi/js';
	import PullDistributionByMonth from '$lib/components/graphs/PullDistributionByMonth.svelte';
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import type { IMappedWishes, IWish, IWishes } from '$lib/types/wish';
	import { isWishBannerKey } from '$lib/types/keys/WishBannerKey';
	import { isCharacterKey } from '$lib/types/keys/CharacterKey';
	import { Card } from '$lib/components/ui/card';
	import { CardContent, CardHeader } from '$lib/components/ui/card/index.js';
	import { dataIndexStore } from '$lib/store/index_store';
	import i18n from '$lib/services/i18n';
	import { userProfile } from '$lib/store/user_profile';
	import { applicationState } from '$lib/store/application_state';
	import { get } from 'svelte/store';

	let wishData: IMappedWishes = {};
	const wishes: IWishes | undefined = get(userProfile).wishes;
	if (wishes !== undefined) {
		Object.keys(wishes).forEach((key: string) => {
			if (isWishBannerKey(key)) {
				wishData[key] = wishes[key]?.map((wish: IWish) => {
					const index = isCharacterKey(wish.key)
						? $dataIndexStore.character[wish.key]
						: $dataIndexStore.weapon[wish.key];

					return {
						...wish,
						name: index !== undefined ? index.name : key,
						rarity: index !== undefined ? index.rarity : 0
					};
				});
			}
		});
		console.log(wishData);
	}
</script>

<DefaultLayout title={$i18n.t('wish.overview.title')} showRequirements={wishes === undefined}>
	<svelte:fragment slot="titlebarActions">
		<IconButton icon={mdiImport} href="/wish-statistics/import">
			{$i18n.t('wish.overview.import_wish_button')}
		</IconButton>
		<IconButton icon={mdiGlobeModel}>
			{$i18n.t('wish.overview.global_statistic_button')}
		</IconButton>
	</svelte:fragment>

	<svelte:fragment slot="requirements">
		{#if !$applicationState.isAuthenticated}
			<IconButton icon={mdiLogin} href="/login">
				{'Login to retrieve your wishes'}
			</IconButton>
		{:else}
			<IconButton icon={mdiImport} href="/wish-statistics/import">
				{$i18n.t('wish.overview.import_wish_button')}
			</IconButton>
		{/if}
		<IconButton icon={mdiFileCloud} href="/settings/import">
			{'Import data from external sites'}
		</IconButton>
	</svelte:fragment>

	<div class="flex flex-wrap gap-4">
		{#if wishData?.CharacterEvent !== undefined}
			<BannerOverviewCard
				data={wishData.CharacterEvent}
				icon={mdiAccount}
				key={'CharacterEvent'}
			/>
		{/if}
		{#if wishData?.WeaponEvent !== undefined}
			<BannerOverviewCard
				data={wishData.WeaponEvent}
				icon={mdiSwordCross}
				key={'WeaponEvent'}
			/>
		{/if}
		{#if wishData?.Standard !== undefined}
			<BannerOverviewCard
				data={wishData.Standard}
				icon={mdiTrashCanOutline}
				key={'Standard'}
			/>
		{/if}
		{#if wishData?.Chronicled !== undefined}
			<BannerOverviewCard data={wishData.Chronicled} icon={mdiBook} key={'Chronicled'} />
		{/if}
		{#if wishData?.Beginner !== undefined}
			<BannerOverviewCard data={wishData.Beginner} icon={mdiBaby} key={'Beginner'} />
		{/if}
	</div>
	{#if wishes}
		<div class="flex flex-wrap gap-4">
			<Card class="flex flex-1 flex-col gap-2">
				<CardHeader>
					<Text type="h3">{$i18n.t('chart.wish_distribution_time.title')}</Text>
				</CardHeader>
				<CardContent>
					<PullDistributionByMonth data={wishData} />
				</CardContent>
			</Card>
		</div>
	{/if}
</DefaultLayout>
