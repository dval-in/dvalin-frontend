<script lang="ts">
	import { mdiArrowLeft, mdiStar } from '@mdi/js';
	import S3Service from '$lib/services/s3';
	import Text from '$lib/components/typography/Text.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import { goto } from '$app/navigation';
	import type { PageData } from '../../../../.svelte-kit/types/src/routes/weapons/[slug]/$types';
	import { page } from '$app/stores';
	import UserWeaponCard from '$lib/components/ui/card/UserWeaponCard.svelte';
	import { userProfile } from '$lib/store/user_profile';
	import { onMount } from 'svelte';
	import type { IWeapon } from '$lib/types/weapon';
	import WeaponTabs from '$lib/components/ui/character-tabs/weapon-tabs.svelte';
	import i18n from '$lib/services/i18n';

	/** @type {import('../../../../.svelte-kit/types/src/routes/characters/[slug]').PageData} */
	export let data: PageData;

	$: fetchWeaponData = data.backend.data.fetchWeaponData(data.weaponKey);
	$: slug = $page.params.slug;

	let ownedWeapon: IWeapon[];

	$: card = S3Service.getWeapon(data.weaponKey).icon;

	const goBack = () => {
		goto('/weapons');
	};

	onMount(() => {
		slug = $page.params.slug;
	});

	$: if (slug && $userProfile && $userProfile.weapons) {
		ownedWeapon = $userProfile.weapons.filter((weapon) => weapon.key === slug);
	}
</script>

<DefaultLayout isLoading={$fetchWeaponData.status === 'pending'}>
	{#if $fetchWeaponData.status === 'success'}
		<section
			class="grid grid-cols-1 gap-4 box-content lg:h-max lg:min-h-[40vh] lg:grid-cols-[14rem_1fr] lg:grid-flow-dense lg:grid-rows-[auto_minmax(0,1fr)]"
		>
			<div class="flex items-center gap-2 lg:col-start-2">
				<Button class="" on:click={goBack} variant="ghost" size="icon">
					<Icon class="fill-primary" path={mdiArrowLeft} />
				</Button>
				<Text class="text-primary" type="h1">{$fetchWeaponData.data.name}</Text>
			</div>

			<Card class="p-0 sm:p-0 relative lg:w-full lg:row-span-full lg:h-full">
				<img
					class="aspect-auto h-full w-full rounded-lg object-contain object-center"
					src={card}
					alt="{$fetchWeaponData.data.name} Card"
				/>
				<div class="flex w-full justify-center absolute bottom-3 left-0">
					{#each { length: $fetchWeaponData.data.rarity } as _}
						<Icon
							path={mdiStar}
							class={$fetchWeaponData.data.rarity === 5
								? 'fill-fivestar'
								: $fetchWeaponData.data.rarity === 4
									? 'fill-fourstar'
									: 'fill-blue-500'}
						/>
					{/each}
				</div>
			</Card>

			<div class="flex flex-col gap-2 lg:row-start-2 lg:h-full">
				<span class="font-bold">
					{$fetchWeaponData.data.type}
				</span>

				<Text class="w-full lg:row-start-4" type="p">
					{$fetchWeaponData.data.description}
				</Text>
				<WeaponTabs weaponData={$fetchWeaponData.data} />
			</div>
		</section>
		<Text type="h2">{$i18n.t('weapons.title.inventory')}</Text>
		<div
			class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4"
		>
			{#each ownedWeapon as weapon}
				<!-- Need to decide on different img depending on ascencion -->
				<UserWeaponCard
					name={$fetchWeaponData.data.name}
					img={card}
					type={$fetchWeaponData.data.type}
					level={weapon.level}
					ascencion={weapon.ascension}
					refinement={weapon.refinement}
					rarity={$fetchWeaponData.data.rarity}
					location={weapon.characterKey ?? 'Xilonen'}
				/>
			{/each}
		</div>
	{/if}
</DefaultLayout>
