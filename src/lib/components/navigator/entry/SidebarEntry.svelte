<script lang="ts">
	import IconButton from '$lib/components/ui/icon-button/IconButton.svelte';
	import { page } from '$app/stores';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import { mdiLink } from '@mdi/js';

	export let icon: string;
	export let link: string;
	export let title: string;
	export let external: boolean = false;
	export let isSidebarOpen: boolean;

	$: currentActivePath = $page.url.pathname;
</script>

<IconButton
	{...$$restProps}
	href={link}
	{icon}
	on:click
	variant={currentActivePath === link ? 'activeSidebar' : 'sidebar'}
>
	<div class={`${isSidebarOpen ? '' : 'sm:max-xl:hidden'}`}>
		{title}
		{#if external}
			<Icon path={mdiLink}></Icon>
		{/if}
	</div>
</IconButton>
