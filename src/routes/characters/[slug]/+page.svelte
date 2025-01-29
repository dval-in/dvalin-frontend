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
	import type { PageData } from '../../../../.svelte-kit/types/src/routes/characters/[slug]/$types';

	/** @type {import('../../../../.svelte-kit/types/src/routes/characters/[slug]').PageData} */
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
			class="box-content grid grid-cols-1 gap-4 lg:h-max lg:min-h-[40vh] lg:grid-flow-dense lg:grid-cols-[14rem_1fr] lg:grid-rows-[auto_minmax(0,1fr)]"
		>
			<div class="flex items-center gap-2 lg:col-start-2">
				<Button class="" on:click={goBack} variant="ghost" size="icon">
					<Icon class="fill-primary" path={mdiArrowLeft} />
				</Button>
				<Text class="text-primary" type="h1">{$fetchCharacterData.data.name}</Text>
			</div>

			<Card class="relative p-0 sm:p-0 lg:row-span-full lg:h-full lg:w-full">
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
				<div class="absolute bottom-3 left-0 flex w-full justify-center">
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
				<div class="flex w-full flex-row gap-2 lg:row-start-3">
					{#each defaultBuilds as build}
						<Badge class="bg-tertiary h-min rounded-sm p-2" variant="default">
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

		<section class="box-border flex w-full flex-col gap-4">
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
