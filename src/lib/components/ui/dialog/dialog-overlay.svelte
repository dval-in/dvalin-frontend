<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils';
	import { fade } from 'svelte/transition';

	type $$Props = DialogPrimitive.OverlayProps;

	let className: $$Props['class'] = undefined;
	export let transition: $$Props['transition'] = fade;
	export let transitionConfig: $$Props['transitionConfig'] = {
		duration: 150
	};
	export { className as class };
</script>

<DialogPrimitive.Overlay
	{...$$restProps}
	class={cn('bg-neutral/80 backdrop-blur-xs fixed inset-0 z-50', className)}
	{transition}
	{transitionConfig}
/>
