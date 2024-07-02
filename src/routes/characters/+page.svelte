<script lang="ts">
	import IconButton from '$lib/components/ui/icon-button/IconButton.svelte';
	import {
		mdiAlphabetical,
		mdiCalendar,
		mdiCreation,
		mdiFilter,
		mdiFilterOutline,
		mdiFilterRemove,
		mdiSortAscending,
		mdiSortDescending,
		mdiStar
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
		DropdownMenuLabel,
		DropdownMenuSeparator,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu/index';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import type { WeaponTypes } from '$lib/types/weapon';
	import type { Elements } from '$lib/types/elements';
	import IconAnemo from '$lib/assets/icons/elements/Element_Anemo.svg';
	import IconCryo from '$lib/assets/icons/elements/Element_Cryo.svg';
	import IconDendro from '$lib/assets/icons/elements/Element_Dendro.svg';
	import IconElectro from '$lib/assets/icons/elements/Element_Electro.svg';
	import IconGeo from '$lib/assets/icons/elements/Element_Geo.svg';
	import IconHydro from '$lib/assets/icons/elements/Element_Hydro.svg';
	import IconPyro from '$lib/assets/icons/elements/Element_Pyro.svg';
	import IconBow from '$lib/assets/icons/weapons/bow.png';
	import IconCatalyst from '$lib/assets/icons/weapons/catalyst.png';
	import IconClaymore from '$lib/assets/icons/weapons/claymore.png';
	import IconPolearm from '$lib/assets/icons/weapons/polearm.png';
	import IconSword from '$lib/assets/icons/weapons/sword.png';
	import IconGoldStar from '$lib/assets/Icon_Gold_Star.png';
	import IconPurpleStar from '$lib/assets/Icon_Purple_Star.png';
	import { Toggle } from '$lib/components/ui/toggle';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';

	type Sorts = 'Name' | 'Date' | 'Rarity' | 'Constellation';
	type Filters = 'element' | 'weapon' | 'rarity' | 'owned';

	// Stores for sorting and filtering
	const sortStore = writable<{ sortFn: Sorts; order: 'asc' | 'desc' }>({
		sortFn: 'Name',
		order: 'asc'
	});

	const filterStore = writable<{ filterFn: Filters; value: string }[]>([]);

	const elements = [
		{ name: 'pyro', icon: IconPyro, label: 'Pyro', color: '#ff6640' },
		{ name: 'hydro', icon: IconHydro, label: 'Hydro', color: '#00c0ff' },
		{ name: 'anemo', icon: IconAnemo, label: 'Anemo', color: '#32d7a0' },
		{ name: 'electro', icon: IconElectro, label: 'Electro', color: '#cc80ff' },
		{ name: 'dendro', icon: IconDendro, label: 'Dendro', color: '#90cc00' },
		{ name: 'cryo', icon: IconCryo, label: 'Cryo', color: '#81fffe' },
		{ name: 'geo', icon: IconGeo, label: 'Geo', color: '#ffac00' }
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

	const transformedCharacterStore = derived(
		[userProfile, dataIndexStore],
		([userProfile, dataIndexStore]) => {
			return Object.keys(dataIndexStore.character).map((key) => {
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
		}
	);

	// Derived store to transform character data based on sorting and filtering
	const sortedCharacterStore = derived(
		[transformedCharacterStore, sortStore, filterStore],
		([transformedCharacterStore, sortStore, filterStore]) => {
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

			const filteredCharacters = transformedCharacterStore.filter((character) => {
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
				if (sortStore.sortFn === 'Rarity') {
					return sortStore.order === 'asc' ? a.rarity - b.rarity : b.rarity - a.rarity;
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
		<Searchbar searchGroup="Characters" searchableDataList={$sortedCharacterStore} />
		<DropdownMenu closeOnEscape preventScroll={false}>
			<DropdownMenuTrigger>
				<IconButton
					icon={$sortStore.order === 'asc' ? mdiSortAscending : mdiSortDescending}
					class={`flex w-full`}
				>
					{$i18n.t('action.sort_by', { sortFN: $sortStore.sortFn })}
				</IconButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent class="p-3">
				<DropdownMenuItem
					class="flex hover:bg-tertiary gap-2"
					on:click={() => setSortStore('Name')}
				>
					<Icon path={mdiAlphabetical} /> Name
				</DropdownMenuItem>
				<DropdownMenuItem
					class="flex hover:bg-tertiary gap-2"
					on:click={() => setSortStore('Date')}
				>
					<Icon path={mdiCalendar} /> Date
				</DropdownMenuItem>
				<DropdownMenuItem
					class="flex hover:bg-tertiary gap-2"
					on:click={() => setSortStore('Rarity')}
				>
					<Icon path={mdiStar} /> Rarity
				</DropdownMenuItem>
				<DropdownMenuItem
					class="flex hover:bg-tertiary gap-2"
					on:click={() => setSortStore('Constellation')}
				>
					<Icon path={mdiCreation} /> Constellation
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>

		<DropdownMenu closeOnItemClick={false} closeOnEscape preventScroll={false}>
			<DropdownMenuTrigger>
				<IconButton
					icon={$filterStore.length === 0 ? mdiFilterOutline : mdiFilter}
					class={`flex w-full`}
				>
					{$i18n.t('action.filter_by')}
				</IconButton>
			</DropdownMenuTrigger>

			<DropdownMenuContent class="flex flex-col p-3">
				<IconButton
					icon={mdiFilterRemove}
					class={`flex flex-1`}
					disabled={$filterStore.length === 0}
					on:click={() => resetFilters()}
				>
					Reset Filters
				</IconButton>

				<DropdownMenuSeparator />

				<DropdownMenuGroup class="flex">
					<DropdownMenuLabel>Element</DropdownMenuLabel>
				</DropdownMenuGroup>
				<DropdownMenuGroup class="grid grid-cols-3 flex-wrap">
					{#each elements as { name, icon, label }}
						<DropdownMenuItem
							on:click={() => {
								setFilterStore('element', name);
								toggleChecked(name);
							}}
						>
							<Toggle
								class="py-2"
								pressed={$checkedStore[name] !== undefined
									? $checkedStore[name]
									: false}
								on:click={() => console.log($checkedStore[name])}
							>
								<img src={icon} alt={label} class="size-9" />
							</Toggle>
						</DropdownMenuItem>
					{/each}
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<DropdownMenuGroup class="flex">
					<DropdownMenuLabel>Weapon</DropdownMenuLabel>
				</DropdownMenuGroup>
				<DropdownMenuGroup class="grid grid-cols-3">
					{#each weapons as { name, icon, label }}
						<DropdownMenuItem
							on:click={() => {
								setFilterStore('weapon', name);
								toggleChecked(name);
							}}
						>
							<Toggle
								class="py-2"
								pressed={$checkedStore[name] !== undefined
									? $checkedStore[name]
									: false}
								on:click={() => console.log($checkedStore[name])}
							>
								<img src={icon} alt={label} class={`size-9 rounded-full`} />
							</Toggle>
						</DropdownMenuItem>
					{/each}
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<DropdownMenuGroup class="flex">
					<DropdownMenuLabel>Rarity</DropdownMenuLabel>
				</DropdownMenuGroup>
				<DropdownMenuGroup class="flex">
					<DropdownMenuItem
						on:click={() => {
							setFilterStore('rarity', 5);
							toggleChecked('rarity5');
						}}
					>
						<Toggle
							class="py-2"
							pressed={$checkedStore['rarity5'] !== undefined
								? $checkedStore['rarity5']
								: false}
							on:click={() => console.log($checkedStore['rarity5'])}
						>
							<img src={IconGoldStar} alt="5 Star" class={'size-8'} />
						</Toggle>
					</DropdownMenuItem>
					<DropdownMenuItem
						on:click={() => {
							setFilterStore('rarity', 4);
							toggleChecked('rarity4');
						}}
					>
						<Toggle
							class="py-2"
							pressed={$checkedStore['rarity4'] !== undefined
								? $checkedStore['rarity4']
								: false}
							on:click={() => console.log($checkedStore['rarity4'])}
						>
							<img src={IconPurpleStar} alt="4 Star" class={'size-8'} />
						</Toggle>
					</DropdownMenuItem>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<DropdownMenuGroup class="flex">
					<DropdownMenuLabel>Ownership</DropdownMenuLabel>
				</DropdownMenuGroup>
				<DropdownMenuGroup>
					<DropdownMenuItem
						on:click={() => {
							setFilterStore('owned', true);
							toggleChecked('owned');
						}}
						class="gap-2"
					>
						<Checkbox
							id="owned"
							checked={$checkedStore['owned'] !== undefined
								? $checkedStore['owned']
								: false}
						/>
						<Label id="owned-label" for="owned">Owned</Label>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	</svelte:fragment>
	<div class="flex flex-wrap gap-4 justify-center">
		{#each $sortedCharacterStore as character}
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
