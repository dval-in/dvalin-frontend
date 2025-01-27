<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import { Progress } from '../ui/progress';

	export let name: string;
	export let img: string;
	export let total: number;
	export let achieved: number;
	export let inSidebar: boolean = false;
	export let isSelected: boolean = false;

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('click');
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleClick();
		}
	}
</script>

<div
	class={`
	  ${isSelected ? 'border-primary border-2' : 'hover:scale-105'}${
			inSidebar
				? ' bg-tertiary/30 flex h-auto w-auto flex-row justify-between rounded-md py-3'
				: ' bg-tertiary/30 flex h-full w-full flex-col overflow-y-auto rounded-md'
		}
	  cursor-pointer transition-transform duration-300 ease-in-out
	`}
	on:click={handleClick}
	on:keydown={handleKeydown}
	tabindex="0"
	role="button"
	aria-label={`${name} - ${achieved} out of ${total} achieved`}
>
	{#if inSidebar}
		<div class="flex justify-center p-2 md:h-full">
			<img alt={name} class="w-20 max-w-none object-contain md:h-20 md:w-auto" src={img} />
		</div>
		<div class={'mx-3 my-3 w-full content-end text-left'}>
			<Text type="p" class="line-clamp-2 min-w-28 overflow-hidden text-ellipsis font-bold">
				{name}
			</Text>
			<Progress value={achieved} max={total} class="left" />
		</div>
	{:else}
		<div class="flex flex-col p-3 pb-0 text-center">
			<div class={`flex justify-center`}>
				<img alt={name} class="xl:h-36 xl:w-36" src={img} />
			</div>
		</div>
		<div class={'mx-3 my-3 mt-0 content-end justify-center text-center'}>
			<Progress value={achieved} max={total} class="my-3" />
			<Text type="h4">
				{name}
			</Text>
		</div>
	{/if}
</div>
