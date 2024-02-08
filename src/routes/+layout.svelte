<script lang="ts">
	import { settings } from '$lib/store/global_state';
	import { get } from 'svelte/store';
	import '../app.pcss';
	import Sidebar from '$lib/components/navigator/Sidebar.svelte';

	let themeClass = `t${get(settings).global.theme}`;
</script>

<html lang="en" class="{themeClass} text-text bg-background min-h-screen">
	<div id="main" class="h-full">
		<Sidebar />
		<!--  Main content-->
		<div class="sm:pl-20 lg:pl-72 max-sm:pt-16">
			<div class="p-4 sm:pt-14">
				<slot />
			</div>
		</div>
	</div>
</html>
