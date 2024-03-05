<script lang="ts">
	import {
		Root as DropdownMenuRoot,
		Trigger as DropdownMenuTrigger,
		Content as DropdownMenuContent,
		CheckboxItem as DropdownMenuCheckboxItem
	} from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import { mdiFilter } from '@mdi/js';
	import { mdiChevronDown } from '@mdi/js';
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

<DropdownMenuRoot>
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
