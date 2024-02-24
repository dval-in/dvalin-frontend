<script context="module" lang="ts">
	import {
		Root as DropdownMenuRoot,
		Trigger as DropdownMenuTrigger,
		Content as DropdownMenuContent,
		CheckboxItem as DropdownMenuCheckboxItem
	} from '$lib/components/ui/dropdown-menu';

	export const getDistinct = (items) => {
		return Array.from(new Set(items));
	};
</script>

<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	export let filterValue;
	export let preFilteredValues;
	export let title: string;
	$: uniqueValues = getDistinct($preFilteredValues);
</script>

<DropdownMenuRoot>
	<DropdownMenuTrigger asChild let:builder>
		<Button builders={[builder]} variant="ghost">{title}</Button>
	</DropdownMenuTrigger>
	<DropdownMenuContent class="w-56">
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
