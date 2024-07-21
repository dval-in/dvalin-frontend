<script lang="ts">
	import Text from '$lib/components/typography/Text.svelte';

	export let link: string;
	export let name: string;
	export let img: string;
	export let total: number;
	export let achieved: number;
</script>

<a
	class="flex flex-col w-24 xl:w-36 rounded-md overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out"
	href={link}
>
	<div class={`flex justify-center`}>
		<img alt={name} class="w-24 h-24 xl:w-36 xl:h-36" src={img} />
	</div>
	<div class="flex flex-1 justify-center p-2 text-center bg-tertiary items-center">
		<Text type="h4">
			{name}
		</Text>
		<div class="hidden">{link} {name} {total} {achieved}</div>
	</div>
</a>
