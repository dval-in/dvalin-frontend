<script lang="ts">
	import Text from '$lib/components/typography/Text.svelte';
	import type { WeaponTypes } from '$lib/types/weapon';

	export let link: string;
	export let name: string;
	export let img: string;
	export let type: WeaponTypes;
	export let count: number;
	export let rarity: number;
	export let obtained: boolean;
</script>

<a
	class="flex flex-col w-full rounded-md overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out"
	href={link}
>
	<div
		class={`flex justify-center ${rarity === 5 ? 'bg-fivestar' : rarity === 4 ? 'bg-fourstar' : 'bg-threestar'} ${obtained ? '' : 'opacity-50'} relative`}
	>
		<img alt={name} class="w-24 h-24 xl:w-36 xl:h-36" src={img} />
		<span class="absolute bg-black/70 rounded px-4 text-sm right-2 bottom-2">{count}</span>
	</div>
	<div class="flex flex-1 justify-center p-2 text-center bg-tertiary items-center">
		<Text type="h4">
			{name}
		</Text>

		<div class="hidden">{type}</div>
	</div>
</a>
