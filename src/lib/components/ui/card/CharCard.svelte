<script lang="ts">
	import Text from '$lib/components/typography/Text.svelte';
	import type { Elements } from '$lib/types/elements';
	import type { WeaponTypes } from '$lib/types/weapon';

	export let link: string;
	export let name: string;
	export let img: string;
	export let element: Elements;
	export let weapon: WeaponTypes;
	export let level: number;
	export let constellation: number;
	export let rarity: number;
	export let obtained: boolean;
</script>

<a
	class="flex w-full flex-col overflow-hidden rounded-md transition-transform duration-300 ease-in-out hover:scale-105"
	href={link}
>
	<div
		class={`flex justify-center ${rarity === 5 ? 'bg-fivestar' : 'bg-fourstar'} ${obtained ? '' : 'opacity-50'}`}
	>
		<img alt={name} class="h-24 w-24 xl:h-36 xl:w-36" src={img} />
	</div>
	<div class="bg-tertiary flex flex-1 items-center justify-center p-2 text-center">
		<Text type="h4">
			{name}
		</Text>
		<div class="hidden">{weapon} {level} {constellation} {element}</div>
	</div>
</a>
