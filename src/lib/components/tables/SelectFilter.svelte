<script context="module" lang="ts">
	import {
		Root as DropdownMenuRoot,
		Trigger as DropdownMenuTrigger,
		Content as DropdownMenuContent,
		CheckboxItem as DropdownMenuCheckboxItem
	} from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import { mdiFilter } from '@mdi/js';

	export const getDistinct = (items: string[]) => {
		return Array.from(new Set(items));
	};
</script>

<script lang="ts">
	export let filterValue;
	export let preFilteredValues;
	export let title: string;
	$: uniqueValues = getDistinct($preFilteredValues);
</script>

<DropdownMenuRoot>
	<DropdownMenuTrigger asChild let:builder>
		<Button builders={[builder]} variant="ghost">
			{title}
			{#if $filterValue !== undefined}
				<Icon path={mdiFilter} />
			{/if}
		</Button>
	</DropdownMenuTrigger>
	<DropdownMenuContent>
		<DropdownMenuCheckboxItem
			checked={$filterValue === undefined}
			onCheckedChange={() => ($filterValue = undefined)}
		>
			All
		</DropdownMenuCheckboxItem>
		{#each uniqueValues as value}
			<DropdownMenuCheckboxItem
				checked={$filterValue === value}
				onCheckedChange={() => ($filterValue = value)}
			>
				{value}
			</DropdownMenuCheckboxItem>
		{/each}
	</DropdownMenuContent>
</DropdownMenuRoot>
