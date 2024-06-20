<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils';
	import { Check } from 'lucide-svelte';

	type $$Props = DropdownMenuPrimitive.ItemProps & {
		inset?: boolean;
		checked?: boolean;
	};
	type $$Events = DropdownMenuPrimitive.ItemEvents;

	let className: $$Props['class'] = undefined;
	export let inset: $$Props['inset'] = undefined;
	export let checked: $$Props['checked'] = false;
	export { className as class };
</script>

<DropdownMenuPrimitive.Item
	class={cn(
		'relative flex cursor-default select-none items-center rounded-sm px-2 ml-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50',
		inset && 'pl-8',
		className
	)}
	{...$$restProps}
	on:click
	on:keydown
	on:focusin
	on:focusout
	on:pointerdown
	on:pointerleave
	on:pointermove
>
	<slot />
	{#if checked}
		<Check class="ml-2 w-4 text-primary" />
	{/if}
</DropdownMenuPrimitive.Item>
