<script lang="ts">
	import { applicationState } from '$lib/store/application_state';
	import '../app.pcss';
	import Sidebar from '$lib/components/navigator/Sidebar.svelte';
	import { derived, get } from 'svelte/store';
	import { Toaster } from 'svelte-sonner';
	import { pwaInfo } from 'virtual:pwa-info';
	import { pwaAssetsHead } from 'virtual:pwa-assets/head';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { userProfile } from '$lib/store/user_profile';
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import { dataIndexStore } from '$lib/store/index_store';
	import type { LayoutData } from '../../.svelte-kit/types/src/routes/$types';

	/** @type {import('../../.svelte-kit/types/src/routes/$types').LayoutData} */
	export let data: LayoutData;

	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.href : '';

	const fetchCharacterDataIndex = data.backend.data.fetchCharacterDataIndex();
	const fetchWeaponDataIndex = data.backend.data.fetchWeaponDataIndex();
	const fetchAchievementCategoryDataIndex = data.backend.data.fetchAchievementCategoryDataIndex();
	let isLoading = JSON.stringify(get(dataIndexStore).weapon) === '{}';

	derived(
		[fetchCharacterDataIndex, fetchWeaponDataIndex, fetchAchievementCategoryDataIndex],
		async ([characterResponse, weaponResponse, achievementCategoryResponse]) => {
			if (
				characterResponse.status === 'success' &&
				weaponResponse.status === 'success' &&
				achievementCategoryResponse.status === 'success'
			) {
				isLoading = false;

				const combinedData = {
					character: characterResponse.data,
					weapon: weaponResponse.data,
					achievementCategory: achievementCategoryResponse.data
				};
				combinedData.weapon['Unknown3Star'] = { name: 'Unknown 3 star', rarity: 3 };
				dataIndexStore.set(combinedData);
			} else {
				console.error('Failed to fetch data');
			}
		}
	);

	console.log(get(applicationState));
	console.log(get(userProfile));
</script>

<svelte:head>
	<link href={webManifestLink} rel="manifest" />
	{#if pwaAssetsHead.themeColor}
		<meta name="theme-color" content={pwaAssetsHead.themeColor.content} />
	{/if}
	{#each pwaAssetsHead.links as link}
		<link {...link} />
	{/each}
</svelte:head>

<QueryClientProvider client={data.queryClient}>
	<div class={`${$applicationState.settings.theme} bg-neutral text-text min-h-screen`}>
		<div class="min-h-screen" id="main">
			{#if isLoading}
				<div class="flex flex-1 flex-row justify-center items-center min-h-screen">
					<DefaultLayout isLoading={true} />
				</div>
			{:else}
				<Sidebar />
				<!--  Main content-->
				<div class="sm:pl-20 xl:pl-72 max-sm:pt-16 sm:flex sm:justify-center min-h-screen">
					<slot />
				</div>
				<Toaster richColors />
			{/if}
		</div>
	</div>
</QueryClientProvider>
