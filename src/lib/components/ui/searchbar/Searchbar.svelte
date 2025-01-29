<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		Dialog as CommandRoot,
		Empty as CommandEmpty,
		Group as CommandGroup,
		Input as CommandInput,
		Item as CommandItem,
		List as CommandList
	} from '$lib/components/ui/command';
	import IconButton from '../icon-button/IconButton.svelte';
	import { mdiMagnify } from '@mdi/js';

	export let searchGroup: string;
	export let searchableDataList: { name: string; link: string; img: string }[];
	let open: boolean = false;

	const redirectToPage = (link: string) => {
		goto(link);
	};

	const opencmd = () => {
		open = true;
	};

	const encodeAltText = (name: string) => {
		return name.replace(/"/g, '&quot;');
	};
</script>

<IconButton
	class="min-w-48 justify-start max-sm:flex-1"
	icon={mdiMagnify}
	on:click={opencmd}
	variant="outline"
>
	Search...
</IconButton>

<CommandRoot bind:open>
	<CommandInput placeholder={'Search for ' + searchGroup + '...'} />
	<CommandList>
		<CommandEmpty>Search Not Found</CommandEmpty>
		<CommandGroup>
			{#each searchableDataList as data}
				<CommandItem
					onSelect={() => redirectToPage(data.link)}
					class="hover:bg-primary cursor-pointer hover:text-black"
				>
					<img
						src={data.img}
						alt={encodeAltText(`Image of ${data.name}`)}
						class="mr-2 h-8 w-8 rounded-full"
					/>
					{encodeAltText(data.name)}
				</CommandItem>
			{/each}
		</CommandGroup>
	</CommandList>
</CommandRoot>
