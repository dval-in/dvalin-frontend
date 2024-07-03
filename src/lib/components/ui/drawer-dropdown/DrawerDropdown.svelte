<script lang="ts">
	import { mediaQuery } from 'svelte-legos';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu/index';
	import { Drawer, DrawerContent, DrawerTrigger } from '$lib/components/ui/drawer';

	const isDesktop = mediaQuery('(min-width: 768px)');
</script>

{#if $isDesktop}
	<DropdownMenu closeOnEscape preventScroll={false}>
		<DropdownMenuTrigger>
			<slot name="trigger" />
		</DropdownMenuTrigger>
		<DropdownMenuContent class="p-3 flex flex-col">
			<slot name="dropdown-content" />
		</DropdownMenuContent>
	</DropdownMenu>
{:else}
	<Drawer>
		<DrawerTrigger>
			<slot name="trigger" />
		</DrawerTrigger>
		<DrawerContent class="px-3 pb-3 flex flex-col">
			<slot name="drawer-content" />
		</DrawerContent>
	</Drawer>
{/if}
