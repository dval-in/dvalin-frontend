<script lang="ts">
	import IconButton from '$lib/components/ui/icon-button/IconButton.svelte';
	import { mdiFilterOutline, mdiSort, mdiViewList, mdiViewGrid } from '@mdi/js';
	import CharCard from '$lib/components/ui/card/CharCard.svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import { type Elements, type Weapons } from '$lib/structs/types';
	import Searchbar from '$lib/components/ui/searchbar/Searchbar.svelte';
	import S3Service from '$lib/services/s3';

	let view = true;

	const toggleViewType = () => {
		view = !view;
	};

	let data: { link: string; name: string; element: Elements; weapon: Weapons; img: string }[] = [
		{
			link: '/characters/albedo',
			name: 'Albedo',
			element: 'geo',
			weapon: 'bow',
			img: S3Service.getCharacterLink('albedo') + '/icon.webp'
		},
		{
			link: '/characters/alhaitham',
			name: 'Alhaitham',
			element: 'dendro',
			weapon: 'sword',
			img: S3Service.getCharacterLink('alhaitham') + '/icon.webp'
		},
		{
			link: '/characters/aloy',
			name: 'Aloy',
			element: 'pyro',
			weapon: 'bow',
			img: S3Service.getCharacterLink('aloy') + '/icon.webp'
		},
		{
			link: '/characters/amber',
			name: 'Amber',
			element: 'pyro',
			weapon: 'bow',
			img: S3Service.getCharacterLink('amber') + '/icon.webp'
		},
		{
			link: '/characters/arataki-itto',
			name: 'Arataki Itto',
			element: 'geo',
			weapon: 'bow',
			img: S3Service.getCharacterLink('Arataki_Itto') + '/icon.webp'
		}
	];
</script>

<div class="flex flex-1 flex-col gap-6">
	<div class="flex flex-1 flex-wrap justify-between gap-4 items-center">
		<Text type="h1">Characters</Text>
		<div class="flex gap-2">
			<Searchbar searchGroup="Characters" searchableDataList={data} />
			<IconButton icon={mdiSort}>Sort By</IconButton>
			<IconButton icon={mdiFilterOutline}>Filter By</IconButton>
			<IconButton icon={view ? mdiViewList : mdiViewGrid} onClick={toggleViewType} />
		</div>
	</div>

	<div class="flex flex-wrap gap-4 justify-center">
		{#each data as character}
			<CharCard
				link={character.link}
				name={character.name}
				img={S3Service.getCharacterLink(character.name) + '/icon.webp'}
				level={0}
				constellation={0}
				element={character.element}
				weapon={character.weapon}
			/>
		{/each}
	</div>
</div>
