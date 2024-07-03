<script lang="ts">
import IconButton from '$lib/components/ui/icon-button/IconButton.svelte';
import {
	mdiAlphabetical, mdiCalendar, mdiCreation, mdiFilter, mdiFilterOutline,
	mdiFilterRemove, mdiSortAscending, mdiSortDescending, mdiStar,
	mdiTagCheck, mdiTagHidden
} from '@mdi/js';
import CharCard from '$lib/components/ui/card/CharCard.svelte';
import Searchbar from '$lib/components/ui/searchbar/Searchbar.svelte';
import S3Service from '$lib/services/s3';
import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
import { dataIndexStore } from '$lib/store/index_store';
import i18n from '$lib/services/i18n';
import { userProfile } from '$lib/store/user_profile';
import { derived, get, writable } from 'svelte/store';
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '$lib/components/ui/dropdown-menu/index';
import Icon from '$lib/components/ui/icon/icon.svelte';
import type { WeaponTypes } from '$lib/types/weapon';
import type { Elements } from '$lib/types/elements';
import { Toggle } from '$lib/components/ui/toggle';
import DrawerDropdown from '$lib/components/ui/drawer-dropdown/DrawerDropdown.svelte';
import { DrawerClose } from '$lib/components/ui/drawer';
import Text from '$lib/components/typography/Text.svelte';

import { elements, weapons } from '$lib/data/gameData';
import IconGoldStar from '$lib/assets/Icon_Gold_Star.png';
import IconPurpleStar from '$lib/assets/Icon_Purple_Star.png';

type Sorts = 'Name' | 'Date' | 'Rarity' | 'Constellation';
type Filters = 'element' | 'weapon' | 'rarity' | 'owned';

const sortStore = writable<{ sortFn: Sorts; order: 'asc' | 'desc' }>({
	sortFn: 'Name',
	order: 'asc'
});

const filterStore = writable<{ filterFn: Filters; value: string }[]>([]);
const checkedStore = writable<{ [key: string]: boolean }>({});

const transformIntoElements = (element: string): Elements => {
	const lowerElement = element.toLowerCase();
	return (['pyro', 'hydro', 'anemo', 'electro', 'dendro', 'cryo', 'geo'] as Elements[]).includes(lowerElement as Elements) 
		? lowerElement as Elements 
		: 'anemo';
};

const transformIntoWeapons = (weapon: string): WeaponTypes => {
	const lowerWeapon = weapon.toLowerCase();
	return (['sword', 'claymore', 'polearm', 'catalyst', 'bow'] as WeaponTypes[]).includes(lowerWeapon as WeaponTypes)
		? lowerWeapon as WeaponTypes
		: 'sword';
};

const transformedCharacterStore = derived(
	[userProfile, dataIndexStore],
	([userProfile, dataIndexStore]) => Object.entries(dataIndexStore.character).map(([key, character]) => ({
		obtained: userProfile.characters ? Object.keys(userProfile.characters).includes(key) : false,
		link: `/characters/${key}`,
		name: character.name,
		element: transformIntoElements(character.element),
		weapon: transformIntoWeapons(character.weaponType),
		img: S3Service.getCharacter(key).icon,
		rarity: character.rarity
	}))
);

const sortedCharacterStore = derived(
	[transformedCharacterStore, sortStore, filterStore],
	([characters, { sortFn, order }, filters]) => {
		const filterGroups = filters.reduce((groups, filter) => {
			(groups[filter.filterFn] = groups[filter.filterFn] || new Set()).add(filter.value);
			return groups;
		}, {} as Record<Filters, Set<any>>);

		return characters
			.filter(char => Object.entries(filterGroups).every(([filterFn, values]) => 
				!values.size || values.has(String(char[filterFn as keyof typeof char]))))
			.sort((a, b) => {
				const compareValue = sortFn === 'Name' ? a.name.localeCompare(b.name) : a[sortFn.toLowerCase() as keyof typeof a] - b[sortFn.toLowerCase() as keyof typeof b];
				return order === 'asc' ? compareValue : -compareValue;
			});
	}
);

const setSortStore = (sort: Sorts) => {
	sortStore.update(current => ({
		sortFn: sort,
		order: current.sortFn === sort && current.order === 'asc' ? 'desc' : 'asc'
	}));
};

const setFilterStore = (filter: Filters, value: any) => {
	filterStore.update(current => {
		const existingFilterIndex = current.findIndex(f => f.filterFn === filter && f.value === value);
		if (existingFilterIndex > -1) {
			current.splice(existingFilterIndex, 1);
		} else {
			current.push({ filterFn: filter, value });
		}
		return current;
	});
	toggleChecked(String(value));
};

const resetFilters = () => {
	filterStore.set([]);
	checkedStore.set({});
};

const toggleChecked = (name: string) => {
	checkedStore.update(current => ({ ...current, [name]: !current[name] }));
};

