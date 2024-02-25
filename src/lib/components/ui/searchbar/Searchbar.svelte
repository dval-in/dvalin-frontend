<script lang="ts">
	import { mdiSearchWeb } from '@mdi/js';
	import { goto } from '$app/navigation';
	import {
		Dialog as CommandRoot,
		List as CommandList,
		Input as CommandInput,
		Empty as CommandEmpty,
		Group as CommandGroup,
		Item as CommandItem
	} from '$lib/components/ui/command';
	import { type Elements, type Weapons } from '$lib/structs/types';
	import S3Service from '$lib/services/s3';
	import IconButton from '../icon-button/IconButton.svelte';

	export let searchGroup: string;
	export let searchableDataList: { name: string; link: string; img: string }[];
	let open: boolean = false;

	const redirectToPage = (link: string) => {
		goto(link);
	};

	const opencmd = () => {
		open = true;
	};
</script>

<IconButton icon={mdiSearchWeb} onClick={opencmd}>Search</IconButton>

<CommandRoot bind:open>
	<CommandInput placeholder={'Search for ' + searchGroup + '...'} />
	<CommandList>
		<CommandEmpty>Search Not Found</CommandEmpty>
		<CommandGroup heading={searchGroup}>
			{#each searchableDataList as data}
				<CommandItem
					onSelect={(value) => {
						redirectToPage(data.link);
					}}
				>
					<img src={data.img} alt={'Image of ' + data.name} class="w-8 h-8 mr-2 rounded-full" />
					{data.name}
				</CommandItem>
			{/each}
		</CommandGroup>
	</CommandList>
</CommandRoot>
