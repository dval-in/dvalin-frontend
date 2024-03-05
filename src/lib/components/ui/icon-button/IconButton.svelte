<script lang="ts">
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import { Button } from '$lib/components/ui/button/index.js';

	export let icon: string = '';
	export let onClick: () => void = () => {};
</script>

<Button {...$$restProps} on:click={onClick}>
	<Icon path={icon} />
	{#if $$slots}
		<div class="ml-2">
			<slot />
		</div>
	{/if}
</Button>
