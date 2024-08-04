<script lang="ts">
	import IconButton from '$lib/components/ui/icon-button/IconButton.svelte';
	import {
		mdiFilter,
		mdiFilterOutline,
		mdiFilterRemove,
		mdiStar,
		mdiSortAscending,
		mdiSortDescending
	} from '@mdi/js';
	import WeapCard from '$lib/components/ui/card/WeapCard.svelte';
	import Searchbar from '$lib/components/ui/searchbar/Searchbar.svelte';
	import S3Service from '$lib/services/s3';
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	// import type { WeaponTypes } from '$lib/types/weapon';
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
	} from '$lib/components/ui/dropdown-menu';
	import IconBow from '$lib/assets/Icon_Weapon_Bow.png';
	import IconCatalyst from '$lib/assets/Icon_Weapon_Catalyst.png';
	import IconClaymore from '$lib/assets/Icon_Weapon_Claymore.png';
	import IconPolearm from '$lib/assets/Icon_Weapon_Polearm.png';
	import IconSword from '$lib/assets/Icon_Weapon_Sword.png';
	import Icon from '$lib/components/ui/icon/icon.svelte';

	type Sorts = 'Name' | 'Refinement';
	type Filters = 'weapon' | 'rarity' | 'owned';

	// Stores for sorting and filtering
	const sortStore = writable<{ sortFn: Sorts; order: 'asc' | 'desc' }>({
		sortFn: 'Name',
		order: 'asc'
	});

	const filterStore = writable<{ filterFn: Filters; value: string }[]>([]);

	const weapons = [
		{ name: 'sword', icon: IconSword, label: 'Sword' },
		{ name: 'claymore', icon: IconClaymore, label: 'Claymore' },
		{ name: 'polearm', icon: IconPolearm, label: 'Polearm' },
		{ name: 'catalyst', icon: IconCatalyst, label: 'Catalyst' },
		{ name: 'bow', icon: IconBow, label: 'Bow' }
	];

	const checkedStore = writable<{ [key: string]: boolean }>({});

	// const transformIntoWeapons = (weapon: string): WeaponTypes => {
	// 	switch (weapon) {
	// 		case 'Sword':
	// 			return 'sword';
	// 		case 'Claymore':
	// 			return 'claymore';
	// 		case 'Polearm':
	// 			return 'polearm';
	// 		case 'Catalyst':
	// 			return 'catalyst';
	// 		case 'Bow':
	// 			return 'bow';
	// 		default:
	// 			return 'sword';
	// 	}
	// };

	// Derived store to transform weapon data based on sorting and filtering
	const transformedWeaponStore = derived(
		[userProfile, dataIndexStore, sortStore, filterStore],
		([userProfile, dataIndexStore, sortStore, filterStore]) => {
			const weapons = Object.keys(dataIndexStore.weapon).map((key) => {
				const weapon = dataIndexStore.weapon[key];
				const obtained = userProfile.weapons
					? Object.keys(userProfile.weapons).includes(key)
					: false;

				return {
					obtained,
					link: `/weapons/${key}`,
					name: weapon.name,
					// type: transformIntoWeapons(weapon.),
					img: S3Service.getWeapon(key).icon,
					rarity: weapon.rarity
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

			const filteredWeapons = weapons.filter((weapon) => {
				for (const [filterFn, values] of Object.entries(filterGroups)) {
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
<DefaultLayout title={$i18n.t('weapons.title')}>
	<svelte:fragment slot="titlebarActions">
		<Searchbar searchGroup="Weapons" searchableDataList={$transformedWeaponStore} />
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
					on:click={() => setSortStore('Refinement')}
				>
					Refinement
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
					<DropdownMenuLabel>Weapon</DropdownMenuLabel>
				</DropdownMenuGroup>
				<DropdownMenuGroup class="grid grid-cols-5 gap-1">
					{#each weapons as { name, icon, label }}
						<DropdownMenuItem
							on:click={() => {
								setFilterStore('weapon', name);
								toggleChecked(name);
							}}
							class={`p-0 rounded-lg border cursor-pointer bg-tertiary text-text shadow-sm justify-center sm:p-2 gap-2 hover:border-primary transition duration-300 ${
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
				<DropdownMenuGroup class="grid grid-cols-3 justify-center gap-2">
					<DropdownMenuItem
						on:click={() => {
							setFilterStore('rarity', 5);
							toggleChecked('rarity5');
						}}
						class={`p-0 rounded-lg border cursor-pointer bg-tertiary text-text shadow-sm justify-center sm:p-2 gap-2 hover:border-primary w-full transition duration-300 ${
							$checkedStore['rarity5'] ? 'bg-primary' : ''
						}`}
					>
						<Icon path={mdiStar} class="size-6 *:fill-fivestar" />
					</DropdownMenuItem>
					<DropdownMenuItem
						on:click={() => {
							setFilterStore('rarity', 4);
							toggleChecked('rarity4');
						}}
						class={`p-0 rounded-lg border cursor-pointer bg-tertiary text-text shadow-sm justify-center sm:p-2 gap-2 hover:border-primary w-full transition duration-300 ${
							$checkedStore['rarity4'] ? 'bg-primary' : ''
						}`}
					>
						<Icon path={mdiStar} class="size-6 *:fill-fourstar" />
					</DropdownMenuItem>
					<DropdownMenuItem
						on:click={() => {
							setFilterStore('rarity', 3);
							toggleChecked('rarity3');
						}}
						class={`p-0 rounded-lg border cursor-pointer bg-tertiary text-text shadow-sm justify-center sm:p-2 gap-2 hover:border-primary w-full transition duration-300 ${
							$checkedStore['rarity3'] ? 'bg-primary' : ''
						}`}
					>
						<Icon path={mdiStar} class="size-6 *:fill-threestar" />
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup class="grid grid-cols-1">
					<DropdownMenuItem
						on:click={() => {
							setFilterStore('owned', true);
							toggleChecked('owned');
						}}
						class={`p-0 rounded-lg border cursor-pointer bg-tertiary text-text shadow-sm justify-center sm:p-2 gap-2 hover:border-primary w-full transition duration-300 ${
							$checkedStore['owned'] ? 'bg-primary' : ''
						}`}
					>
						<h1 class="text-sm font-medium">Owned</h1>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	</svelte:fragment>
	<div class="flex flex-wrap gap-4 justify-center mt-1">
		{#each $transformedWeaponStore as weapon}
			<!-- Need to decide on different img depending on ascencion -->
			<WeapCard
				link={weapon.link}
				name={weapon.name}
				img={weapon.img}
				level={1}
				ascencion={0}
				refinement={5}
				type={'sword'}
				rarity={weapon.rarity}
				obtained={true}
				location={'Xiao'}
			/>
		{/each}
	</div>
</DefaultLayout>
