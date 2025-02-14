<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
	import Check from 'lucide-svelte/icons/check';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import { cn } from '$lib/utils';
	import { mdiCheck } from '@mdi/js';

	type $$Props = DropdownMenuPrimitive.CheckboxItemProps;
	type $$Events = DropdownMenuPrimitive.CheckboxItemEvents;

	let className: $$Props['class'] = undefined;
	export let checked: $$Props['checked'] = undefined;
	export { className as class };
</script>

<DropdownMenuPrimitive.CheckboxItem
	{...$$restProps}
	bind:checked
	class={cn(
		'rounded-xs outline-hidden data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground relative flex cursor-default select-none items-center py-1.5 pl-8 pr-2 text-sm data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
		className
	)}
	on:click
	on:focusin
	on:focusout
	on:keydown
	on:pointerdown
	on:pointerleave
	on:pointermove
>
	<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
		<DropdownMenuPrimitive.CheckboxIndicator>
			<Icon path={mdiCheck} />
		</DropdownMenuPrimitive.CheckboxIndicator>
	</span>
	<slot />
</DropdownMenuPrimitive.CheckboxItem>
