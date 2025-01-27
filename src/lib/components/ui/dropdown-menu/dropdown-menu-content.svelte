<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
	import { cn, flyAndScale } from '$lib/utils';

	type $$Props = DropdownMenuPrimitive.ContentProps;
	type $$Events = DropdownMenuPrimitive.ContentEvents;

	let className: $$Props['class'] = undefined;
	export let sideOffset: $$Props['sideOffset'] = 4;
	export let transition: $$Props['transition'] = flyAndScale;
	export let transitionConfig: $$Props['transitionConfig'] = undefined;
	export { className as class };
</script>

<DropdownMenuPrimitive.Content
	{...$$restProps}
	class={cn(
		'bg-neutral text-text focus:outline-hidden z-50 min-w-[8rem] rounded-md border p-1 shadow-md',
		className
	)}
	on:keydown
	{sideOffset}
	{transition}
	{transitionConfig}
>
	<slot />
</DropdownMenuPrimitive.Content>