const renderFilterGroup = (title: string, items: any[], filterType: Filters) => `
	<div>
		<div class="flex">
			<Text type="small">${title}</Text>
		</div>
		<div class="flex flex-wrap gap-2">
			${items.map(item => `
				<div on:click={() => setFilterStore('${filterType}', '${item.name}')}>
					<Toggle class="py-2" pressed={$checkedStore['${item.name}']} on:click={() => {}}>
						<img src="${item.icon}" alt="${item.label}" class="size-7 ${filterType === 'weapon' ? 'rounded-full' : ''}" />
					</Toggle>
				</div>
			`).join('')}
		</div>
	</div>
`;

const renderRarityGroup = () => `
	<div>
		<div class="flex">
			<Text type="small">Rarity</Text>
		</div>
		<div class="flex gap-2">
			${[{ name: 'rarity5', icon: IconGoldStar, label: '5 Star' }, { name: 'rarity4', icon: IconPurpleStar, label: '4 Star' }]
				.map(item => `
					<div on:click={() => setFilterStore('rarity', ${item.name.slice(-1)})}>
						<Toggle class="py-2" pressed={$checkedStore['${item.name}']} on:click={() => {}}>
							<img src="${item.icon}" alt="${item.label}" class="size-7" />
						</Toggle>
					</div>
				`).join('')}
		</div>
	</div>
`;

const renderOwnershipGroup = () => `
	<div>
		<div class="flex">
			<Text type="small">Ownership</Text>
		</div>
		<div class="flex gap-2">
			${[{ name: 'owned', icon: mdiTagCheck }, { name: 'notowned', icon: mdiTagHidden }]
				.map(item => `
					<div on:click={() => setFilterStore('owned', ${item.name === 'owned'})}>
						<Toggle class="py-2" pressed={$checkedStore['${item.name}']} on:click={() => {}}>
							<Icon path={${item.icon}} size={1.2} />
						</Toggle>
					</div>
				`).join('')}
		</div>
	</div>
`;
</script>

<DefaultLayout title={$i18n.t('characters.overview.title')}>
	<svelte:fragment slot="titlebarActions">
		<Searchbar searchGroup="Characters" searchableDataList={$sortedCharacterStore} />
		<DrawerDropdown>
			<svelte:fragment slot="trigger">
				<IconButton
					icon={$sortStore.order === 'asc' ? mdiSortAscending : mdiSortDescending}
					class="flex w-full"
				>
					{$i18n.t('action.sort_by', { sortFN: $sortStore.sortFn })}
				</IconButton>
			</svelte:fragment>
			<svelte:fragment slot="dropdown-content">
				{#each ['Name', 'Date', 'Rarity', 'Constellation'] as sortOption}
					<DropdownMenuItem
						class="flex hover:bg-tertiary gap-2"
						on:click={() => setSortStore(sortOption)}
					>
						<Icon path={{ Name: mdiAlphabetical, Date: mdiCalendar, Rarity: mdiStar, Constellation: mdiCreation }[sortOption]} />
						{sortOption}
					</DropdownMenuItem>
				{/each}
			</svelte:fragment>
			<svelte:fragment slot="drawer-content">
				{#each ['Name', 'Date', 'Rarity', 'Constellation'] as sortOption}
					<DrawerClose
						class="flex hover:bg-tertiary gap-2"
						on:click={() => setSortStore(sortOption)}
					>
						<Icon path={{ Name: mdiAlphabetical, Date: mdiCalendar, Rarity: mdiStar, Constellation: mdiCreation }[sortOption]} />
						{sortOption}
					</DrawerClose>
				{/each}
			</svelte:fragment>
		</DrawerDropdown>

		<DrawerDropdown>
			<svelte:fragment slot="trigger">
				<IconButton
					icon={$filterStore.length === 0 ? mdiFilterOutline : mdiFilter}
					class="flex w-full"
				>
					{$i18n.t('action.filter_by')}
				</IconButton>
			</svelte:fragment>
			<svelte:fragment slot="dropdown-content">
				<IconButton
					icon={mdiFilterRemove}
					class="flex flex-1"
					disabled={$filterStore.length === 0}
					on:click={() => resetFilters()}
				>
					Reset Filters
				</IconButton>

				<DropdownMenuSeparator />

				{@html renderFilterGroup('Element', elements, 'element')}
				{@html renderFilterGroup('Weapon', weapons, 'weapon')}
				{@html renderRarityGroup()}
				{@html renderOwnershipGroup()}
			</svelte:fragment>
			<svelte:fragment slot="drawer-content">
				<div class="flex flex-col gap-3 py-3">
					<IconButton
						icon={mdiFilterRemove}
						class="flex flex-1"
						disabled={$filterStore.length === 0}
						on:click={() => resetFilters()}
					>
						Reset Filters
					</IconButton>

					{@html renderFilterGroup('Element', elements, 'element')}
					{@html renderFilterGroup('Weapon', weapons, 'weapon')}
					{@html renderRarityGroup()}
					{@html renderOwnershipGroup()}
				</div>
			</svelte:fragment>
		</DrawerDropdown>
	</svelte:fragment>

	<div class="flex flex-wrap gap-4 justify-center">
		{#each $sortedCharacterStore as character}
			<CharCard {...character} />
		{/each}
	</div>
</DefaultLayout>
