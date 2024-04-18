<script lang="ts">
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import { Button } from '$lib/components/ui/button/index.js';

	export let icon: string = '';

	export let contentClass = '';
</script>

<Button {...$$restProps} on:click>
	<Icon path={icon} />
	{#if $$slots}
		<div class={`ml-2 ${contentClass}`}>
			<slot />
		</div>
	{/if}
</Button>
