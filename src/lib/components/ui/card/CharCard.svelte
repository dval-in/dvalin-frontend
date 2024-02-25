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

<a href={link} class="flex flex-col w-36 xl:w-48 bg-fivestar rounded-md overflow-hidden">
	<div class="flex justify-center p-4 pb-0">
		<img class="w-24 h-24 xl:w-36 xl:h-36" src={img} alt={name} />
	</div>
	<div class="flex flex-1 justify-center p-4 rounded-t-md text-center bg-foreground items-center">
		<Text type="h3">
			{name}
		</Text>
		<div class="hidden">{weapon} {level} {constellation} {element}</div>
	</div>
</a>
