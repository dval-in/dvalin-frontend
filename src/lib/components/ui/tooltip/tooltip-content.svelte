<script lang="ts">
	import { Tooltip as TooltipPrimitive } from 'bits-ui';
	import { cn, flyAndScale } from '$lib/utils';

	type $$Props = TooltipPrimitive.ContentProps;

	let className: $$Props['class'] = undefined;
	export let sideOffset: $$Props['sideOffset'] = 4;
	export let transition: $$Props['transition'] = flyAndScale;
	export let transitionConfig: $$Props['transitionConfig'] = {
		y: 8,
		duration: 150
	};
	export { className as class };
</script>

<TooltipPrimitive.Content
	{...$$restProps}
	class={cn(
		'bg-neutral text-popover-foreground z-50 overflow-hidden rounded-md border px-3 py-1.5 text-sm shadow-md',
		className
	)}
	{sideOffset}
	{transition}
	{transitionConfig}
>
	<slot />
</TooltipPrimitive.Content>
