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
		DropdownMenuTrigger,
		DropdownMenuLabel,
		DropdownMenuSeparator
	} from '$lib/components/ui/dropdown-menu/index';
	import type { WeaponTypes } from '$lib/types/weapon';
	import type { Elements } from '$lib/types/elements';

	type Sorts = 'name' | 'date' | 'constellation';
	type Filters = 'element' | 'weapon' | 'rarity' | 'owned';

	// Stores for sorting and filtering
	const sortStore = writable<{ sortFn: Sorts; order: 'asc' | 'desc' }>({
		sortFn: 'name',
		order: 'asc'
	});
	const filterStore = writable<{ filterFn: Filters; value: any }[]>([]);

	// Helper functions
	const isFilterActive = (filter: Filters, value: any) => {
		const currentFilters = get(filterStore);
		return currentFilters.some((f) => f.filterFn === filter && f.value === value);
	};

	const transformIntoElements = (element: string): Elements => {
		switch (element) {
			case 'Pyro':
				return 'pyro';
			case 'Hydro':
				return 'hydro';
			case 'Anemo':
				return 'anemo';
			case 'Electro':
				return 'electro';
			case 'Dendro':
				return 'dendro';
			case 'Cryo':
				return 'cryo';
			case 'Geo':
				return 'geo';
			default:
				return 'anemo';
		}
	};

	const transformIntoWeapons = (weapon: string): WeaponTypes => {
		switch (weapon) {
			case 'Sword':
				return 'sword';
			case 'Claymore':
				return 'claymore';
			case 'Polearm':
				return 'polearm';
			case 'Catalyst':
				return 'catalyst';
			case 'Bow':
				return 'bow';
			default:
				return 'sword';
		}
	};

	// Derived store to transform character data based on sorting and filtering
	const transformedCharacterStore = derived(
		[userProfile, dataIndexStore, sortStore, filterStore],
		([userProfile, dataIndexStore, sortStore, filterStore]) => {
			const characters = Object.keys(dataIndexStore.character).map((key) => {
				const character = dataIndexStore.character[key];
				const obtained = userProfile.characters
					? Object.keys(userProfile.characters).includes(key)
					: false;

				return {
					obtained,
					link: `/characters/${key}`,
					name: character.name,
					element: transformIntoElements(character.element),
					weapon: transformIntoWeapons(character.weaponType),
					img: S3Service.getCharacter(key).icon,
					rarity: character.rarity
				};
			});

			const filterGroups = filterStore.reduce(
				(groups, filter) => {
					if (!groups[filter.filterFn]) {
						groups[filter.filterFn] = new Set();
					}
					groups[filter.filterFn].add(filter.value);
					return groups;
				},
				{} as Record<Filters, Set<any>>
			);

			const filteredCharacters = characters.filter((character) => {
				for (const [filterFn, values] of Object.entries(filterGroups)) {
					if (filterFn === 'element' && !values.has(character.element)) {
						return false;
					}
					if (filterFn === 'weapon' && !values.has(character.weapon)) {
						return false;
					}
					if (filterFn === 'rarity' && !values.has(character.rarity)) {
						return false;
					}
					if (filterFn === 'owned' && !values.has(character.obtained)) {
						return false;
					}
				}
				return true;
			});

			return filteredCharacters.sort((a, b) => {
				if (sortStore.sortFn === 'name') {
					return sortStore.order === 'asc'
						? a.name.localeCompare(b.name)
						: b.name.localeCompare(a.name);
				}
				// Implement other sorting criteria as needed
				return 0;
			});
		}
	);

	// Function to set sorting criteria
	const setSortStore = (sort: Sorts) => {
		const currentSort = get(sortStore);
		if (currentSort.sortFn === sort) {
			sortStore.set({ sortFn: sort, order: currentSort.order === 'asc' ? 'desc' : 'asc' });
		} else {
			sortStore.set({ sortFn: sort, order: 'asc' });
		}
	};

	// Function to set filtering criteria
	const setFilterStore = (filter: Filters, value: any) => {
		const currentFilters = get(filterStore);
		const existingFilter = currentFilters.find(
			(f) => f.filterFn === filter && f.value === value
		);
		if (existingFilter) {
			filterStore.set(
				currentFilters.filter((f) => f.filterFn !== filter || f.value !== value)
			);
		} else {
			filterStore.set([...currentFilters, { filterFn: filter, value }]);
		}
	};

	const resetFilters = () => {
		filterStore.set([]);
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
					<DropdownMenuItem on:click={() => resetFilters()}>
						Reset Filters
					</DropdownMenuItem>
					<DropdownMenuLabel>Element</DropdownMenuLabel>
					<DropdownMenuItem
						on:click={() => setFilterStore('element', 'pyro')}
						checked={isFilterActive('element', 'pyro')}
					>
						Pyro
					</DropdownMenuItem>
					<DropdownMenuItem
						on:click={() => setFilterStore('element', 'hydro')}
						checked={isFilterActive('element', 'hydro')}
					>
						Hydro
					</DropdownMenuItem>
					<DropdownMenuItem
						on:click={() => setFilterStore('element', 'anemo')}
						checked={isFilterActive('element', 'anemo')}
					>
						Anemo
					</DropdownMenuItem>
					<DropdownMenuItem
						on:click={() => setFilterStore('element', 'electro')}
						checked={isFilterActive('element', 'electro')}
					>
						Electro
					</DropdownMenuItem>
					<DropdownMenuItem
						on:click={() => setFilterStore('element', 'dendro')}
						checked={isFilterActive('element', 'dendro')}
					>
						Dendro
					</DropdownMenuItem>
					<DropdownMenuItem
						on:click={() => setFilterStore('element', 'cryo')}
						checked={isFilterActive('element', 'cryo')}
					>
						Cryo
					</DropdownMenuItem>
					<DropdownMenuItem
						on:click={() => setFilterStore('element', 'geo')}
						checked={isFilterActive('element', 'geo')}
					>
						Geo
					</DropdownMenuItem>
					<DropdownMenuSeparator />
				</DropdownMenuGroup>
				<DropdownMenuGroup>
					<DropdownMenuLabel>Weapon</DropdownMenuLabel>
					<DropdownMenuItem
						on:click={() => setFilterStore('weapon', 'sword')}
						checked={isFilterActive('weapon', 'sword')}
					>
						Sword
					</DropdownMenuItem>
					<DropdownMenuItem
						on:click={() => setFilterStore('weapon', 'claymore')}
						checked={isFilterActive('weapon', 'claymore')}
					>
						Claymore
					</DropdownMenuItem>
					<DropdownMenuItem
						on:click={() => setFilterStore('weapon', 'polearm')}
						checked={isFilterActive('weapon', 'polearm')}
					>
						Polearm
					</DropdownMenuItem>
					<DropdownMenuItem
						on:click={() => setFilterStore('weapon', 'catalyst')}
						checked={isFilterActive('weapon', 'catalyst')}
					>
						Catalyst
					</DropdownMenuItem>
					<DropdownMenuItem
						on:click={() => setFilterStore('weapon', 'bow')}
						checked={isFilterActive('weapon', 'bow')}
					>
						Bow
					</DropdownMenuItem>
					<DropdownMenuSeparator />
				</DropdownMenuGroup>
				<DropdownMenuGroup>
					<DropdownMenuLabel>Rarity</DropdownMenuLabel>
					<DropdownMenuItem
						on:click={() => setFilterStore('rarity', 5)}
						checked={isFilterActive('rarity', 5)}
					>
						5
					</DropdownMenuItem>
					<DropdownMenuItem
						on:click={() => setFilterStore('rarity', 4)}
						checked={isFilterActive('rarity', 4)}
					>
						4
					</DropdownMenuItem>
					<DropdownMenuSeparator />
				</DropdownMenuGroup>
				<DropdownMenuGroup>
					<DropdownMenuLabel>Owned</DropdownMenuLabel>
					<DropdownMenuItem
						on:click={() => setFilterStore('owned', true)}
						checked={isFilterActive('owned', true)}
					>
						Yes
					</DropdownMenuItem>
					<DropdownMenuItem
						on:click={() => setFilterStore('owned', false)}
						checked={isFilterActive('owned', false)}
					>
						No
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
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
