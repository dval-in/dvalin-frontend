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
		mdiChartTimeline,
		mdiCards,
		mdiCog,
		mdiBookshelf,
		mdiStar,
		mdiFood,
		mdiDisc,
		mdiChevronRight,
		mdiChevronDown,
		mdiCloseCircle, mdiMenu, mdiAlarm
	} from '@mdi/js';
	import Text from '$lib/components/typography/Text.svelte';
	import IconButton from '$lib/components/ui/icon-button/IconButton.svelte';
	import { page } from '$app/stores';

	$: currentActivePath = $page.url.pathname.substring(1).split('/')[0];

	let collapseStatusIcon: string[] = get(showSidebarSections).map((status, _) => {
		if (status === true) {
			return mdiChevronDown;
		} else {
			return mdiChevronRight;
		}
	});

	const toggleCollapsible = (num: number) => {
		showSidebarSections.update((n) => {
			n[num] = !n[num];
			return n;
		});
	}

	const openNavigator = () => {
		showSidebar.set(true);
	}

	const closeNavigator = () => {
		showSidebar.set(false);
	}

	const isPathActive = (path: string): 'activeSidebar' | 'sidebar' => {
		return currentActivePath === path ? 'activeSidebar' : 'sidebar'
	}

	showSidebarSections.subscribe((value) => {
		value.forEach((status, index) => {
			if (status === true) {
				collapseStatusIcon[index] = mdiChevronDown;
			} else {
				collapseStatusIcon[index] = mdiChevronRight;
			}
		});
	});
</script>

