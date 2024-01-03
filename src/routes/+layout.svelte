<script lang="ts">
	import '../app.scss';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import Header from '$lib/components/navigator/Header.svelte';
	import { page } from '$app/stores';
	$: segment = $page.url.pathname.substring(1).split('/')[0];
</script>

<div id="main" class="h-full">
	<Header />
	<!--  Sidebar navigator for large screen-->
	<Sidebar {segment} />
	<!--  Top navigator for mobile-->

	<!--  Main content-->
	<div class="ml-64 pt-16 lg:pt-4 md:px-4">
		<slot />
	</div>
</div>
