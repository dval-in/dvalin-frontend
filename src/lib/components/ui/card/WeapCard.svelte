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
	class="flex w-full flex-col overflow-hidden rounded-md transition-transform duration-300 ease-in-out hover:scale-105"
	href={link}
>
	<div
		class={`flex justify-center ${rarity === 5 ? 'bg-fivestar' : rarity === 4 ? 'bg-fourstar' : 'bg-threestar'} ${obtained ? '' : 'opacity-50'} relative`}
	>
		<img alt={name} class="h-24 w-24 xl:h-36 xl:w-36" src={img} />
		<span class="absolute bottom-2 right-2 rounded-sm bg-black/70 px-4 text-sm">{count}</span>
	</div>
	<div class="bg-tertiary flex flex-1 items-center justify-center p-2 text-center">
		<Text type="h4">
			{name}
		</Text>

		<div class="hidden">{type}</div>
	</div>
</a>
