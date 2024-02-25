<script lang="ts">
	import Text from '$lib/components/typography/Text.svelte';
	import { type Elements, type Weapons } from '$lib/structs/types';

	export let link: string;
	export let name: string;
	export let img: string;
	export let element: Elements;
	export let weapon: Weapons;
	export let level: number;
	export let constellation: number;
</script>

<a class="flex flex-col w-24 xl:w-36 rounded-md overflow-hidden" href={link}>
	<div class="flex justify-center bg-fivestar">
		<img alt={name} class="w-24 h-24 xl:w-36 xl:h-36" src={img} />
	</div>
	<div class="flex flex-1 justify-center p-2 text-center bg-tertiary items-center">
		<Text type="h4">
			{name}
		</Text>
		<div class="hidden">{weapon} {level} {constellation} {element}</div>
	</div>
</a>
