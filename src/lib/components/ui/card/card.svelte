<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	type $$Props = HTMLAttributes<HTMLDivElement>;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<div {...$$restProps} class={cn('rounded-lg border bg-tertiary text-text shadow-sm', className)}>
	<slot />
</div>
