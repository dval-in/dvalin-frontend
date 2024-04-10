<script lang="ts">
	import { applicationState } from '$lib/store/global_state';
	import '../app.pcss';
	import Sidebar from '$lib/components/navigator/Sidebar.svelte';
	import { get } from 'svelte/store';
	import { Toaster } from 'svelte-sonner';
	import { pwaInfo } from 'virtual:pwa-info';
	import { pwaAssetsHead } from 'virtual:pwa-assets/head';
	import { dataIndexStore } from '$lib/store/index_store';

	/** @type {import('./$types').LayoutData} */
	export let data;
	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.href : '';

	dataIndexStore.set(data);

	console.log(get(applicationState));
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

<div class={`${$applicationState.settings.theme} bg-neutral text-text min-h-screen`}>
	<div class="h-full" id="main">
		<Sidebar />
		<!--  Main content-->
		<div class="sm:pl-20 xl:pl-72 max-sm:pt-16 sm:flex sm:justify-center">
			<slot />
		</div>
		<Toaster richColors />
	</div>
</div>
