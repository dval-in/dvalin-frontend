<script lang="ts">
	import { applicationState } from '$lib/store/application_state';
	import '../app.css';
	import Sidebar from '$lib/components/navigator/Sidebar.svelte';
	import { get } from 'svelte/store';
	import { Toaster } from 'svelte-sonner';
	import { pwaInfo } from 'virtual:pwa-info';
	import { pwaAssetsHead } from 'virtual:pwa-assets/head';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { userProfile } from '$lib/store/user_profile';
	import { dataIndex } from '$lib/store/index_store';
	import type { LayoutData } from './$types';
	import { onMount } from 'svelte';
	import Loading from '$lib/components/ui/loading/Loading.svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import { Progress } from '$lib/components/ui/progress';
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
	let progress = 0;

	$: {
		let characterIndex = $fetchCharacterDataIndex;
		let weaponIndex = $fetchWeaponDataIndex;
		let achievementCategoryIndex = $fetchAchievementCategoryDataIndex;
		progress = +characterIndex.isSuccess + +weaponIndex.isSuccess;
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

		const unsub = applicationState.subscribe((a) => {
			document.body.classList.remove(...['light', 'dark']);
			document.body.classList.add(a.settings.theme);
		});

		return () => {
			unsub();
		};
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
				<div
					class="flex min-h-screen flex-1 flex-col items-center justify-center gap-3 p-10"
				>
					<Loading />
					<Text type="h3">Loading resources...</Text>
					<Progress value={progress} max={2} />
				</div>
			{:else}
				<Sidebar />
				<!--  Main content-->
				<div class="min-h-screen max-sm:pt-16 sm:flex sm:justify-center sm:pl-20 xl:pl-72">
					<slot />
				</div>
				<Toaster richColors />
			{/if}
		</div>
	</div>
</QueryClientProvider>
