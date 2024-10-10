<script lang="ts">
	import IconButton from '$lib/components/ui/icon-button/IconButton.svelte';
	import {
		mdiAlphabetical,
		mdiBookOpenPageVariant,
		mdiBowArrow,
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
		mdiTagHidden,
		mdiNumeric
	} from '@mdi/js';
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
	import type { IWeapon, WeaponTypes } from '$lib/types/weapon';
	import { Toggle } from '$lib/components/ui/toggle';
	import DrawerDropdown from '$lib/components/ui/drawer-dropdown/DrawerDropdown.svelte';
	import { DrawerClose } from '$lib/components/ui/drawer';
	import Text from '$lib/components/typography/Text.svelte';
	import WeapCard from '$lib/components/ui/card/WeapCard.svelte';

	type Sorts = 'Name' | 'Count' | 'Rarity' | 'refinement';
	type Filters = 'element' | 'weapon' | 'rarity' | 'owned';

	// Stores for sorting and filtering
	const sortStore = writable<{ sortFn: Sorts; order: 'asc' | 'desc' }>({
		sortFn: 'Name',
		order: 'asc'
	});

	const filterStore = writable<{ filterFn: Filters; value: string }[]>([]);

	const weapons = [
		{ name: 'sword', icon: mdiSwordCross, label: $i18n.t('weapon.sword') },
		{ name: 'claymore', icon: mdiSword, label: $i18n.t('weapon.claymore') },
		{ name: 'polearm', icon: mdiSpear, label: $i18n.t('weapon.polearm') },
		{ name: 'catalyst', icon: mdiBookOpenPageVariant, label: $i18n.t('weapon.catalyst') },
		{ name: 'bow', icon: mdiBowArrow, label: $i18n.t('weapon.bow') }
	];

	const checkedStore = writable<{ [key: string]: boolean }>({});

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

	const transformedWeaponStore = derived(
		[userProfile, dataIndex],
		([$userProfile, dataIndexStore]) => {
			// Group obtained weapons by key
			const obtainedWeaponsMap: { [key: string]: IWeapon[] } =
				$userProfile.weapons?.reduce(
					(acc, weapon) => {
						if (!acc[weapon.key]) {
							acc[weapon.key] = [];
						}
						acc[weapon.key].push(weapon);
						return acc;
					},
					{} as { [key: string]: IWeapon[] }
				) || {};
			return Object.keys(dataIndexStore.weapon)
				.filter((key) => key !== 'Unknown3Star')
				.map((key) => {
					const weapon = dataIndexStore.weapon[key];
					const obtainedWeapons = obtainedWeaponsMap[key] || [];
					const isObtained = obtainedWeapons.length > 0;
					return {
						obtained: isObtained,
						link: `/weapons/${key}`,
						name: weapon.name,
						type: transformIntoWeapons(weapon.type),
						img: S3Service.getWeapon(key).icon,
						rarity: weapon.rarity,
						owned: obtainedWeapons,
						count: obtainedWeapons.length
					};
				});
		}
	);

	// Derived store to transform weapon data based on sorting and filtering
	const sortedWeaponStore = derived(
		[transformedWeaponStore, sortStore, filterStore],
		([transformedWeaponStore, sortStore, filterStore]) => {
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

			const filteredWeapons = transformedWeaponStore.filter((weapon) => {
				for (const [filterFn, values] of Object.entries(filterGroups)) {
					if (filterFn === 'weapon' && !values.has(weapon.type)) {
						return false;
					}
					if (filterFn === 'rarity' && !values.has(weapon.rarity)) {
						return false;
					}
					if (filterFn === 'owned' && !values.has(weapon.obtained)) {
						return false;
					}
				}
				return true;
			});

			return filteredWeapons.sort((a, b) => {
				if (sortStore.sortFn === 'Name') {
					return sortStore.order === 'asc'
						? a.name.localeCompare(b.name)
						: b.name.localeCompare(a.name);
				}
				if (sortStore.sortFn === 'Rarity') {
					return sortStore.order === 'asc' ? a.rarity - b.rarity : b.rarity - a.rarity;
				}
				if (sortStore.sortFn === 'Count') {
					return sortStore.order === 'asc' ? a.count - b.count : b.count - a.count;
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
<DefaultLayout title={$i18n.t('weapons.overview.title')}>
	<svelte:fragment slot="titlebarActions">
		<Searchbar searchGroup="Weapons" searchableDataList={$sortedWeaponStore} />
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
					on:click={() => setSortStore('Count')}
				>
					<Icon path={mdiNumeric} />
					{$i18n.t('sort.count')}
				</DropdownMenuItem>
				<DropdownMenuItem
					class="flex hover:bg-tertiary gap-2"
					on:click={() => setSortStore('Rarity')}
				>
					<Icon path={mdiStar} />
					{$i18n.t('sort.rarity')}
				</DropdownMenuItem>
			</svelte:fragment>
			<svelte:fragment slot="drawer-content">
				<div class="flex flex-col p-3 text-lg gap-4">
					<DrawerClose
						class="flex hover:bg-tertiary gap-2"
						on:click={() => setSortStore('Name')}
					>
						<Icon path={mdiAlphabetical} />
						{$i18n.t('sort.name')}
					</DrawerClose>
					<DrawerClose
						class="flex hover:bg-tertiary gap-2"
						on:click={() => setSortStore('Count')}
					>
						<Icon path={mdiNumeric} />
						{$i18n.t('sort.count')}
					</DrawerClose>
					<DrawerClose
						class="flex hover:bg-tertiary gap-2"
						on:click={() => setSortStore('Rarity')}
					>
						<Icon path={mdiStar} />
						{$i18n.t('sort.rarity')}
					</DrawerClose>
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
							<Icon path={mdiStar} class={`!size-7 !fill-fivestar`} />
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
					<DropdownMenuItem
						on:click={() => {
							setFilterStore('rarity', 3);
							toggleChecked('rarity3');
						}}
					>
						<Toggle
							class="py-2"
							pressed={$checkedStore['rarity3'] !== undefined
								? $checkedStore['rarity3']
								: false}
						>
							<Icon path={mdiStar} class={`!size-7 !fill-threestar`} />
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
									<Icon path={mdiStar} class={`!size-7 !fill-fivestar`} />
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
							<button
								type="button"
								class="p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
								aria-pressed={$checkedStore['rarity4'] || false}
								on:click={() => {
									setFilterStore('rarity', 3);
									toggleChecked('rarity3');
								}}
								on:keydown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										setFilterStore('rarity', 3);
										toggleChecked('rarity3');
									}
								}}
							>
								<Toggle pressed={$checkedStore['rarity3'] || false}>
									<Icon path={mdiStar} class={`!size-7 !fill-threestar`} />
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
	<div
		class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 peer-aria-selected: gap-4"
	>
		{#each $sortedWeaponStore as weapon}
			<WeapCard
				link={weapon.link}
				name={weapon.name}
				img={weapon.img}
				type={weapon.type}
				rarity={weapon.rarity}
				obtained={weapon.obtained}
				count={weapon.count}
			/>
		{/each}
	</div>
</DefaultLayout>
