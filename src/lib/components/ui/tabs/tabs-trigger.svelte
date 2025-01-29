<script lang="ts">
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils';

	type $$Props = TabsPrimitive.TriggerProps;
	type $$Events = TabsPrimitive.TriggerEvents;

	let className: $$Props['class'] = undefined;
	export let value: $$Props['value'];
	export { className as class };
</script>

<TabsPrimitive.Trigger
	{...$$restProps}
	class={cn(
		'rounded-xs ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring data-[state=active]:bg-primary data-[state=active]:shadow-xs inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
		className
	)}
	on:click
	{value}
>
	<slot />
</TabsPrimitive.Trigger>
