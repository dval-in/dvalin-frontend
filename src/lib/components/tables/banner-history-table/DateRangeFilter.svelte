<script lang="ts">
	import type { DateRange } from 'bits-ui';
	import { fromDate, getLocalTimeZone } from '@internationalized/date';
	import { cn } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
	import { RangeCalendar } from '$lib/components/ui/range-calendar';
	import { Popover, PopoverContent, PopoverTrigger } from '$lib/components/ui/popover';
	import { mdiChevronDown, mdiFilter, mdiFilterRemove } from '@mdi/js';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import IconButton from '$lib/components/ui/icon-button/IconButton.svelte';

	export let filterValue;
	export let preFilteredValues;

	$: min =
		$preFilteredValues.length === 0
			? 0
			: Math.min(
					...$preFilteredValues.map((v: string) => {
						return new Date(v).getTime();
					})
				);

	$: max =
		$preFilteredValues.length === 0
			? 0
			: Math.max(
					...$preFilteredValues.map((v: string) => {
						return new Date(v).getTime();
					})
				);

	let value: DateRange = { start: undefined, end: undefined };

	const onValueChange = (changedValue: DateRange) => {
		$filterValue[0] = changedValue.start
			? changedValue.start.toDate(getLocalTimeZone()).getTime()
			: null;
		$filterValue[1] = changedValue.end
			? changedValue.end.add({ days: 1 }).toDate(getLocalTimeZone()).getTime()
			: null;
	};

	const clearFilter = () => {
		$filterValue = [null, null];
		value = { start: undefined, end: undefined };
	};
</script>

<div class="grid gap-2">
	<Popover openFocus>
		<PopoverTrigger asChild let:builder>
			<Button
				builders={[builder]}
				class={cn('justify-start text-left font-normal')}
				variant="ghost"
			>
				Date
				{#if value.start === undefined || value.end === undefined}
					<Icon path={mdiChevronDown} />
				{:else}
					<Icon path={mdiFilter} />
				{/if}
			</Button>
		</PopoverTrigger>
		<PopoverContent align="start" class="w-auto p-0">
			<RangeCalendar
				bind:value
				initialFocus
				maxValue={fromDate(new Date(max), getLocalTimeZone())}
				minValue={fromDate(new Date(min), getLocalTimeZone())}
				numberOfMonths={1}
				{onValueChange}
				placeholder={fromDate(new Date(max), getLocalTimeZone())}
				weekStartsOn={1}
			/>
			<div class="p-3">
				<IconButton
					class="w-full"
					disabled={value.start === undefined || value.end === undefined}
					icon={mdiFilterRemove}
					on:click={clearFilter}
				>
					Clear Filter
				</IconButton>
			</div>
		</PopoverContent>
	</Popover>
</div>
