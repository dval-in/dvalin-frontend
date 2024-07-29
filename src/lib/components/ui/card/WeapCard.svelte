<script lang="ts">
	import Text from '$lib/components/typography/Text.svelte';
	import S3Service from '$lib/services/s3';
	import type { Elements } from '$lib/types/elements';
	import type { CharacterKey } from '$lib/types/keys/CharacterKey';
	import type { WeaponTypes } from '$lib/types/weapon';

	export let link: string;
	export let name: string;
	export let img: string;
	export let type: WeaponTypes;
	export let level: number;
	export let ascencion: number;
	export let refinement: number;
	export let rarity: number;
	export let obtained: boolean;
	export let location: CharacterKey | '';
</script>

<!-- export type IWeapon = {
	key: WeaponKey; // "CrescentPike"
	level: number; // 1-90 inclusive
	ascension: number; // 0-6 inclusive. need to disambiguate 80/90 or 80/80
	refinement: number; // 1-5 inclusive
	location: CharacterKey | ''; // Where "" means not equipped.
	lock: boolean; // Whether the weapon is locked in game.
}; -->

<a
	class="relative flex flex-col w-24 xl:w-36 rounded-md hover:scale-105 transition-transform duration-300 ease-in-out"
	href={link}
>
	{#if obtained && location !== ''}
		<div class="absolute z-[4] -right-2 -top-2">
			<img
				class="bg-neutral/70 size-10 rounded-full border-solid border-white/70 border"
				alt={location}
				src={S3Service.getCharacter(location).icon}
			/>
		</div>
	{/if}
	{#if obtained}
		<div
			class="absolute z-[4] top-1 left-1 size-6 bg-neutral/60 rounded-sm text-center
            flex flex-row justify-center items-center
            {refinement === 5 ? `text-primary bg-fivestar/60` : `text-text`} "
		>
			<p class="max-h-full text-xl leading-5 font-semibold">
				{refinement}
			</p>
		</div>
	{/if}
	<div
		class={`rounded-t-md flex justify-center ${rarity === 5 ? 'bg-fivestar' : rarity === 4 ? 'bg-fourstar' : 'bg-threestar'} ${obtained ? '' : 'opacity-50'}`}
	>
		<img alt={name} class="size-24 xl:size-36" src={img} />
	</div>
	{#if obtained}
		<div class="w-full h-6 bg-tertiaryHover flex justify-center text-center items-center py-0">
			<Text type="large">
				Lv. {level}
			</Text>
		</div>
	{/if}
	<div class="flex flex-1 justify-center p-2 text-center bg-tertiary items-center rounded-b-md">
		<Text type="h4">
			{name}
		</Text>
		<div class="hidden">{type} {level} {ascencion} {refinement}</div>
	</div>
</a>
