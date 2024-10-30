<script lang="ts">
	import Text from '$lib/components/typography/Text.svelte';
	import S3Service from '$lib/services/s3';

	export let name: string;
	export let img: string;
	export let type: string;
	export let level: number;
	export let ascencion: number;
	export let refinement: number;
	export let rarity: number;
	export let location: string;
</script>

<div
	class="relative flex flex-col w-full rounded-md hover:scale-105 transition-transform duration-300 ease-in-out"
>
	{#if location !== ''}
		<div class="absolute z-[4] -right-2 -top-2">
			<img
				class="bg-neutral/70 size-10 rounded-full border-solid border-white/70 border"
				alt={location}
				src={S3Service.getCharacter(location).icon}
			/>
		</div>
	{/if}

	<div
		class="absolute z-[4] top-1 left-1 size-6 bg-neutral/60 rounded-sm text-center
            flex flex-row justify-center items-center
            {refinement === 5 ? `text-primary bg-fivestar/60` : `text-text`} "
	>
		<p class="max-h-full text-xl leading-5 font-semibold">
			{refinement}
		</p>
	</div>

	<div
		class={`rounded-t-md flex justify-center ${rarity === 5 ? 'bg-fivestar' : rarity === 4 ? 'bg-fourstar' : 'bg-threestar'}`}
	>
		<img alt={name} class="size-24 xl:size-36" src={img} />
	</div>

	<div class="w-full h-6 bg-tertiaryHover flex justify-center text-center items-center py-0">
		<Text type="large">
			Lv. {level}
		</Text>
	</div>

	<div class="flex flex-1 justify-center p-2 text-center bg-tertiary items-center rounded-b-md">
		<Text type="h4">
			{name}
		</Text>
		<div class="hidden">{type} {level} {ascencion} {refinement}</div>
	</div>
</div>
