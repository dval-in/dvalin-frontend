<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { badgeVariants, type Variant } from './index.js';

	let className: string | undefined | null = undefined;
	export let href: string | undefined = undefined;
	export let variant: Variant = 'default';
	export let isClosing: boolean = false;
	export let onClose: () => void = () => {};
	export { className as class };
</script>

<svelte:element
	this={href ? 'a' : 'span'}
	{href}
	class={cn(badgeVariants({ variant, className }), 'relative', isClosing && 'pr-10')}
	{...$$restProps}
>
	<slot />
	{#if isClosing}
		<button
			class="absolute right-0 flex h-full w-8 items-center justify-center rounded-full p-2 backdrop-brightness-[.60] hover:backdrop-brightness-110"
			on:click={onClose}
		>
			X
		</button>
	{/if}
</svelte:element>
