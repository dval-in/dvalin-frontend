<script lang="ts">
	import IconButton from '$lib/components/ui/icon-button/IconButton.svelte';
	import { mdiFilterOutline, mdiSort, mdiViewList, mdiViewGrid } from '@mdi/js';
	import CharCard from '$lib/components/ui/card/CharCard.svelte';
	import Searchbar from '$lib/components/ui/searchbar/Searchbar.svelte';
	import S3Service from '$lib/services/s3';
	import { applicationState } from '$lib/store/global_state';
	import { type CharacterKey, isCharacterKey } from '$lib/types/keys/CharacterKey';
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import type { WeaponTypes } from '$lib/types/weapon';
	import type { Elements } from '$lib/types/elements';
	import type { WeaponIndex } from '$lib/types/index/weapon';

	/** @type {import('../../../../.svelte-kit/types/src/routes').PageData} */
	export let data: {
		index: WeaponIndex;
	};

	let view = true;
	let charData: {
		link: string;
		name: CharacterKey;
		element: Elements;
		weapon: WeaponTypes;
		img: string;
		rarity: number;
	}[] = [];

	if ($applicationState.characters !== undefined) {
		charData = Object.keys($applicationState.characters)
			.filter((key: string) => isCharacterKey(key))
			.map((key: CharacterKey) => {
				const index = data.index[key];

				return {
					link: '/characters/' + key.toLowerCase(),
					name: index.name,
					element: 'geo',
					weapon: 'bow',
					img: S3Service.getCharacterLink(key) + '/icon.webp',
					rarity: index.rarity
				};
			});
	}

	const toggleViewType = () => {
		view = !view;
	};
</script>

<DefaultLayout title="Characters">
	<svelte:fragment slot="titlebarActions">
		<Searchbar searchGroup="Characters" searchableDataList={charData} />
		<IconButton icon={mdiSort}>Sort By</IconButton>
		<IconButton icon={mdiFilterOutline}>Filter By</IconButton>
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
			/>
		{/each}
	</div>
</DefaultLayout>
