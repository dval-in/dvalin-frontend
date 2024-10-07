<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import { Progress } from 'svelte-ux';

	export let name: string;
	export let img: string;
	export let total: number;
	export let achieved: number;
	export let inSidebar: boolean = false;

	const dispatch = createEventDispatcher();

	let percent = (achieved / total) * 100;

	function handleClick() {
		dispatch('click');
	}
</script>

<div
	class={`
	  ${
			inSidebar
				? 'flex flex-row h-full w-full justify-between rounded-md py-3 bg-tertiary/30'
				: 'flex flex-col w-40 xl:w-52 rounded-md overflow-y-auto bg-tertiary/30'
		}
	  hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer
	`}
	on:click={handleClick}
>
	{#if inSidebar}
		<div class="flex p-2 h-full justify-center">
			<img alt={name} class="object-contain h-20" src={img} />
		</div>
		<div class={'text-left w-full content-end mx-3 my-3'}>
			<Text type="p" class="font-bold">
				{name}
			</Text>
			<Text type="small">
				{achieved}/{total} ({percent}%)
			</Text>
			<Progress value={percent} class="left" />
		</div>
	{:else}
		<div class="flex flex-col p-2 text-center">
			<div class={`flex justify-center`}>
				<img alt={name} class="xl:w-36 xl:h-36" src={img} />
			</div>
		</div>
		<div class={'text-center justify-center content-end mx-3 my-3'}>
			<Text type="small">
				{achieved}/{total} ({percent}%)
			</Text>
			<Progress value={percent} />
			<Text type="h4">
				{name}
			</Text>
		</div>
	{/if}
</div>
