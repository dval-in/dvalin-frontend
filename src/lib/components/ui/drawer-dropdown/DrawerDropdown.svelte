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
	<DropdownMenu closeOnEscape preventScroll={false} {...$$restProps}>
		<DropdownMenuTrigger>
			<slot name="trigger" />
		</DropdownMenuTrigger>
		<DropdownMenuContent class="flex flex-col p-3">
			<slot name="dropdown-content" />
		</DropdownMenuContent>
	</DropdownMenu>
{:else}
	<Drawer {...$$restProps}>
		<DrawerTrigger>
			<slot name="trigger" />
		</DrawerTrigger>
		<DrawerContent class="flex flex-col px-3 pb-3">
			<slot name="drawer-content" />
		</DrawerContent>
	</Drawer>
{/if}
