<script lang="ts">
	import {
		Collapsible,
		CollapsibleContent,
		CollapsibleTrigger
	} from '$lib/components/ui/collapsible';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import { mdiChevronDown, mdiChevronRight } from '@mdi/js';
	import Text from '$lib/components/typography/Text.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import SidebarEntry from '$lib/components/navigator/entry/SidebarEntry.svelte';
	import type { ISidebarEntry } from '$lib/components/navigator/entry';

	export let paths: ISidebarEntry[];
	export let title: string;
	export let forceOpen: boolean;
	export let isSidebarOpen: boolean;
	export let closeSidebar: () => void = () => {};

	let isCategoryOpen: boolean = true;

	$: isOpen = isCategoryOpen || forceOpen;
	$: collapseStatusIcon = isOpen ? mdiChevronDown : mdiChevronRight;

	const toggleCollapsible = () => {
		isCategoryOpen = !isCategoryOpen;
	};
</script>

<Collapsible open={isOpen} class="mt-3">
	<CollapsibleTrigger
		on:click={toggleCollapsible}
		class={`flex ${isSidebarOpen ? '' : 'sm:max-lg:hidden'} flex-1 items-center justify-between mb-3`}
	>
		<Text type="h3">{title}</Text>
		<Icon path={collapseStatusIcon} />
	</CollapsibleTrigger>

	<CollapsibleContent class="flex flex-col gap-1">
		<Separator class={`mb-3 hidden ${isSidebarOpen ? '' : 'sm:max-lg:block'}`} />
		{#each paths as path}
			<SidebarEntry
				title={path.title}
				link={path.link}
				icon={path.icon}
				{isSidebarOpen}
				onClick={closeSidebar}
			/>
		{/each}
	</CollapsibleContent>
</Collapsible>
