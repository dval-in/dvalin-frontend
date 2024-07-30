<script lang="ts">
	import IconButton from '$lib/components/ui/icon-button/IconButton.svelte';
	import { page } from '$app/stores';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import i18n from '$lib/services/i18n';
	import { mdiOpenInNew } from '@mdi/js/commonjs/mdi';

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
	target={external ? '_blank' : ''}
	{icon}
	on:click
	variant={currentActivePath === link ? 'activeSidebar' : 'sidebar'}
	class={`${isSidebarOpen ? '' : 'sm:max-xl:justify-center'}`}
	contentClass={`${isSidebarOpen ? '' : 'sm:max-xl:hidden'}`}
>
	{$i18n.t(title)}
	{#if external}
		<Icon path={mdiOpenInNew} />
	{/if}
</IconButton>
