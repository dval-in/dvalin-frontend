<script lang="ts">
	import { Progress as ProgressPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils';

	type $$Props = ProgressPrimitive.Props;

	let className: $$Props['class'] = undefined;
	export let max: $$Props['max'] = 100;
	export let value: $$Props['value'] = undefined;
	export { className as class };

	$: percent = Math.round(((Number(value) ?? 0) / (Number(max) ?? 1)) * 100);
</script>

<ProgressPrimitive.Root
	class={cn('bg-primary/20 relative h-4 w-full overflow-hidden rounded-full', className)}
	{...$$restProps}
>
	<div
		class="bg-primary/80 h-full w-full flex-1 transition-all"
		style={`transform: translateX(-${100 - percent}%)`}
	/>
	<p class="absolute left-1/2 top-0 h-full -translate-x-1/2 text-xs">
		{value}/{max}
		{`(${percent}%)`}
	</p>
</ProgressPrimitive.Root>
