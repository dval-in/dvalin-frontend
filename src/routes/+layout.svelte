<script lang="ts">
	import { applicationState } from '$lib/store/global_state';
	import '../app.pcss';
	import Sidebar from '$lib/components/navigator/Sidebar.svelte';
	import { get } from 'svelte/store';
	import { Toaster } from 'svelte-sonner';

	console.log(get(applicationState));
</script>

<div class={`${$applicationState.settings.theme} bg-neutral text-text min-h-screen`}>
	<div class="h-full" id="main">
		<Sidebar />
		<!--  Main content-->
		<div class="sm:pl-20 xl:pl-72 max-sm:pt-16 sm:flex sm:justify-center">
			<div class="flex flex-1 p-4 sm:pt-14 sm:max-w-[1536px]">
				<slot />
			</div>
		</div>
		<Toaster richColors />
	</div>
</div>
