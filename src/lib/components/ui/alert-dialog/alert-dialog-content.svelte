<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from 'bits-ui';
	import * as AlertDialog from '.';
	import { cn, flyAndScale } from '$lib/utils';

	type $$Props = AlertDialogPrimitive.ContentProps;

	export let transition: $$Props['transition'] = flyAndScale;
	export let transitionConfig: $$Props['transitionConfig'] = undefined;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<AlertDialog.Portal>
	<AlertDialog.Overlay />
	<AlertDialogPrimitive.Content
		{...$$restProps}
		class={cn(
			'bg-neutral fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg sm:rounded-lg md:w-full',
			className
		)}
		{transition}
		{transitionConfig}
	>
		<slot />
	</AlertDialogPrimitive.Content>
</AlertDialog.Portal>
