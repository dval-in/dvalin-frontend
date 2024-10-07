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
	  ${isSelected ? 'border-2 border-primary' : 'hover:scale-105'}${
			inSidebar
				? ' flex flex-row h-auto w-auto justify-between rounded-md py-3 bg-tertiary/30'
				: ' flex flex-col w-full rounded-md h-full overflow-y-auto bg-tertiary/30'
		}
	  transition-transform duration-300 ease-in-out cursor-pointer
	`}
	on:click={handleClick}
	on:keydown={handleKeydown}
	tabindex="0"
	role="button"
	aria-label={`${name} - ${achieved} out of ${total} achieved`}
>
	{#if inSidebar}
		<div class="flex p-2 h-full justify-center">
			<img alt={name} class="object-contain h-20" src={img} />
		</div>
		<div class={'text-left w-full content-end mx-3 my-3'}>
			<Text type="p" class="font-bold">
				{name}
			</Text>
			<Progress value={achieved} max={total} class="left" />
		</div>
	{:else}
		<div class="flex flex-col p-2 text-center">
			<div class={`flex justify-center`}>
				<img alt={name} class="xl:w-36 xl:h-36" src={img} />
			</div>
		</div>
		<div class={'text-center justify-center content-end mx-3 my-3'}>
			<Progress value={achieved} max={total} class="my-3" />
			<Text type="h4">
				{name}
			</Text>
		</div>
	{/if}
</div>
