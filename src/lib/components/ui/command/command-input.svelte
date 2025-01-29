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

<div class="flex items-center gap-2 border-b px-2" data-cmdk-input-wrapper="">
	<Icon path={mdiMagnify} />
	<CommandPrimitive.Input
		{...$$restProps}
		bind:value
		class={cn(
			'outline-hidden placeholder:text-muted-foreground flex h-11 w-full rounded-md bg-transparent py-3 text-sm disabled:cursor-not-allowed disabled:opacity-50',
			className
		)}
	/>
</div>
