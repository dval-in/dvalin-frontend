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
		mdiInfinity,
		mdiLogin,
		mdiSwordCross
	} from '@mdi/js';
	import PullDistributionByMonth from '$lib/components/graphs/PullDistributionByMonth.svelte';
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import type { IWish, IWishes } from '$lib/types/wish';
	import { isWishBannerKey } from '$lib/types/keys/WishBannerKey';
	import { isCharacterKey } from '$lib/types/keys/CharacterKey';
	import { Card } from '$lib/components/ui/card';
	import { CardContent, CardHeader } from '$lib/components/ui/card/index.js';
	import { dataIndexStore } from '$lib/store/index_store';
	import i18n from '$lib/services/i18n';
	import { userProfile } from '$lib/store/user_profile';
	import { applicationState } from '$lib/store/application_state';
	import { get } from 'svelte/store';

	interface IProcessedWish extends IWish {
		name: string;
	}

	interface IProcessedWishes {
		[key: string]: IProcessedWish[] | undefined;
	}

	let wishData: IProcessedWishes = {};

	const wishes: IWishes | undefined = get(userProfile).wishes;

	if (wishes !== undefined) {
		Object.keys(wishes).forEach((key: string) => {
			if (isWishBannerKey(key)) {
				wishData[key] = wishes[key]?.map((wish: IWish): IProcessedWish => {
					const index = isCharacterKey(wish.key)
						? $dataIndexStore.character[wish.key]
						: $dataIndexStore.weapon[wish.key];

					return {
						...wish,
						name: index !== undefined ? index.name : key
					};
				});
			}
		});
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
		{#if wishData?.CharacterEvent && wishData.CharacterEvent.length > 0}
			<BannerOverviewCard
				data={wishData.CharacterEvent}
				icon={mdiAccount}
				key={'CharacterEvent'}
			/>
		{/if}
		{#if wishData?.WeaponEvent && wishData.WeaponEvent.length > 0}
			<BannerOverviewCard
				data={wishData.WeaponEvent}
				icon={mdiSwordCross}
				key={'WeaponEvent'}
			/>
		{/if}
		{#if wishData?.Standard && wishData.Standard.length > 0}
			<BannerOverviewCard data={wishData.Standard} icon={mdiInfinity} key={'Standard'} />
		{/if}
		{#if wishData?.Chronicled && wishData.Chronicled.length > 0}
			<BannerOverviewCard data={wishData.Chronicled} icon={mdiBook} key={'Chronicled'} />
		{/if}
		{#if wishData?.Beginner && wishData.Beginner.length > 0}
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
