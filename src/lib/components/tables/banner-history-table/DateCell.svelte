<script lang="ts">
	import { Tooltip, TooltipTrigger, TooltipContent } from '$lib/components/ui/tooltip';

	export let value: string;
</script>

<Tooltip>
	<TooltipTrigger>
		{new Date(value).toLocaleDateString()}
	</TooltipTrigger>
	<TooltipContent>
		{new Date(value).toString()}
	</TooltipContent>
</Tooltip>
