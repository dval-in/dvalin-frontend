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
	class={`${isSelected ? 'border-primary border-2' : 'hover:scale-105'}
			${
				inSidebar
					? ' bg-tertiary/30 flex flex-row rounded-md py-3'
					: ' bg-tertiary/30 flex h-full w-full flex-col overflow-y-auto rounded-md'
			}
			cursor-pointer p-2 transition-transform duration-300 ease-in-out`}
	role="button"
	aria-label={`${name} - ${achieved} out of ${total} achieved`}
>
	{#if inSidebar}
		<img alt={name} class="flex size-20 object-contain p-2" src={img} />
		<div class={'flex flex-1 flex-col justify-center gap-2'}>
			<Text type="p" class="flex max-w-72">
				{name}
			</Text>
			<Progress value={achieved} max={total} class="flex w-auto" />
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
</a>