<div class={`fixed flex w-full ${$showSidebar ? "sm:w-72" : "sm:w-20"} lg:w-72 ${$showSidebar ? "h-full" : "h-16"} sm:h-full flex-col z-50 p-2.5 lg:p-5 lg:pl-10 max-sm:px-5 sm:max-lg:py-5 bg-sidebar ${$showSidebar ? "" : "rounded-b"} sm:rounded-r transition-all`}>
	<div class={`flex ${$showSidebar ? "flex-row" : "sm:max-lg:flex-col"}  items-center justify-between`}>
		<div class="flex flex-row items-center">
			<Text type="p">Logo</Text>
			<a href="/" class={`ml-3 ${$showSidebar ? "" : "sm:max-lg:hidden"}`}>
				<Text type="h1">dval.in</Text>
			</a>
		</div>

		<div class="lg:hidden">
			{#if $showSidebar}
				<Button variant="ghost" on:click={closeNavigator}>
					<Icon
						path={mdiCloseCircle}
						size={1}
						color="fill-sidebarText cursor-pointer"
					/>
				</Button>
			{/if}
			{#if !$showSidebar}
				<Button variant="ghost" on:click={openNavigator}>
					<Icon
						path={mdiMenu}
						size={1}
						color="fill-sidebarText cursor-pointer"
					/>
				</Button>
			{/if}
		</div>
	</div>

		<div class={`overflow-y-auto flex flex-col flex-1 gap-1 max-sm:h-full my-2.5 ${$showSidebar ? "" : "max-sm:max-h-0 max-sm:overflow-hidden"}`}>
			<IconButton icon={mdiStar} variant={isPathActive('wish')} href="wish">
				<div class={`${$showSidebar ? "" : "sm:max-lg:hidden"}`}>
					Wish Counter
				</div>
			</IconButton>

			<Collapsible open={get(showSidebarSections)[0]} class="mt-3">
				<CollapsibleTrigger on:click={() => toggleCollapsible(0)} class={`flex sm:max-lg:hidden flex-1 items-center justify-between`}>
					<Text type="h3">Your Collection</Text>
					<Icon
						path={collapseStatusIcon[0]}
						color="fill-sidebarText"
						size={1}
					/>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<IconButton icon={mdiAccountMultiple} variant={isPathActive('characters')} href="characters">
						<div class={`${$showSidebar ? "" : "sm:max-lg:hidden"}`}>
							Characters
						</div>
					</IconButton>
					<IconButton icon={mdiSwordCross} variant={isPathActive('weapons')} href="weapons">
						<div class={`${$showSidebar ? "" : "sm:max-lg:hidden"}`}>
							Weapons
						</div>
					</IconButton>
					<IconButton icon={mdiBagPersonal} variant={isPathActive('inventory')} href="inventory">
						<div class={`${$showSidebar ? "" : "sm:max-lg:hidden"}`}>
							Inventory
						</div>
					</IconButton>
				</CollapsibleContent>
			</Collapsible>

			<Collapsible open={get(showSidebarSections)[1]} class="mt-3">
				<CollapsibleTrigger on:click={() => toggleCollapsible(1)} class="flex sm:max-lg:hidden flex-1 items-center justify-between">
					<Text type="h3">Trackers</Text>
					<Icon
						path={collapseStatusIcon[1]}
						color="fill-sidebarText"
						size={1}
					/>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<IconButton icon={mdiClipboardTextOutline} variant={isPathActive('todo')} href="todo">
						<div class={`${$showSidebar ? "" : "sm:max-lg:hidden"}`}>
							To-Do
						</div>
					</IconButton>
					<IconButton icon={mdiStarOutline} variant={isPathActive('ascension')} href="ascension">
						<div class={`${$showSidebar ? "" : "sm:max-lg:hidden"}`}>
							Ascension
						</div>
					</IconButton>
					<IconButton icon={mdiFish} variant={isPathActive('fishing')} href="fishing">
						<div class={`${$showSidebar ? "" : "sm:max-lg:hidden"}`}>
							Fishing
						</div>
					</IconButton>
					<IconButton icon={mdiBedKing} variant={isPathActive('furnishing')} href="furnishing">
						<div class={`${$showSidebar ? "" : "sm:max-lg:hidden"}`}>
							Furnishing
						</div>
					</IconButton>
					<IconButton icon={mdiPartyPopper} variant={isPathActive('achievement')} href="achievement">
						<div class={`${$showSidebar ? "" : "sm:max-lg:hidden"}`}>
							Achievement
						</div>
					</IconButton>
					<IconButton icon={mdiBookshelf} variant={isPathActive('books')} href="books">
						<div class={`${$showSidebar ? "" : "sm:max-lg:hidden"}`}>
							Books
						</div>
					</IconButton>
					<IconButton icon={mdiFood} variant={isPathActive('recipes')} href="recipes">
						<div class={`${$showSidebar ? "" : "sm:max-lg:hidden"}`}>
							Recipes
						</div>
					</IconButton>
					<IconButton icon={mdiDisc} variant={isPathActive('spin-crystals')} href="spin-crystals">
						<div class={`${$showSidebar ? "" : "sm:max-lg:hidden"}`}>
							Spin Crystals
						</div>
					</IconButton>
				</CollapsibleContent>
			</Collapsible>

			<Collapsible open={get(showSidebarSections)[2]} class="mt-3">
				<CollapsibleTrigger on:click={() => toggleCollapsible(2)} class="flex sm:max-lg:hidden flex-1 items-center justify-between">
					<Text type="h3">Tools</Text>
					<Icon
						path={collapseStatusIcon[2]}
						color="fill-sidebarText"
						size={1}
					/>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<IconButton icon={mdiAlarm} variant={isPathActive('reminder')} href="reminder">
						<div class={`${$showSidebar ? "" : "sm:max-lg:hidden"}`}>
							Reminder
						</div>
					</IconButton>
					<IconButton icon={mdiChartTimeline} variant={isPathActive('timeline')} href="timeline">
						<div class={`${$showSidebar ? "" : "sm:max-lg:hidden"}`}>
							Timeline
						</div>
					</IconButton>
					<IconButton icon={mdiCards} variant={isPathActive('tcg')} href="tcg">
						<div class={`${$showSidebar ? "" : "sm:max-lg:hidden"}`}>
							TCG
						</div>
					</IconButton>
				</CollapsibleContent>
			</Collapsible>

			<div class="mt-2.5">
				<IconButton icon={mdiCog} variant={isPathActive('settings')} href="settings">
					<div class={`${$showSidebar ? "" : "sm:max-lg:hidden"}`}>
						Settings
					</div>
				</IconButton>
			</div>
		</div>

		<div class={`flex flex-row items-center justify-between ${$showSidebar ? "" : "max-sm:max-h-0 max-sm:overflow-hidden"}`}>
			<Button class={`${$showSidebar ? "" : "sm:max-lg:hidden"}`}>
				Language
			</Button>
			<Button>
				Login
			</Button>
		</div>
</div>
