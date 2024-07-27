<script lang="ts">
	import Text from '$lib/components/typography/Text.svelte';
	import { Progress } from 'svelte-ux';

	export let link: string;
	export let name: string;
	export let img: string;
	export let total: number;
	export let achieved: number;
	export let inSidebar: boolean = false;
	let percent = (achieved / total) * 100;
</script>

<a
	class="flex flex-col w-40 xl:w-52 rounded-md overflow-hidden bg-tertiary/30 hover:scale-105 transition-transform duration-300 ease-in-out"
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
