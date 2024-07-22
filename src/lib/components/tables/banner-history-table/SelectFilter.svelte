<script lang="ts">
	import {
		CheckboxItem as DropdownMenuCheckboxItem,
		Content as DropdownMenuContent,
		Root as DropdownMenuRoot,
		Trigger as DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import { mdiChevronDown, mdiFilter } from '@mdi/js';
	import { Separator } from '$lib/components/ui/separator';

	export let filterValue;
	export let preFilteredValues;
	export let title: string;
	$: uniqueValues = getDistinct($preFilteredValues);

	const getDistinct = (items: string[]) => {
		return Array.from(new Set(items));
	};

	const setFilter = (value: string, isChecked: boolean) => {
		const tempFilter = $filterValue.filter((filter: string) => filter !== value);

		if (isChecked) {
			tempFilter.push(value);
		}

		if (tempFilter.length === uniqueValues.length) {
			clearFilter();
		} else {
			$filterValue = tempFilter;
		}
	};

	const clearFilter = () => {
		$filterValue = [];
	};
</script>

<DropdownMenuRoot closeOnItemClick={false}>
	<DropdownMenuTrigger asChild let:builder>
		<Button builders={[builder]} variant="ghost">
			{title}
			{#if $filterValue.length > 0}
				<Icon path={mdiFilter} />
			{:else}
				<Icon path={mdiChevronDown} />
			{/if}
		</Button>
	</DropdownMenuTrigger>
	<DropdownMenuContent>
		<DropdownMenuCheckboxItem checked={$filterValue.length === 0} onCheckedChange={clearFilter}>
			All
		</DropdownMenuCheckboxItem>
		<Separator />
		{#each uniqueValues as value}
			<DropdownMenuCheckboxItem
				checked={$filterValue.includes(value)}
				onCheckedChange={(isChecked) => {
					if (typeof isChecked === 'boolean') {
						setFilter(value, isChecked);
					}
				}}
			>
				{value}
			</DropdownMenuCheckboxItem>
		{/each}
	</DropdownMenuContent>
</DropdownMenuRoot>
