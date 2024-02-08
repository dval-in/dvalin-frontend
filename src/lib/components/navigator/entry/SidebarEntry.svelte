<script lang="ts">
	import IconButton from '$lib/components/ui/icon-button/IconButton.svelte';
	import { page } from '$app/stores';

	export let icon: string;
	export let link: string;
	export let title: string;
	export let isSidebarOpen: boolean;
	export let onClick: () => void;

	$: currentActivePath = $page.url.pathname;
</script>

<IconButton
	{icon}
	variant={currentActivePath === link ? 'activeSidebar' : 'sidebar'}
	href={link}
	{onClick}
	{...$$restProps}
>
	<div class={`ml-2 ${isSidebarOpen ? '' : 'sm:max-lg:hidden'}`}>{title}</div>
</IconButton>
