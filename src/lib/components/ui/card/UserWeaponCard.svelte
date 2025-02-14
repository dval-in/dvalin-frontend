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
	class="relative flex w-full flex-col rounded-md transition-transform duration-300 ease-in-out hover:scale-105"
>
	{#if location !== ''}
		<div class="absolute -right-2 -top-2 z-[4]">
			<img
				class="bg-neutral/70 size-10 rounded-full border border-solid border-white/70"
				alt={location}
				src={S3Service.getCharacter(location).icon}
			/>
		</div>
	{/if}

	<div
		class="bg-neutral/60 rounded-xs absolute left-1 top-1 z-[4] flex size-6
            flex-row items-center justify-center text-center
            {refinement === 5 ? `text-primary bg-fivestar/60` : `text-text`} "
	>
		<p class="max-h-full text-xl font-semibold leading-5">
			{refinement}
		</p>
	</div>

	<div
		class={`flex justify-center rounded-t-md ${rarity === 5 ? 'bg-fivestar' : rarity === 4 ? 'bg-fourstar' : 'bg-threestar'}`}
	>
		<img alt={name} class="size-24 xl:size-36" src={img} />
	</div>

	<div class="bg-tertiaryHover flex h-6 w-full items-center justify-center py-0 text-center">
		<Text type="large">
			Lv. {level}
		</Text>
	</div>

	<div class="bg-tertiary flex flex-1 items-center justify-center rounded-b-md p-2 text-center">
		<Text type="h4">
			{name}
		</Text>
		<div class="hidden">{type} {level} {ascencion} {refinement}</div>
	</div>
</div>
