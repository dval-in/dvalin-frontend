<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import {
		mdiAccount,
		mdiAccountMultiple,
		mdiBagPersonal,
		mdiClipboardTextOutline,
		mdiCloseCircle,
		mdiCog,
		mdiHome,
		mdiLogout,
		mdiMap,
		mdiMenu,
		mdiStar,
		mdiSwordCross
	} from '@mdi/js';
	import Text from '$lib/components/typography/Text.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import SidebarCategory from '$lib/components/navigator/category/SidebarCategory.svelte';
	import SidebarEntry from '$lib/components/navigator/entry/SidebarEntry.svelte';
	import logo from '$lib/assets/logo.webp';
	import BackendService from '$lib/services/backend';
	import i18n from '$lib/services/i18n/index';
	import LanguageSwitcher from '$lib/components/navigator/language-switcher/LanguageSwitcher.svelte';
	import { applicationState } from '$lib/store/application_state';

	const paths = {
		collection: [
			{
				title: 'characters.overview.title',
				link: '/characters',
				icon: mdiAccountMultiple
			},
			{ title: 'weapons.title', link: '/weapons', icon: mdiSwordCross },
			{ title: 'inventory.title', link: '/inventory', icon: mdiBagPersonal }
		],
		tracker: [
			{ title: 'todo.title', link: '/todo', icon: mdiClipboardTextOutline }
			/*{ title: 'Ascension', link: '/ascension', icon: mdiStar },
			{ title: 'Fishing', link: '/fishing', icon: mdiFish },
			{ title: 'Furnishing', link: '/furnishing', icon: mdiBedKing },
			{ title: 'Achievement', link: '/achievement', icon: mdiPartyPopper },
			{ title: 'Books', link: '/books', icon: mdiBookshelf },
			{ title: 'Recipes', link: '/recipes', icon: mdiFood },
			{ title: 'Spin Crystals', link: '/spin-crystals', icon: mdiDisc }*/
		],
		tools: [
			/*	{ title: 'Reminder', link: '/reminder', icon: mdiAlarm },
			{ title: 'Timeline', link: '/timeline', icon: mdiChartTimeline },
			{ title: 'TCG', link: '/tcg', icon: mdiCards }*/
			{
				title: 'map.title',
				link: 'https://act.hoyolab.com/ys/app/interactive-map/index.html',
				icon: mdiMap,
				external: true
			}
		]
	};

	let isSidebarOpen = false;

	const openSidebar = () => {
		isSidebarOpen = true;
	};

	const closeSidebar = () => {
		isSidebarOpen = false;
	};

	const backend = BackendService.getInstance();
</script>

<div
	class={`fixed flex w-full ${isSidebarOpen ? 'sm:w-72' : 'sm:w-20'} xl:w-72 ${isSidebarOpen ? 'h-full' : 'h-16'} gap-2.5 sm:h-full flex-col z-50 p-2.5 xl:p-5 xl:pl-10 max-sm:px-5 sm:max-xl:pr-0 sm:max-xl:py-5 bg-tertiary ${isSidebarOpen ? '' : 'max-sm:rounded-b-xl'} sm:rounded-r-xl transition-all`}
>
	<div
		class={`flex ${isSidebarOpen ? 'flex-row' : 'sm:max-xl:flex-col'} items-center justify-between gap-2.5 sm:max-xl:mr-2.5`}
	>
		<div class="flex flex-row items-center">
			<img alt="Stormterror flying" class={`rounded-full w-10 h-10`} src={logo} />
			<a class={`ml-2 ${isSidebarOpen ? '' : 'sm:max-xl:hidden'}`} href="/">
				<Text type="h1">dval.in</Text>
			</a>
		</div>

		<div class="xl:hidden">
			{#if isSidebarOpen}
				<Button variant="ghost" on:click={closeSidebar}>
					<Icon path={mdiCloseCircle} />
				</Button>
			{/if}
			{#if !isSidebarOpen}
				<Button variant="ghost" on:click={openSidebar}>
					<Icon path={mdiMenu} />
				</Button>
			{/if}
		</div>
	</div>

	<div
		class={`overflow-y-auto flex flex-col flex-1 gap-1 max-sm:h-full pr-1 ${isSidebarOpen ? '' : 'max-sm:max-h-0 max-sm:overflow-hidden'} scrollbar-gutter`}
	>
		<SidebarEntry
			icon={mdiHome}
			{isSidebarOpen}
			link={'/'}
			on:click={closeSidebar}
			title={$i18n.t('dashboard.title')}
		/>
		<SidebarEntry
			icon={mdiStar}
			{isSidebarOpen}
			link={'/wish-statistics/overview'}
			on:click={closeSidebar}
			title={$i18n.t('wish.overview.title')}
		/>

		<SidebarCategory
			{closeSidebar}
			forceOpen={!isSidebarOpen}
			{isSidebarOpen}
			paths={paths.collection}
			title={$i18n.t('navigation.category.collection')}
		/>
		<SidebarCategory
			{closeSidebar}
			forceOpen={!isSidebarOpen}
			{isSidebarOpen}
			paths={paths.tracker}
			title={$i18n.t('navigation.category.trackers')}
		/>
		<SidebarCategory
			{closeSidebar}
			forceOpen={!isSidebarOpen}
			{isSidebarOpen}
			paths={paths.tools}
			title={$i18n.t('navigation.category.tools')}
		/>

		<div class="mt-3">
			<Separator class={`bg-text mb-3 hidden ${isSidebarOpen ? '' : 'sm:max-xl:block'}`} />
			<SidebarEntry
				icon={mdiCog}
				{isSidebarOpen}
				link={'/settings'}
				on:click={closeSidebar}
				title={$i18n.t('settings.overview.title')}
			/>
		</div>
	</div>

	<div
		class={`flex ${isSidebarOpen ? 'flex-row' : 'sm:max-xl:flex-col xl:flex-row'} gap-2.5 items-center sm:max-xl:mr-2.5 ${isSidebarOpen ? '' : 'max-sm:max-h-0 max-sm:overflow-hidden'}`}
	>
		{#if $applicationState.isAuthenticated}
			<SidebarEntry
				icon={mdiLogout}
				{isSidebarOpen}
				link=""
				on:click={() => {
					backend.auth.logout();
				}}
				title={$i18n.t('navigation.logout')}
			/>
		{:else}
			<SidebarEntry
				class="flex"
				icon={mdiAccount}
				{isSidebarOpen}
				link={'/login'}
				on:click={closeSidebar}
				title={$i18n.t('navigation.login')}
			/>
		{/if}

		<LanguageSwitcher />
	</div>
</div>

<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	role="button"
	class={`bg-black/80 z-40 transition-all fixed top-0 left-0 right-0 bottom-0 ${isSidebarOpen ? '' : 'hidden'}`}
	on:click={closeSidebar}
/>
