<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils';
	import { fade } from 'svelte/transition';

	type $$Props = AlertDialogPrimitive.OverlayProps;

	let className: $$Props['class'] = undefined;
	export let transition: $$Props['transition'] = fade;
	export let transitionConfig: $$Props['transitionConfig'] = {
		duration: 150
	};
	export { className as class };
</script>

<AlertDialogPrimitive.Overlay
	{...$$restProps}
	class={cn('bg-neutral/80 backdrop-blur-xs fixed inset-0 z-50 ', className)}
	{transition}
	{transitionConfig}
/>
