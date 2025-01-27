<script lang="ts">
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
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import { goto } from '$app/navigation';
	import i18n from '$lib/services/i18n';
	import type { PageData } from './$types';

	export let data: PageData;

	$: fetchCharacterData = data.backend.data.fetchCharacterData($i18n.language, data.characterKey);

	const card = S3Service.getCharacter(data.characterKey).gachaCard;
	const splash = S3Service.getCharacter(data.characterKey).gachaSplash;

	const goBack = () => {
		goto('/characters');
	};
</script>

<DefaultLayout isLoading={$fetchCharacterData.status === 'pending'}>
	{#if $fetchCharacterData.status === 'success'}
		<section
			class="grid grid-cols-1 gap-4 box-content lg:h-max lg:min-h-[40vh] lg:grid-cols-[14rem_1fr] lg:grid-flow-dense lg:grid-rows-[auto_minmax(0,1fr)]"
		>
			<div class="flex items-center gap-2 lg:col-start-2">
				<Button class="" on:click={goBack} variant="ghost" size="icon">
					<Icon class="fill-primary" path={mdiArrowLeft} />
				</Button>
				<Text class="text-primary" type="h1">{$fetchCharacterData.data.name}</Text>
			</div>

			<Card class="p-0 sm:p-0 relative lg:w-full lg:row-span-full lg:h-full">
				<img
					class="aspect-auto w-full rounded-lg object-contain object-center lg:hidden"
					src={splash}
					alt="{$fetchCharacterData.data.name} Gacha Splash"
				/>
				<img
					class="hidden w-auto rounded-lg object-cover object-center lg:block"
					src={card}
					alt="{$fetchCharacterData.data.name} Gacha Card"
				/>
				<div class="flex w-full justify-center absolute bottom-3 left-0">
					{#each { length: $fetchCharacterData.data.rarity } as _}
						<Icon
							path={mdiStar}
							class={$fetchCharacterData.data.rarity === 5
								? 'fill-fivestar'
								: 'fill-fourstar'}
						/>
					{/each}
				</div>
			</Card>

			<div class="flex flex-col gap-2 lg:row-start-2 lg:h-full">
				<span class="font-bold">
					{$fetchCharacterData.data.element} • {$fetchCharacterData.data.weaponType}
				</span>
				<div class="flex flex-row w-full gap-2 lg:row-start-3">
					{#each defaultBuilds as build}
						<Badge class="rounded bg-tertiary h-min p-2" variant="default">
							{build.name}
						</Badge>
					{/each}
				</div>
				<!--Badges-->
				<Text class="w-full lg:row-start-4" type="p">
					{$fetchCharacterData.data.description}
				</Text>

				<CharacterTabs characterData={$fetchCharacterData.data} />
			</div>
			<!--Text Column-->
		</section>
		<!--Basic Character Details-->

		<section class="flex flex-col w-full gap-4 box-border">
			<span class="flex justify-between">
				<Text type="h2">{$i18n.t('characters.detailed.category.builds.title')}</Text>
				<Button
					href="https://keqingmains.com/{$fetchCharacterData.data.name.toLocaleLowerCase()}"
				>
					{$i18n.t('characters.detailed.category.builds.view_on_kqm_button')}
				</Button>
			</span>
			<CharacterBuilds builds={defaultBuilds} />
		</section>
	{/if}
</DefaultLayout>
