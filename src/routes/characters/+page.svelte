<script lang="ts">
	import IconButton from '$lib/components/ui/icon-button/IconButton.svelte';
	import { mdiFilterOutline, mdiSort, mdiViewGrid, mdiViewList } from '@mdi/js';
	import CharCard from '$lib/components/ui/card/CharCard.svelte';
	import Searchbar from '$lib/components/ui/searchbar/Searchbar.svelte';
	import S3Service from '$lib/services/s3';
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import type { WeaponTypes } from '$lib/types/weapon';
	import type { Elements } from '$lib/types/elements';
	import { dataIndexStore } from '$lib/store/index_store';
	import i18n from '$lib/services/i18n';
	import { userProfile } from '$lib/store/user_profile';
	import { get } from 'svelte/store';

	let view = true;
	let charData: {
		link: string;
		name: string;
		element: Elements;
		weapon: WeaponTypes;
		img: string;
		rarity: number;
		obtained: boolean;
	}[] = [];

	const userCharData = $userProfile.characters;

	charData = Object.keys($dataIndexStore.character).map((key) => {
		const index = get(dataIndexStore).character[key];

		return {
			obtained: userCharData !== undefined ? Object.keys(userCharData).includes(key) : false,
			link: '/characters/' + key,
			name: index.name,
			element: 'geo',
			weapon: 'bow',
			img: S3Service.getCharacter(key).icon,
			rarity: index.rarity
		};
	});

	const toggleViewType = () => {
		view = !view;
	};
</script>

<DefaultLayout title={$i18n.t('characters.overview.title')}>
	<svelte:fragment slot="titlebarActions">
		<Searchbar searchGroup="Characters" searchableDataList={charData} />
		<IconButton icon={mdiSort}>{$i18n.t('action.sort_by')}</IconButton>
		<IconButton icon={mdiFilterOutline}>{$i18n.t('action.filter_by')}</IconButton>
		<IconButton icon={view ? mdiViewList : mdiViewGrid} on:click={toggleViewType} />
	</svelte:fragment>
	<div class="flex flex-wrap gap-4 justify-center">
		{#each charData as character}
			<CharCard
				link={character.link}
				name={character.name}
				img={character.img}
				level={0}
				constellation={0}
				element={character.element}
				weapon={character.weapon}
				rarity={character.rarity}
				obtained={character.obtained}
			/>
		{/each}
	</div>
</DefaultLayout>
