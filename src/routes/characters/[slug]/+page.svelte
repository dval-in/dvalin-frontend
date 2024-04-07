<script lang="ts">
	import { type CharacterKey } from '$lib/types/keys/CharacterKey';
	import { type Character } from '$lib/types/data/Character';
	import { mdiArrowLeft, mdiStar } from '@mdi/js';
	import S3Service from '$lib/services/s3';
	import Text from '$lib/components/typography/Text.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import CharacterBuilds from '$lib/components/ui/builds/character-builds.svelte';
	import defaultBuilds from '$lib/components/ui/builds/defaultBuilds.json';
	import CharacterTabs from '$lib/components/ui/character-tabs/character-tabs.svelte';

	/** @type {import('../../../../.svelte-kit/types/src/routes').PageData} */
	export let data: {
		character: CharacterKey;
		characterData: Character;
	};

	const card = S3Service.getCharacter(data.character).gachaCard;
	const splash = S3Service.getCharacter(data.character).gachaSplash;

	function goBack() {
		history.back();
	}
</script>

<main class="flex-col w-full h-min">
	<section
		class="grid grid-cols-1 gap-4 p-6 box-content lg:h-max lg:min-h-[40vh] lg:grid-cols-[14rem_1fr] lg:grid-flow-dense lg:grid-rows-[auto_minmax(0,1fr)]"
	>
		<div class="flex items-center gap-2 lg:col-start-2">
			<Button class="lg:hidden" on:click={goBack} variant="ghost" size="icon">
				<Icon class="fill-primary" path={mdiArrowLeft} />
			</Button>
			<Text class="text-primary" type="h1">{data.characterData.name}</Text>
		</div>

		<Card class="p-0 sm:p-0 relative lg:w-full lg:row-span-full lg:h-full">
			<img
				class="aspect-auto w-full rounded-lg object-contain object-center lg:hidden"
				src={splash}
				alt="{data.characterData.name} Gacha Splash"
			/>
			<img
				class="hidden w-auto rounded-lg object-cover object-center lg:block"
				src={card}
				alt="{data.characterData.name} Gacha Card"
			/>
			<div class="flex w-full justify-center absolute bottom-3 left-0">
				{#each { length: data.characterData.rarity } as _}
					<Icon
						path={mdiStar}
						class={data.characterData.rarity === 5 ? 'fill-fivestar' : 'fill-fourstar'}
					/>
				{/each}
			</div>
		</Card>

		<div class="flex flex-col gap-2 lg:row-start-2 lg:h-full">
			<span class="font-bold">
				{data.characterData.element} • {data.characterData.weaponType}
			</span>
			<div class="flex flex-row w-full gap-2 lg:row-start-3">
				{#each defaultBuilds as build}
					<Badge class="rounded bg-tertiary h-min p-2" variant="default"
						>{build.name}</Badge
					>
				{/each}
			</div>
			<!--Badges-->
			<Text class="w-full lg:row-start-4" type="p">{data.characterData.description}</Text>

			<CharacterTabs characterData={data.characterData} />
		</div>
		<!--Text Column-->
	</section>
	<!--Basic Character Details-->

	<section class="flex flex-col w-full gap-4 p-6 box-border">
		<span class="flex justify-between">
			<Text type="h2">Builds</Text>
			<Button href="https://keqingmains.com/{data.character.toLocaleLowerCase()}"
				>View on KQM</Button
			>
		</span>
		<CharacterBuilds builds={defaultBuilds} />
	</section>
</main>
