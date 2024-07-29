<script lang="ts">
	import Text from '$lib/components/typography/Text.svelte';
	import { Progress } from 'svelte-ux';
	import IconButton from '$lib/components/ui/icon-button/IconButton.svelte';

	export let link: string;
	export let name: string;
	export let img: string;
	export let total: number;
	export let achieved: number;
	export let inSidebar: boolean = false;
	let percent = (achieved / total) * 100;
</script>

{#if inSidebar}
	<!--	<IconButton-->
	<!--		{...$$restProps}-->
	<!--		href={link}-->
	<!--		icon={img}-->
	<!--		on:click-->
	<!--	>-->
	<!--		{name}-->
	<!--	</IconButton>-->
	<a
		class="flex flex-row w-auto mx-3 h-50 xl:h-50 rounded-md py-3 bg-tertiary/30 hover:scale-105 transition-transform duration-300 ease-in-out"
		href={link}
	>
		<div class="flex flex-col p-2 text-center">
			<div class={`flex justify-center`}>
				<img alt={name} class="w-20 h-20 xl:w-26 xl:h-26" src={img} />
			</div>
			<div class="hidden">{link} {name} {total} {achieved}</div>
		</div>
		<div class={'text-left w-full content-end mx-3 my-3'}>
			<Text type="h4">
				{name}
			</Text>
			<Text type="small">
				{achieved}/{total} ({percent}%)
			</Text>
			<Progress value={percent} class="left" />
		</div>
	</a>
{:else}
	<a
		class="flex flex-col w-40 xl:w-52 rounded-md overflow-y-auto bg-tertiary/30 hover:scale-105 transition-transform duration-300 ease-in-out"
		href={link}
	>
		<div class="flex flex-col p-2 text-center">
			<div class={`flex justify-center`}>
				<img alt={name} class="w-24 h-24 xl:w-36 xl:h-36" src={img} />
			</div>
			<div class="hidden">{link} {name} {total} {achieved}</div>
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
	</a>
{/if}
