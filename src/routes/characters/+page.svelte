<script lang="ts">
	import IconButton from '$lib/components/ui/icon-button/IconButton.svelte';
	import {
		mdiFilter,
		mdiFilterOutline,
		mdiSortAscending,
		mdiSortDescending,
		mdiFilterRemove
	} from '@mdi/js';
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
	import IconAnemo from '$lib/assets/Icon_Anemo_Element.png';
	import IconCryo from '$lib/assets/Icon_Cryo_Element.png';
	import IconDendro from '$lib/assets/Icon_Dendro_Element.png';
	import IconElectro from '$lib/assets/Icon_Electro_Element.png';
	import IconGeo from '$lib/assets/Icon_Geo_Element.png';
	import IconHydro from '$lib/assets/Icon_Hydro_Element.png';
	import IconPyro from '$lib/assets/Icon_Pyro_Element.png';
	import IconBow from '$lib/assets/Icon_Weapon_Bow.png';
	import IconCatalyst from '$lib/assets/Icon_Weapon_Catalyst.png';
	import IconClaymore from '$lib/assets/Icon_Weapon_Claymore.png';
	import IconPolearm from '$lib/assets/Icon_Weapon_Polearm.png';
	import IconSword from '$lib/assets/Icon_Weapon_Sword.png';
	import IconGoldStar from '$lib/assets/Icon_Gold_Star.png';
	import IconPurpleStar from '$lib/assets/Icon_Purple_Star.png';

	type Sorts = 'Name' | 'Date' | 'Constellation';
	type Filters = 'element' | 'weapon' | 'rarity' | 'owned';

	// Stores for sorting and filtering
	const sortStore = writable<{ sortFn: Sorts; order: 'asc' | 'desc' }>({
		sortFn: 'Name',
		order: 'asc'
	});

	const filterStore = writable<{ filterFn: Filters; value: string }[]>([]);

	const elements = [
		{ name: 'pyro', icon: IconPyro, label: 'Pyro' },
		{ name: 'hydro', icon: IconHydro, label: 'Hydro' },
		{ name: 'anemo', icon: IconAnemo, label: 'Anemo' },
		{ name: 'electro', icon: IconElectro, label: 'Electro' },
		{ name: 'dendro', icon: IconDendro, label: 'Dendro' },
		{ name: 'cryo', icon: IconCryo, label: 'Cryo' },
		{ name: 'geo', icon: IconGeo, label: 'Geo' }
	];

	const weapons = [
		{ name: 'sword', icon: IconSword, label: 'Sword' },
		{ name: 'claymore', icon: IconClaymore, label: 'Claymore' },
		{ name: 'polearm', icon: IconPolearm, label: 'Polearm' },
		{ name: 'catalyst', icon: IconCatalyst, label: 'Catalyst' },
		{ name: 'bow', icon: IconBow, label: 'Bow' }
	];

	const checkedStore = writable<{ [key: string]: boolean }>({});

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
				if (sortStore.sortFn === 'Name') {
					return sortStore.order === 'asc'
						? a.name.localeCompare(b.name)
						: b.name.localeCompare(a.name);
				}
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
		checkedStore.set({});
	};

	const toggleChecked = (name: string) => {
		checkedStore.update((current) => ({
			...current,
			[name]: !current[name]
		}));
	};
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
<!-- svelte-ignore a11y-label-has-associated-control -->
<DefaultLayout title={$i18n.t('characters.overview.title')}>
	<svelte:fragment slot="titlebarActions">
		<Searchbar searchGroup="Characters" searchableDataList={$transformedCharacterStore} />
		<DropdownMenu>
			<DropdownMenuTrigger>
				<IconButton
					icon={$sortStore.order === 'asc' ? mdiSortAscending : mdiSortDescending}
					class={`flex w-full`}
				>
					{$i18n.t('action.sort_by', { sortFN: $sortStore.sortFn })}
				</IconButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem
					class="flex hover:bg-primary"
					on:click={() => setSortStore('Name')}
				>
					Name
				</DropdownMenuItem>
				<DropdownMenuItem
					class="flex hover:bg-primary"
					on:click={() => setSortStore('Date')}
				>
					Date
				</DropdownMenuItem>
				<DropdownMenuItem
					class="flex hover:bg-primary"
					on:click={() => setSortStore('Constellation')}
				>
					Constellation
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>

		<DropdownMenu closeOnItemClick={false} closeOnEscape>
			<DropdownMenuTrigger>
				<IconButton
					icon={$filterStore.length === 0 ? mdiFilterOutline : mdiFilter}
					class={`flex w-full`}
				>
					{$i18n.t('action.filter_by')}
				</IconButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent class="p-4">
				<IconButton
					icon={mdiFilterRemove}
					class={`flex justify-center w-full`}
					disabled={$filterStore.length === 0}
					on:click={() => resetFilters()}
				>
					Reset Filters
				</IconButton>
				<DropdownMenuSeparator />

				<DropdownMenuGroup class="flex justify-left">
					<DropdownMenuLabel>Element</DropdownMenuLabel>
				</DropdownMenuGroup>
				<DropdownMenuGroup class="grid grid-cols-7 gap-1">
					{#each elements as { name, icon, label }}
						<DropdownMenuItem
							on:click={() => {
								setFilterStore('element', name);
								toggleChecked(name);
							}}
							class={`p-0 rounded-lg border cursor-pointer bg-tertiary text-text shadow-sm justify-center sm:p-2 gap-2 hover:border-primary ${
								$checkedStore[name] ? 'bg-primary' : ''
							}
									after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:transform after:-translate-x-1/2 after:-translate-y-1/2 after:w-9 after:aspect-square after:rounded-full after:bg-white after:blur after:opacity-0 hover:after:opacity-50 after:transition-opacity after:duration-300
								`}
						>
							<img src={icon} alt={label} class="size-10" role="button" />
						</DropdownMenuItem>
					{/each}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />

				<DropdownMenuGroup class="flex justify-left">
					<DropdownMenuLabel>Weapon</DropdownMenuLabel>
				</DropdownMenuGroup>
				<DropdownMenuGroup class="grid grid-cols-5 gap-1">
					{#each weapons as { name, icon, label }}
						<DropdownMenuItem
							on:click={() => {
								setFilterStore('weapon', name);
								toggleChecked(name);
							}}
							class={`p-0 rounded-lg border cursor-pointer bg-tertiary text-text shadow-sm justify-center sm:p-2 gap-2 hover:border-primary ${
								$checkedStore[name] ? 'bg-primary' : ''
							}
									after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:transform after:-translate-x-1/2 after:-translate-y-1/2 after:w-9 after:aspect-square after:rounded-full after:bg-white after:blur after:opacity-0 hover:after:opacity-50 after:transition-opacity after:duration-300
								`}
						>
							<img
								src={icon}
								alt={label}
								class={`size-10  ${$checkedStore[name] ? 'brightness-50' : 'brightness-150'}`}
								role="button"
							/>
						</DropdownMenuItem>
					{/each}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />

				<DropdownMenuGroup class="flex justify-left">
					<DropdownMenuLabel>Rarity</DropdownMenuLabel>
				</DropdownMenuGroup>
				<DropdownMenuGroup class="grid grid-cols-2 justify-center gap-2">
					<DropdownMenuItem
						on:click={() => {
							setFilterStore('rarity', 5);
							toggleChecked('rarity5');
						}}
						class={`p-0 rounded-lg border cursor-pointer bg-tertiary text-text shadow-sm justify-center sm:p-2 gap-2 hover:border-primary w-full ${
							$checkedStore['rarity5'] ? 'bg-primary' : ''
						}`}
					>
						<img src={IconGoldStar} alt="5 Star" class={'size-6'} role="button" />
					</DropdownMenuItem>
					<DropdownMenuItem
						on:click={() => {
							setFilterStore('rarity', 4);
							toggleChecked('rarity4');
						}}
						class={`p-0 rounded-lg border cursor-pointer bg-tertiary text-text shadow-sm justify-center sm:p-2 gap-2 hover:border-primary w-full ${
							$checkedStore['rarity4'] ? 'bg-primary' : ''
						}`}
					>
						<img src={IconPurpleStar} alt="4 Star" class={'size-6'} role="button" />
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup class="grid grid-cols-1">
					<DropdownMenuItem
						on:click={() => {
							setFilterStore('owned', true);
							toggleChecked('owned');
						}}
						class={`p-0 rounded-lg border cursor-pointer bg-tertiary text-text shadow-sm justify-center sm:p-2 gap-2 hover:border-primary w-full ${
							$checkedStore['owned'] ? 'bg-primary' : ''
						}`}
					>
						<h1 class="text-sm font-medium">Owned</h1>
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
