<script lang="ts">
	import { showSidebar, showSidebarSections } from '$lib/store/global_state';
	import { get } from 'svelte/store';
	import { Button } from '$lib/components/ui/button';
	import {
		Collapsible,
		CollapsibleContent,
		CollapsibleTrigger
	} from '$lib/components/ui/collapsible';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import {
		mdiAccountMultiple,
		mdiSwordCross,
		mdiBagPersonal,
		mdiStarOutline,
		mdiFish,
		mdiBedKing,
		mdiPartyPopper,
		mdiClipboardTextOutline,
		mdiAlarm,
		mdiChartTimeline,
		mdiCards,
		mdiCog,
		mdiBookshelf,
		mdiStar,
		mdiFood,
		mdiDisc,
		mdiChevronRight,
		mdiChevronDown,
		mdiCloseCircle
	} from '@mdi/js';
	export let isMobile = false;
	export let segment: string;

	let collapseStatusIcon: string[] = get(showSidebarSections).map((status, _) => {
		if (status === true) {
			return mdiChevronDown;
		} else {
			return mdiChevronRight;
		}
	});
	showSidebarSections.subscribe((value) => {
		value.forEach((status, index) => {
			if (status === true) {
				collapseStatusIcon[index] = mdiChevronDown;
			} else {
				collapseStatusIcon[index] = mdiChevronRight;
			}
		});
	});
	function rightClicked(num: number) {
		showSidebarSections.update((n) => {
			n[num] = !n[num];
			return n;
		});
	}

	function closeNavigator() {
		showSidebar.set(false);
	}
</script>

<div
	class={`sidebar hide-scrollbar scroll-smooth overflow-scroll fixed w-full lg:w-64 h-full flex-col items-center z-50 bg-sidebar ${
		isMobile ? 'flex' : 'hidden lg:flex'
	}`}
>
	{#if !isMobile}
		<a href="/" class="relative py-2 items-left w-full">
			<h1 class="font-display text-3xl font-black text-fill-sidebarText py-4 relative z-10">dval.in</h1>
		</a>
	{/if}
	{#if isMobile}
		<div class="flex flex-row w-full items-center justify-center mt-8">
			<Button
				variant="navigatorClose"
				class="cursor-pointer bg-transparent"
				on:click={closeNavigator}
			>
				<Icon path={mdiCloseCircle} size={2} color="fill-sidebarText group-hover:fill-white" className="mb-8 mt-4 opacity-75" />
			</Button>
		</div>
	{/if}
	<Button variant={segment === 'wish' ? 'activeSidebar' : 'sidebar'} href="wish"
		><Icon path={mdiStar} color="fill-sidebarText group-hover:fill-white" size={1} />Wish Counter</Button
	>
	<Collapsible open={get(showSidebarSections)[0]} class="w-full">
		<CollapsibleTrigger class="w-full">
			<Button on:click={() => rightClicked(0)} variant={'headerSidebar'}
				><Icon path={collapseStatusIcon[0]} color="fill-sidebarText group-hover:fill-white" size={1} />Your Collection</Button
			>
		</CollapsibleTrigger>
		<CollapsibleContent>
			<Button variant={segment === 'characters' ? 'activeSidebar' : 'sidebar'} href="characters"
				><Icon path={mdiAccountMultiple} color="fill-sidebarText group-hover:fill-white" size={1} />Characters</Button
			>
			<Button variant={segment === 'weapons' ? 'activeSidebar' : 'sidebar'} href="weapons"
				><Icon path={mdiSwordCross} color="fill-sidebarText group-hover:fill-white" size={1} />Weapons</Button
			>
			<Button variant={segment === 'inventory' ? 'activeSidebar' : 'sidebar'} href="inventory"
				><Icon path={mdiBagPersonal} color="fill-sidebarText group-hover:fill-white" size={1} />Inventory</Button
			>
		</CollapsibleContent>
	</Collapsible>
	<Collapsible open={get(showSidebarSections)[1]} class="w-full">
		<CollapsibleTrigger class="w-full">
			<Button on:click={() => rightClicked(1)} variant={'headerSidebar'}
				><Icon path={collapseStatusIcon[1]} color="fill-sidebarText group-hover:fill-white" size={1} />Trackers</Button
			>
		</CollapsibleTrigger>
		<CollapsibleContent>
			<Button variant={segment === 'todo' ? 'activeSidebar' : 'sidebar'} href="todo" 
				><Icon path={mdiClipboardTextOutline} color="fill-sidebarText group-hover:fill-white" size={1} />To-Do</Button
			>
			<Button variant={segment === 'ascension' ? 'activeSidebar' : 'sidebar'} href="ascension"
				><Icon path={mdiStarOutline} color="fill-sidebarText group-hover:fill-white" size={1} />Ascension</Button
			>
			<Button variant={segment === 'fishing' ? 'activeSidebar' : 'sidebar'} href="fishing"
				><Icon path={mdiFish} color="fill-sidebarText group-hover:fill-white" size={1} />Fishing</Button
			>
			<Button variant={segment === 'furnishing' ? 'activeSidebar' : 'sidebar'} href="furnishing"
				><Icon path={mdiBedKing} color="fill-sidebarText group-hover:fill-white" size={1} />Furnishing</Button
			>
			<Button variant={segment === 'achievement' ? 'activeSidebar' : 'sidebar'} href="achievement"
				><Icon path={mdiPartyPopper} color="fill-sidebarText group-hover:fill-white" size={1} />Achievement</Button
			>
			<Button variant={segment === 'books' ? 'activeSidebar' : 'sidebar'} href="books"
				><Icon path={mdiBookshelf} color="fill-sidebarText group-hover:fill-white" size={1} />Books</Button
			>
			<Button variant={segment === 'recipes' ? 'activeSidebar' : 'sidebar'} href="recipes"
				><Icon path={mdiFood} color="fill-sidebarText group-hover:fill-white" size={1} />Recipes</Button
			>
			<Button
				variant={segment === 'spin-crystals' ? 'activeSidebar' : 'sidebar'}
				href="spin-crystals"><Icon path={mdiDisc} color="fill-sidebarText group-hover:fill-white" size={1} />Spin Crystals</Button
			>
		</CollapsibleContent>
	</Collapsible>
	<Collapsible open={get(showSidebarSections)[2]} class="w-full">
		<CollapsibleTrigger class="w-full">
			<Button on:click={() => rightClicked(2)} variant={'headerSidebar'}
				><Icon path={collapseStatusIcon[2]} color="fill-sidebarText group-hover:fill-white" size={1} />Tools</Button
			>
		</CollapsibleTrigger>
		<CollapsibleContent>
			<Button variant={segment === 'reminder' ? 'activeSidebar' : 'sidebar'} href="reminder"
				><Icon path={mdiAlarm} color="fill-sidebarText group-hover:fill-white" size={1} />Reminder</Button
			>
			<Button variant={segment === 'timeline' ? 'activeSidebar' : 'sidebar'} href="timeline"
				><Icon path={mdiChartTimeline} color="fill-sidebarText group-hover:fill-white" size={1} />Timeline</Button
			>
			<Button variant={segment === 'tcg' ? 'activeSidebar' : 'sidebar'} href="tcg"
				><Icon path={mdiCards} color="fill-sidebarText group-hover:fill-white" size={1} />TCG</Button
			>
		</CollapsibleContent>
	</Collapsible>
	<br />
	<Button variant={segment === 'settings' ? 'activeSidebar' : 'sidebar'} href="settings"
		><Icon path={mdiCog} color="fill-sidebarText group-hover:fill-white" size={1} />Settings</Button
	>
</div>
