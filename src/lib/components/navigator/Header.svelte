<script lang="ts">
	import { showSidebar } from '$lib/store/global_state';
	import { Button } from '$lib/components/ui/button';
	import { Menu } from 'svelte-lucide';

	function showMenu() {
		showSidebar.set(true);
	}
</script>

<div
	class="flex items-center lg:hidden fixed w-full h-16 header bg-background z-50 shadow-md overflow-hidden"
>
	<a
		href="/"
		class="flex-1 pl-4 md:pl-8 font-display text-3xl font-black text-white relative z-10 pt-2"
	>
	</a>
	<Button
		variant="ghost"
		class="rounded-full rounded-r-none p-8 cursor-pointer"
		on:click={showMenu}
	>
		<Menu />
	</Button>
</div>
