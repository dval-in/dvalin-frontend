<script lang="ts">
	import type { DateRange } from 'bits-ui';
	import { DateFormatter, getLocalTimeZone } from '@internationalized/date';
	import { cn } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
	import { RangeCalendar } from '$lib/components/ui/range-calendar';
	import { Popover, PopoverContent, PopoverTrigger } from '$lib/components/ui/popover';

	const df = new DateFormatter('en-US', {
		dateStyle: 'medium'
	});

	export let value: DateRange | undefined = undefined;
	export let onValueChange: (dateRange: DateRange) => void;
</script>

<div class="grid gap-2">
	<Popover openFocus>
		<PopoverTrigger asChild let:builder>
			<Button
				builders={[builder]}
				class={cn(
					' justify-start text-left font-normal',
					!value && 'text-muted-foreground'
				)}
				variant="ghost"
			>
				{#if value && value.start}
					{#if value.end}
						{df.format(value.start.toDate(getLocalTimeZone()))} - {df.format(
							value.end.toDate(getLocalTimeZone())
						)}
					{:else}
						{df.format(value.start.toDate(getLocalTimeZone()))}
					{/if}
				{:else}
					Date
				{/if}
			</Button>
		</PopoverTrigger>
		<PopoverContent align="start" class="w-auto p-0">
			<RangeCalendar bind:value initialFocus numberOfMonths={1} {onValueChange} />
		</PopoverContent>
	</Popover>
</div>
