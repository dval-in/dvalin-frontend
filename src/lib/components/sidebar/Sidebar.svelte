<script lang="ts">
	import { fly } from 'svelte/transition';
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
		mdiCloseCircle,
		mdiBookshelf,
		mdiStar,
		mdiFood,
		mdiDisc
	} from '@mdi/js';

	import Icon from '../Icon.svelte';

	import SidebarTitle from './Title.svelte';
	import SidebarItem from './SidebarItem.svelte';
	import SidebarHeader from './SidebarTitle.svelte';

	import { showSidebar } from '$lib/store/global_state';

	export let segment: string;
	export let mobile = false;

	console.log(segment);

	function close() {
		showSidebar.set(false);
	}
</script>

<div
	in:fly|global={{ x: 100, duration: 100 }}
	out:fly|global={{ x: 100, duration: 100 }}
	class={`sidebar fixed w-full lg:w-64 h-full flex-col bg-background items-center z-50 
    ${mobile ? 'flex' : 'hidden lg:flex'}`}
>
	<div class="flex flex-col flex-1 items-center overflow-y-auto w-full px-5 py-5 z-10 bg-secondary">
		{#if !mobile}
			<SidebarTitle />
		{/if}
		{#if mobile}
			<button class="cursor-pointer" on:click={close}>
				<Icon path={mdiCloseCircle} size={2} color="white" className="mb-8 mt-4 opacity-75" />
			</button>
		{/if}
		<SidebarItem
			on:clicked={close}
			active={segment === '.'}
			path={mdiStar}
			label={'Wish Counter'}
			href="/"
		/>
		<SidebarHeader label="Your Collection" sidebarNum={0}>
			<SidebarItem
				on:clicked={close}
				active={segment === 'characters'}
				path={mdiAccountMultiple}
				label={'Characters'}
				href="/characters"
			/>
			<SidebarItem
				on:clicked={close}
				active={segment === 'wish'}
				path={mdiSwordCross}
				label={'Weapons'}
				href="/wish"
			/>
			<SidebarItem
				on:clicked={close}
				active={segment === 'calculator'}
				path={mdiBagPersonal}
				label={'Inventory'}
				href="/calculator"
			/>
		</SidebarHeader>
		<SidebarHeader label="Trackers" sidebarNum={1}>
			<SidebarItem
				on:clicked={close}
				active={segment === '.'}
				path={mdiClipboardTextOutline}
				label={'Todo-List'}
				href="/"
			/>
			<SidebarItem
				on:clicked={close}
				active={segment === '.'}
				path={mdiStarOutline}
				label={'Ascension Tracker'}
				href="/"
			/>
			<SidebarItem
				on:clicked={close}
				active={segment === '.'}
				path={mdiFish}
				label={'Fishing'}
				href="/"
			/>
			<SidebarItem
				on:clicked={close}
				active={segment === '.'}
				path={mdiBedKing}
				label={'Furnishing'}
				href="/"
			/>
			<SidebarItem
				on:clicked={close}
				active={segment === '.'}
				path={mdiPartyPopper}
				label={'Achivement'}
				href="/"
			/>
			<SidebarItem
				on:clicked={close}
				active={segment === '.'}
				path={mdiBookshelf}
				label={'Books'}
				href="/"
			/>
			<SidebarItem
				on:clicked={close}
				active={segment === '.'}
				path={mdiFood}
				label={'Recipes'}
				href="/"
			/>
			<SidebarItem
				on:clicked={close}
				active={segment === '.'}
				path={mdiDisc}
				label={'Spin Crystals'}
				href="/"
			/>
		</SidebarHeader>
		<SidebarHeader label="Tools" sidebarNum={2}>
			<SidebarItem
				on:clicked={close}
				active={segment === '.'}
				path={mdiAlarm}
				label={'Reminder'}
				href="/"
			/>
			<SidebarItem
				on:clicked={close}
				active={segment === '.'}
				path={mdiChartTimeline}
				label={'Timeline'}
				href="/"
			/>
			<SidebarItem
				on:clicked={close}
				active={segment === '.'}
				path={mdiCards}
				label={'TCG'}
				href="/"
			/>
		</SidebarHeader>
		<br />
		<SidebarItem
			on:clicked={close}
			active={segment === '.'}
			path={mdiCog}
			label={'Settings'}
			href="/"
		/>
	</div>
</div>

<style lang="postcss">
	@screen lg {
		::-webkit-scrollbar {
			width: 8px;
		}

		::-webkit-scrollbar-track {
			@apply bg-transparent;
		}

		::-webkit-scrollbar-thumb {
			background: rgba(0, 0, 0, 0.35);
			@apply rounded-xl;
		}
	}
</style>
