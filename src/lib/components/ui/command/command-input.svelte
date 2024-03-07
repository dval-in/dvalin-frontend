<script lang="ts">
	import { Command as CommandPrimitive } from 'cmdk-sv';
	import { cn } from '$lib/utils';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import { mdiMagnify } from '@mdi/js';

	type $$Props = CommandPrimitive.InputProps;

	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: string = '';
</script>

<div class="flex items-center border-b px-2 gap-2" data-cmdk-input-wrapper="">
	<Icon path={mdiMagnify} />
	<CommandPrimitive.Input
		{...$$restProps}
		bind:value
		class={cn(
			'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
			className
		)}
	/>
</div>
