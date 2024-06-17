<script lang="ts">
	import IconButton from '$lib/components/ui/icon-button/IconButton.svelte';
	import { mdiFilter, mdiFilterOutline, mdiSortAscending, mdiSortDescending } from '@mdi/js';
	import CharCard from '$lib/components/ui/card/CharCard.svelte';
	import Searchbar from '$lib/components/ui/searchbar/Searchbar.svelte';
	import S3Service from '$lib/services/s3';
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import { dataIndexStore } from '$lib/store/index_store';
	import i18n from '$lib/services/i18n';
	import { userProfile } from '$lib/store/user_profile';
	import { derived, get, writable } from 'svelte/store';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuGroup,
		DropdownMenuItem,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu/index';
	import {
		DropdownMenuLabel,
		DropdownMenuSeparator
	} from '$lib/components/ui/dropdown-menu/index.js';
	import type { WeaponTypes } from '$lib/types/weapon';
	import type { Elements } from '$lib/types/elements';

	type Sorts = 'name' | 'date' | 'constellation';
	type Filters = 'element' | 'weapon' | 'rarity' | 'owned';

	$: sortStore = writable<{ sortFn: Sorts; order: 'asc' | 'desc' }>({
		sortFn: 'name',
		order: 'asc'
	});

	$: filterStore = writable<{ filterFn: Filters; value: any }[]>([]);

	$: transformedCharacterStore = derived(
		[userProfile, dataIndexStore, sortStore, filterStore],
		(stores) => {
			return Object.keys(stores[1].character)
				.map<{
					obtained: boolean;
					link: string;
					name: string;
					element: Elements;
					weapon: WeaponTypes;
					img: string;
					rarity: number;
				}>((key) => {
					const index = stores[1].character[key];

					return {
						obtained:
							stores[0].characters !== undefined
								? Object.keys(stores[0].characters).includes(key)
								: false,
						link: '/characters/' + key,
						name: index.name,
						element: 'geo',
						weapon: 'bow',
						img: S3Service.getCharacter(key).icon,
						rarity: index.rarity
					};
				})
				.sort((a, b) => {
					switch (stores[2].sortFn) {
						case 'constellation':
						case 'date':
						case 'name':
							if (a.name < b.name) {
								return stores[2].order === 'asc' ? -1 : 1;
							}
							if (a.name > b.name) {
								return stores[2].order === 'asc' ? 1 : -1;
							}
					}

					return 0;
				})
				.filter((a) => {
					for (let filter of stores[3]) {
						if (filter.filterFn === 'element') {
							if (a.element !== filter.value) {
								return false;
							}
						}
						if (filter.filterFn === 'weapon') {
							if (a.weapon !== filter.value) {
								return false;
							}
						}
						if (filter.filterFn === 'rarity') {
							if (a.rarity !== filter.value) {
								return false;
							}
						}
						if (filter.filterFn === 'owned') {
							if (a.obtained !== filter.value) {
								return false;
							}
						}
					}

					return true;
				});
		}
	);

	const setSortStore = (sort: Sorts) => {
		const a = get(sortStore);

		if (a.sortFn === sort) {
			sortStore.set({ sortFn: sort, order: a.order === 'asc' ? 'desc' : 'asc' });
		} else {
			sortStore.set({ sortFn: sort, order: 'asc' });
		}
	};

	const setFilterStore = (filter: Filters, value: any) => {
		const a = get(filterStore);
		let isIncluded = false;

		for (let b of a) {
			if (b.filterFn === filter) {
				isIncluded = true;
				break;
			}
		}

		if (isIncluded) {
			filterStore.set([...a.filter((b) => b.filterFn !== filter)]);
		} else {
			filterStore.set([...a, { filterFn: filter, value }]);
		}

		console.log(get(filterStore));
	};
</script>

<DefaultLayout title={$i18n.t('characters.overview.title')}>
	<svelte:fragment slot="titlebarActions">
		<Searchbar searchGroup="Characters" searchableDataList={$transformedCharacterStore} />
		<DropdownMenu>
			<DropdownMenuTrigger>
				<IconButton
					icon={$sortStore.order === 'asc' ? mdiSortAscending : mdiSortDescending}
				>
					{$i18n.t('action.sort_by', { sortFN: $sortStore.sortFn })}
				</IconButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem on:click={() => setSortStore('name')}>Name</DropdownMenuItem>
				<DropdownMenuItem on:click={() => setSortStore('date')}>Date</DropdownMenuItem>
				<DropdownMenuItem on:click={() => setSortStore('constellation')}>
					Constellation
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
		<DropdownMenu>
			<DropdownMenuTrigger>
				<IconButton icon={$filterStore.length === 0 ? mdiFilterOutline : mdiFilter}>
					{$i18n.t('action.filter_by')}
				</IconButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuGroup>
					<DropdownMenuLabel>Element</DropdownMenuLabel>

					<DropdownMenuItem on:click={() => setFilterStore('element', 'pyro')}>
						Pyro
					</DropdownMenuItem>
					<DropdownMenuItem on:click={() => setFilterStore('element', 'hydro')}>
						Hydro
					</DropdownMenuItem>
					<DropdownMenuItem on:click={() => setFilterStore('element', 'anemo')}>
						Anemo
					</DropdownMenuItem>
					<DropdownMenuItem on:click={() => setFilterStore('element', 'electro')}>
						Electro
					</DropdownMenuItem>
					<DropdownMenuItem on:click={() => setFilterStore('element', 'dendro')}>
						Dendro
					</DropdownMenuItem>
					<DropdownMenuItem on:click={() => setFilterStore('element', 'cryo')}>
						Cryo
					</DropdownMenuItem>
					<DropdownMenuItem on:click={() => setFilterStore('element', 'geo')}>
						Geo
					</DropdownMenuItem>

					<DropdownMenuSeparator />
				</DropdownMenuGroup>
				<DropdownMenuGroup>
					<DropdownMenuLabel>Weapon</DropdownMenuLabel>

					<DropdownMenuItem on:click={() => setFilterStore('weapon', 'sword')}>
						Sword
					</DropdownMenuItem>
					<DropdownMenuItem on:click={() => setFilterStore('weapon', 'claymore')}>
						Claymore
					</DropdownMenuItem>
					<DropdownMenuItem on:click={() => setFilterStore('weapon', 'polearm')}>
						Polearm
					</DropdownMenuItem>
					<DropdownMenuItem on:click={() => setFilterStore('weapon', 'catalyst')}>
						Catalyst
					</DropdownMenuItem>
					<DropdownMenuItem on:click={() => setFilterStore('weapon', 'bow')}>
						Bow
					</DropdownMenuItem>

					<DropdownMenuSeparator />
				</DropdownMenuGroup>
				<DropdownMenuGroup>
					<DropdownMenuLabel>Rarity</DropdownMenuLabel>

					<DropdownMenuItem on:click={() => setFilterStore('rarity', 5)}>
						5
					</DropdownMenuItem>
					<DropdownMenuItem on:click={() => setFilterStore('rarity', 4)}>
						4
					</DropdownMenuItem>

					<DropdownMenuSeparator />
				</DropdownMenuGroup>
				<DropdownMenuGroup>
					<DropdownMenuLabel>Owned</DropdownMenuLabel>

					<DropdownMenuItem on:click={() => setFilterStore('owned', true)}>
						Yes
					</DropdownMenuItem>
					<DropdownMenuItem on:click={() => setFilterStore('owned', false)}>
						No
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	</svelte:fragment>
	<div class="flex flex-wrap gap-4 justify-center">
		{#each $transformedCharacterStore as character}
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
