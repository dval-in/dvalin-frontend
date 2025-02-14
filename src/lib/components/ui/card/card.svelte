<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	type $$Props = HTMLAttributes<HTMLDivElement>;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<div
	{...$$restProps}
	class={cn('bg-tertiary text-text shadow-xs gap-2 rounded-lg border p-2 sm:p-4', className)}
>
	<slot />
</div>
