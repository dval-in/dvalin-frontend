<script lang="ts">
	import '../app.scss';
	import Sidebar from '$lib/components/navigator/Sidebar.svelte';
	import Header from '$lib/components/navigator/Header.svelte';
	import { page } from '$app/stores';
	import {showSidebar} from "$lib/store/global_state";
	$: segment = $page.url.pathname.substring(1).split('/')[0];
</script>

<div id="main" class="h-full">
	<Header />
	<!--  Sidebar navigator for large screen-->
	<Sidebar {segment} />
	<!--  Top navigator for mobile-->
	{#if $showSidebar}
		<Sidebar {segment} isMobile/>
	{/if}
	<!--  Main content-->
	<div class="ml-0 pt-16 lg:ml-64 lg:pt-4 md:px-4">
		<slot />
	</div>
</div>
