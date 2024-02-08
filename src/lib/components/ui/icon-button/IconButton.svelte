<script lang="ts">
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import { Button } from '$lib/components/ui/button/index.js';

	export let icon: string = '';
	export let onClick: () => void = () => {};
</script>

<Button on:click={onClick} {...$$restProps}>
	<Icon path={icon} color="fill-sidebarText group-hover:fill-white" size={1} />
	<slot />
</Button>
