<script lang="ts">
	import { applicationState } from '$lib/store/application_state';
	import '../app.pcss';
	import Sidebar from '$lib/components/navigator/Sidebar.svelte';
	import { get } from 'svelte/store';
	import { Toaster } from 'svelte-sonner';
	import { pwaInfo } from 'virtual:pwa-info';
	import { pwaAssetsHead } from 'virtual:pwa-assets/head';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { userProfile } from '$lib/store/user_profile';
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import { dataIndex } from '$lib/store/index_store';
	import type { LayoutData } from './$types';
	import { onMount } from 'svelte';
	import i18n from '$lib/services/i18n';

	export let data: LayoutData;

	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.href : '';

	const fetchCharacterDataIndex = data.backend.data.fetchCharacterDataIndex($i18n.language);
	const fetchWeaponDataIndex = data.backend.data.fetchWeaponDataIndex($i18n.language);
	const fetchAchievementCategoryDataIndex = data.backend.data.fetchAchievementCategoryDataIndex(
		$i18n.language
	);

	let isLoading =
		JSON.stringify(get(dataIndex).character) === '{}' ||
		JSON.stringify(get(dataIndex).weapon) === '{}' ||
		JSON.stringify(get(dataIndex).achievementCategory) === '{}';

	$: {
		let characterIndex = $fetchCharacterDataIndex;
		let weaponIndex = $fetchWeaponDataIndex;
		let achievementCategoryIndex = $fetchAchievementCategoryDataIndex;

		if (
			characterIndex.isSuccess &&
			weaponIndex.isSuccess &&
			achievementCategoryIndex.isSuccess
		) {
			weaponIndex.data['Unknown3Star'] = { name: 'Unknown 3 star', rarity: 3, type: 'sword' };

			dataIndex.set({
				character: characterIndex.data,
				weapon: weaponIndex.data,
				achievementCategory: achievementCategoryIndex.data
			});

			isLoading = false;
		}
	}

	onMount(() => {
		document.body.classList.add(get(applicationState).settings.theme);

		applicationState.subscribe((a) => {
			document.body.classList.remove(...['light', 'dark']);
			document.body.classList.add(a.settings.theme);
		});
	});

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
	<div class={`bg-neutral text-text min-h-screen`}>
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
