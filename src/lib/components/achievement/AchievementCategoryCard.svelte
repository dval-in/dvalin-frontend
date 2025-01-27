<script lang="ts">
	import Text from '$lib/components/typography/Text.svelte';
	import { Progress } from '../ui/progress';

	export let name: string;
	export let img: string;
	export let total: number;
	export let achieved: number;
	export let inSidebar: boolean = false;
	export let isSelected: boolean = false;
	export let link: string;
</script>

<a
	href={link}
	class={`${isSelected ? 'border-2 border-primary' : 'hover:scale-105'}
			${
				inSidebar
					? ' flex flex-row rounded-md py-3 bg-tertiary/30'
					: ' flex flex-col w-full rounded-md h-full overflow-y-auto bg-tertiary/30'
			}
			p-2 transition-transform duration-300 ease-in-out cursor-pointer`}
	role="button"
	aria-label={`${name} - ${achieved} out of ${total} achieved`}
>
	{#if inSidebar}
		<img alt={name} class="flex object-contain size-20 p-2" src={img} />
		<div class={'flex flex-1 flex-col justify-center gap-2'}>
			<Text type="p" class="flex max-w-72">
				{name}
			</Text>
			<Progress value={achieved} max={total} class="flex w-auto" />
		</div>
	{:else}
		<div class="flex flex-col p-3 text-center pb-0">
			<div class={`flex justify-center`}>
				<img alt={name} class="xl:w-36 xl:h-36" src={img} />
			</div>
		</div>
		<div class={'text-center justify-center content-end mx-3 my-3 mt-0'}>
			<Progress value={achieved} max={total} class="my-3" />
			<Text type="h4">
				{name}
			</Text>
		</div>
	{/if}
</a>
