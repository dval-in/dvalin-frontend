<script lang="ts">
	import Text from '$lib/components/typography/Text.svelte';
	import { Tooltip, TooltipContent, TooltipTrigger } from '$lib/components/ui/tooltip';

	export let title: string;

	let exportedClass = '';

	export { exportedClass as class };
</script>

<Tooltip>
	<TooltipTrigger
		class={`flex min-w-24 flex-1 flex-col items-center justify-center gap-2 rounded-md p-2 text-center ${exportedClass}`}
	>
		<Text type="h4">{title}</Text>
		<div class="flex flex-wrap justify-center gap-2">
			<slot />
		</div>
	</TooltipTrigger>
	{#if $$slots.tooltip !== undefined}
		<TooltipContent class="flex">
			<slot name="tooltip" />
		</TooltipContent>
	{/if}
</Tooltip>
