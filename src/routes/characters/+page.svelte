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
	import { dataIndex } from '$lib/store/index_store';
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
		{ name: 'pyro', icon: IconPyro, label: $i18n.t('element.pyro'), color: '#ff6640' },
		{ name: 'hydro', icon: IconHydro, label: $i18n.t('element.hydro'), color: '#00c0ff' },
		{ name: 'anemo', icon: IconAnemo, label: $i18n.t('element.anemo'), color: '#32d7a0' },
		{ name: 'electro', icon: IconElectro, label: $i18n.t('element.electro'), color: '#cc80ff' },
		{ name: 'dendro', icon: IconDendro, label: $i18n.t('element.dendro'), color: '#90cc00' },
		{ name: 'cryo', icon: IconCryo, label: $i18n.t('element.cryo'), color: '#81fffe' },
		{ name: 'geo', icon: IconGeo, label: $i18n.t('element.geo'), color: '#ffac00' }
	];

	const weapons = [
		{ name: 'sword', icon: mdiSwordCross, label: $i18n.t('weapon.sword') },
		{ name: 'claymore', icon: mdiSword, label: $i18n.t('weapon.claymore') },
		{ name: 'polearm', icon: mdiSpear, label: $i18n.t('weapon.polearm') },
		{ name: 'catalyst', icon: mdiBookOpenPageVariant, label: $i18n.t('weapon.catalyst') },
		{ name: 'bow', icon: mdiBowArrow, label: $i18n.t('weapon.bow') }
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
		[userProfile, dataIndex],
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
					{$i18n.t('action.sort_by', {
						sortFN: $i18n.t(`sort.${$sortStore.sortFn.toLowerCase()}`)
					})}
				</IconButton>
			</svelte:fragment>
			<svelte:fragment slot="dropdown-content">
				<DropdownMenuItem
					class="flex hover:bg-tertiary gap-2"
					on:click={() => setSortStore('Name')}
				>
					<Icon path={mdiAlphabetical} />
					{$i18n.t('sort.name')}
				</DropdownMenuItem>
				<DropdownMenuItem
					class="flex hover:bg-tertiary gap-2"
					on:click={() => setSortStore('Date')}
				>
					<Icon path={mdiCalendar} />
					{$i18n.t('sort.date')}
				</DropdownMenuItem>
				<DropdownMenuItem
					class="flex hover:bg-tertiary gap-2"
					on:click={() => setSortStore('Rarity')}
				>
					<Icon path={mdiStar} />
					{$i18n.t('sort.rarity')}
				</DropdownMenuItem>
				<DropdownMenuItem
					class="flex hover:bg-tertiary gap-2"
					on:click={() => setSortStore('Constellation')}
				>
					<Icon path={mdiCreation} />
					{$i18n.t('sort.constellation')}
				</DropdownMenuItem>
			</svelte:fragment>
			<svelte:fragment slot="drawer-content">
				<div class="flex flex-col p-3 text-lg gap-4">
					<button
						class="flex hover:bg-tertiary gap-2"
						on:click={() => setSortStore('Name')}
					>
						<Icon path={mdiAlphabetical} />
						{$i18n.t('sort.name')}
					</button>
					<button
						class="flex hover:bg-tertiary gap-2"
						on:click={() => setSortStore('Date')}
					>
						<Icon path={mdiCalendar} />
						{$i18n.t('sort.date')}
					</button>
					<button
						class="flex hover:bg-tertiary gap-2"
						on:click={() => setSortStore('Rarity')}
					>
						<Icon path={mdiStar} />
						{$i18n.t('sort.rarity')}
					</button>
					<button
						class="flex hover:bg-tertiary gap-2"
						on:click={() => setSortStore('Constellation')}
					>
						<Icon path={mdiCreation} />
						{$i18n.t('sort.constellation')}
					</button>
				</div>
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
					{$i18n.t('action.reset_filters')}
				</IconButton>

				<DropdownMenuSeparator />
				<DropdownMenuGroup class="flex">
					<DropdownMenuLabel>{$i18n.t('filter.element')}</DropdownMenuLabel>
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
					<DropdownMenuLabel>{$i18n.t('filter.weapon')}</DropdownMenuLabel>
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
					<DropdownMenuLabel>{$i18n.t('filter.rarity')}</DropdownMenuLabel>
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

					<!-- Element filter -->
					<div>
						<div class="flex">
							<Text type="small">Element</Text>
						</div>
						<div class="flex flex-wrap gap-2" role="group" aria-label="Element filters">
							{#each elements as { name, icon, label }}
								<button
									type="button"
									class="p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
									aria-pressed={$checkedStore[name] || false}
									on:click={() => {
										setFilterStore('element', name);
										toggleChecked(name);
									}}
									on:keydown={(e) => {
										if (e.key === 'Enter' || e.key === ' ') {
											setFilterStore('element', name);
											toggleChecked(name);
										}
									}}
								>
									<Toggle pressed={$checkedStore[name] || false}>
										<img src={icon} alt={label} class="size-7" />
									</Toggle>
								</button>
							{/each}
						</div>
					</div>

					<!-- Weapon filter -->
					<div>
						<div class="flex">
							<Text type="small">Weapon</Text>
						</div>
						<div class="flex flex-wrap gap-2" role="group" aria-label="Weapon filters">
							{#each weapons as { name, icon }}
								<button
									type="button"
									class="p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
									aria-pressed={$checkedStore[name] || false}
									on:click={() => {
										setFilterStore('weapon', name);
										toggleChecked(name);
									}}
									on:keydown={(e) => {
										if (e.key === 'Enter' || e.key === ' ') {
											setFilterStore('weapon', name);
											toggleChecked(name);
										}
									}}
								>
									<Toggle pressed={$checkedStore[name] || false}>
										<Icon path={icon} class={`!size-7`} />
									</Toggle>
								</button>
							{/each}
						</div>
					</div>

					<!-- Rarity filter -->
					<div>
						<div class="flex">
							<Text type="small">Rarity</Text>
						</div>
						<div class="flex gap-2" role="group" aria-label="Rarity filters">
							<button
								type="button"
								class="p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
								aria-pressed={$checkedStore['rarity5'] || false}
								on:click={() => {
									setFilterStore('rarity', 5);
									toggleChecked('rarity5');
								}}
								on:keydown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										setFilterStore('rarity', 5);
										toggleChecked('rarity5');
									}
								}}
							>
								<Toggle pressed={$checkedStore['rarity5'] || false}>
									<Icon path={mdiStar} class={`!size-7 !fill-staticFivestar`} />
								</Toggle>
							</button>
							<button
								type="button"
								class="p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
								aria-pressed={$checkedStore['rarity4'] || false}
								on:click={() => {
									setFilterStore('rarity', 4);
									toggleChecked('rarity4');
								}}
								on:keydown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										setFilterStore('rarity', 4);
										toggleChecked('rarity4');
									}
								}}
							>
								<Toggle pressed={$checkedStore['rarity4'] || false}>
									<Icon path={mdiStar} class={`!size-7 !fill-fourstar`} />
								</Toggle>
							</button>
						</div>
					</div>

					<!-- Ownership filter -->
					<div>
						<div class="flex">
							<Text type="small">Ownership</Text>
						</div>
						<div class="flex gap-2" role="group" aria-label="Ownership filters">
							<button
								type="button"
								class="p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
								aria-pressed={$checkedStore['owned'] || false}
								on:click={() => {
									setFilterStore('owned', true);
									toggleChecked('owned');
								}}
								on:keydown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										setFilterStore('owned', true);
										toggleChecked('owned');
									}
								}}
							>
								<Toggle pressed={$checkedStore['owned'] || false}>
									<Icon path={mdiTagCheck} class="size-7" />
								</Toggle>
							</button>
							<button
								type="button"
								class="p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
								aria-pressed={$checkedStore['notowned'] || false}
								on:click={() => {
									setFilterStore('owned', false);
									toggleChecked('notowned');
								}}
								on:keydown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										setFilterStore('owned', false);
										toggleChecked('notowned');
									}
								}}
							>
								<Toggle pressed={$checkedStore['notowned'] || false}>
									<Icon path={mdiTagHidden} class="!size-7" />
								</Toggle>
							</button>
						</div>
					</div>
				</div>
			</svelte:fragment>
		</DrawerDropdown>
	</svelte:fragment>
	<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
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
