<script lang="ts">
	import IconButton from '$lib/components/ui/icon-button/IconButton.svelte';
	import {
		mdiAlphabetical,
		mdiBookOpenPageVariant,
		mdiBowArrow,
		mdiCalendar,
		mdiCreation,
		mdiFilter,
		mdiFilterOutline,
		mdiFilterRemove,
		mdiSortAscending,
		mdiSortDescending,
		mdiSpear,
		mdiStar,
		mdiSword,
		mdiSwordCross,
		mdiTagCheck,
		mdiTagHidden
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
		DropdownMenuGroup,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuSeparator
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
	import { Toggle } from '$lib/components/ui/toggle';
	import DrawerDropdown from '$lib/components/ui/drawer-dropdown/DrawerDropdown.svelte';
	import { DrawerClose } from '$lib/components/ui/drawer';
	import Text from '$lib/components/typography/Text.svelte';

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
		{ name: 'sword', icon: mdiSwordCross, label: 'Sword' },
		{ name: 'claymore', icon: mdiSword, label: 'Claymore' },
		{ name: 'polearm', icon: mdiSpear, label: 'Polearm' },
		{ name: 'catalyst', icon: mdiBookOpenPageVariant, label: 'Catalyst' },
		{ name: 'bow', icon: mdiBowArrow, label: 'Bow' }
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
		<DrawerDropdown>
			<svelte:fragment slot="trigger">
				<IconButton
					icon={$sortStore.order === 'asc' ? mdiSortAscending : mdiSortDescending}
					class={`flex w-full`}
				>
					{$i18n.t('action.sort_by', { sortFN: $sortStore.sortFn })}
				</IconButton>
			</svelte:fragment>
			<svelte:fragment slot="dropdown-content">
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
			</svelte:fragment>
			<svelte:fragment slot="drawer-content">
				<DrawerClose
					class="flex hover:bg-tertiary gap-2"
					on:click={() => setSortStore('Name')}
				>
					<Icon path={mdiAlphabetical} /> Name
				</DrawerClose>
				<DrawerClose
					class="flex hover:bg-tertiary gap-2"
					on:click={() => setSortStore('Date')}
				>
					<Icon path={mdiCalendar} /> Date
				</DrawerClose>
				<DrawerClose
					class="flex hover:bg-tertiary gap-2"
					on:click={() => setSortStore('Rarity')}
				>
					<Icon path={mdiStar} /> Rarity
				</DrawerClose>
				<DrawerClose
					class="flex hover:bg-tertiary gap-2"
					on:click={() => setSortStore('Constellation')}
				>
					<Icon path={mdiCreation} /> Constellation
				</DrawerClose>
			</svelte:fragment>
		</DrawerDropdown>

		<DrawerDropdown closeOnItemClick={false}>
			<svelte:fragment slot="trigger">
				<IconButton
					icon={$filterStore.length === 0 ? mdiFilterOutline : mdiFilter}
					class={`flex w-full`}
				>
					{$i18n.t('action.filter_by')}
				</IconButton>
			</svelte:fragment>
			<svelte:fragment slot="dropdown-content">
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
				<DropdownMenuGroup class="flex flex-wrap">
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
							>
								<img src={icon} alt={label} class="size-7" />
							</Toggle>
						</DropdownMenuItem>
					{/each}
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<DropdownMenuGroup class="flex">
					<DropdownMenuLabel>Weapon</DropdownMenuLabel>
				</DropdownMenuGroup>
				<DropdownMenuGroup class="flex flex-wrap">
					{#each weapons as { name, icon }}
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
							>
								<Icon path={icon} class={`!size-7`} />
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
						>
							<Icon path={mdiStar} class={`!size-7 !fill-staticFivestar`} />
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
						>
							<Icon path={mdiStar} class={`!size-7 !fill-fourstar`} />
						</Toggle>
					</DropdownMenuItem>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<DropdownMenuGroup class="flex">
					<DropdownMenuLabel>Ownership</DropdownMenuLabel>
				</DropdownMenuGroup>
				<DropdownMenuGroup class="flex">
					<DropdownMenuItem
						on:click={() => {
							setFilterStore('owned', true);
							toggleChecked('owned');
						}}
						class="gap-2"
					>
						<Toggle
							class="py-2"
							pressed={$checkedStore['owned'] !== undefined
								? $checkedStore['owned']
								: false}
						>
							<Icon path={mdiTagCheck} class="!size-7" />
						</Toggle>
					</DropdownMenuItem>
					<DropdownMenuItem
						on:click={() => {
							setFilterStore('owned', false);
							toggleChecked('notowned');
						}}
						class="gap-2"
					>
						<Toggle
							class="py-2"
							pressed={$checkedStore['notowned'] !== undefined
								? $checkedStore['notowned']
								: false}
						>
							<Icon path={mdiTagHidden} class="!size-7" />
						</Toggle>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</svelte:fragment>
			<svelte:fragment slot="drawer-content">
				<div class="flex flex-col gap-3 py-3">
					<IconButton
						icon={mdiFilterRemove}
						class={`flex flex-1`}
						disabled={$filterStore.length === 0}
						on:click={() => resetFilters()}
					>
						Reset Filters
					</IconButton>

					<div>
						<div class="flex">
							<Text type="small">Element</Text>
						</div>
						<div class="flex flex-wrap gap-2">
							{#each elements as { name, icon, label }}
								<div
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
									>
										<img src={icon} alt={label} class="size-7" />
									</Toggle>
								</div>
							{/each}
						</div>
					</div>

					<div>
						<div class="flex">
							<Text type="small">Weapon</Text>
						</div>
						<div class="flex flex-wrap gap-2">
							{#each weapons as { name, icon }}
								<div
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
									>
										<Icon path={icon} class={`!size-7`} />
									</Toggle>
								</div>
							{/each}
						</div>
					</div>

					<div>
						<div class="flex">
							<Text type="small">Rarity</Text>
						</div>
						<div class="flex gap-2">
							<div
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
								>
									<Icon path={mdiStar} class={`!size-7 !fill-staticFivestar`} />
								</Toggle>
							</div>
							<div
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
								>
									<Icon path={mdiStar} class={`!size-7 !fill-fourstar`} />
								</Toggle>
							</div>
						</div>
					</div>

					<div>
						<div class="flex">
							<Text type="small">Ownership</Text>
						</div>
						<div class="flex gap-2">
							<div
								on:click={() => {
									setFilterStore('owned', true);
									toggleChecked('owned');
								}}
							>
								<Toggle
									class="py-2"
									pressed={$checkedStore['owned'] !== undefined
										? $checkedStore['owned']
										: false}
								>
									<Icon path={mdiTagCheck} class="size-7" />
								</Toggle>
							</div>
							<div
								on:click={() => {
									setFilterStore('owned', false);
									toggleChecked('notowned');
								}}
								class="gap-2"
							>
								<Toggle
									class="py-2"
									pressed={$checkedStore['notowned'] !== undefined
										? $checkedStore['notowned']
										: false}
								>
									<Icon path={mdiTagHidden} class="!size-7" />
								</Toggle>
							</div>
						</div>
					</div>
				</div>
			</svelte:fragment>
		</DrawerDropdown>
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
