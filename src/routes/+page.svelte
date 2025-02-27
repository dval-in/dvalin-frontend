<script lang="ts">
	import Text from '$lib/components/typography/Text.svelte';
	import i18n from '$lib/services/i18n';
	import DragDropList from '$lib/components/ui/dragdrop/DragDropList.svelte';
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import IconButton from '$lib/components/ui/icon-button/IconButton.svelte';
	import { mdiPencil } from '@mdi/js';
	import {
		AlertDialog,
		AlertDialogCancel,
		AlertDialogContent,
		AlertDialogDescription,
		AlertDialogFooter,
		AlertDialogHeader,
		AlertDialogTitle
	} from '$lib/components/ui/alert-dialog/index';
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogHeader,
		DialogTitle,
		DialogTrigger
	} from '$lib/components/ui/dialog';
	import ChangelogWidget from '$lib/components/widgets/ChangelogWidget.svelte';
	import ReminderWidget from '$lib/components/widgets/ReminderWidget.svelte';
	import EventsWidget from '$lib/components/widgets/EventsWidget.svelte';
	import TodoWidget from '$lib/components/widgets/TodoWidget.svelte';
	import DomainWidget from '$lib/components/widgets/DomainWidget.svelte';
	import AchievementsWidget from '$lib/components/widgets/AchievementsWidget.svelte';
	import PityWidget from '$lib/components/widgets/PityWidget.svelte';
	import WishingWidget from '$lib/components/widgets/WishingWidget.svelte';
	import DisplayWidget from '$lib/components/widgets/DisplayWidget.svelte';
	import GlobalWishingStatsWidget from '$lib/components/widgets/GlobalWishingStatsWidget.svelte';
	import ResinTrackerWidget from '$lib/components/widgets/ResinTrackerWidget.svelte';

	$: changeLogWidget = $i18n.t('dashboard.widget.changelog.title');
	$: reminderWidget = $i18n.t('dashboard.widget.reminder.title');
	$: eventsWidget = $i18n.t('dashboard.widget.events.title');
	$: todoWidget = $i18n.t('dashboard.widget.todo.title');
	$: domainWidget = $i18n.t('dashboard.widget.domain.title');
	$: achievementsWidget = $i18n.t('dashboard.widget.achievements.title');
	$: pityWidget = $i18n.t('dashboard.widget.pity.title');
	$: wishingWidget = $i18n.t('dashboard.widget.wishing.title');
	$: displayWidget = $i18n.t('dashboard.widget.display.title');
	$: globalWishingWidget = $i18n.t('dashboard.widget.global_wishing.title');
	$: resinWidget = $i18n.t('dashboard.widget.resin.title');

	$: dragDropList = [
		{ id: 0, check: changeLogWidget, checked: true },
		{ id: 1, check: reminderWidget, checked: true },
		{ id: 2, check: eventsWidget, checked: true },
		{ id: 3, check: todoWidget, checked: true },
		{ id: 4, check: domainWidget, checked: true },
		{ id: 5, check: achievementsWidget, checked: true },
		{ id: 6, check: pityWidget, checked: true },
		{ id: 7, check: wishingWidget, checked: true },
		{ id: 8, check: displayWidget, checked: true },
		{ id: 9, check: globalWishingWidget, checked: true },
		{ id: 10, check: resinWidget, checked: true }
	];

	let firstTimeUser = false;
</script>

<AlertDialog open={firstTimeUser}>
	<AlertDialogContent>
		<AlertDialogHeader>
			<AlertDialogTitle>{$i18n.t('dashboard.welcome.title')}</AlertDialogTitle>
			<AlertDialogDescription>
				{$i18n.t('dashboard.welcome.message')}
			</AlertDialogDescription>
		</AlertDialogHeader>
		<AlertDialogFooter>
			<AlertDialogCancel>{$i18n.t('action.cancel')}</AlertDialogCancel>
		</AlertDialogFooter>
	</AlertDialogContent>
</AlertDialog>

<DefaultLayout title={$i18n.t('dashboard.title')}>
	<svelte:fragment slot="titlebarActions">
		<Dialog>
			<DialogTrigger>
				<IconButton icon={mdiPencil}>{$i18n.t('dashboard.edit_layout.button')}</IconButton>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						<Text type="h3">{$i18n.t('dashboard.edit_layout.title')}</Text>
					</DialogTitle>
					<DialogDescription>
						<Text type="p">{$i18n.t('dashboard.edit_layout.description')}</Text>
					</DialogDescription>
				</DialogHeader>
				<div>
					<DragDropList bind:data={dragDropList} />
				</div>
			</DialogContent>
		</Dialog>
	</svelte:fragment>
	<div>
		<div
			class="h-fit gap-2 [column-count:auto] [column-width:370px] [&>div:not(:first-child)]:mt-2 [&>div]:break-inside-avoid"
		>
			{#each dragDropList as Widget}
				{#if Widget.check === `${$i18n.t('dashboard.widget.changelog.title')}` && Widget.checked === true}
					<ChangelogWidget />
				{:else if Widget.check === `${$i18n.t('dashboard.widget.reminder.title')}` && Widget.checked === true}
					<ReminderWidget />
				{:else if Widget.check === `${$i18n.t('dashboard.widget.events.title')}` && Widget.checked === true}
					<EventsWidget />
				{:else if Widget.check === `${$i18n.t('dashboard.widget.todo.title')}` && Widget.checked === true}
					<TodoWidget />
				{:else if Widget.check === `${$i18n.t('dashboard.widget.domain.title')}` && Widget.checked === true}
					<DomainWidget />
				{:else if Widget.check === `${$i18n.t('dashboard.widget.achievements.title')}` && Widget.checked === true}
					<AchievementsWidget />
				{:else if Widget.check === `${$i18n.t('dashboard.widget.pity.title')}` && Widget.checked === true}
					<PityWidget />
				{:else if Widget.check === `${$i18n.t('dashboard.widget.wishing.title')}` && Widget.checked === true}
					<WishingWidget />
				{:else if Widget.check === `${$i18n.t('dashboard.widget.display.title')}` && Widget.checked === true}
					<DisplayWidget />
				{:else if Widget.check === `${$i18n.t('dashboard.widget.global_wishing.title')}` && Widget.checked === true}
					<GlobalWishingStatsWidget />
				{:else if Widget.check === `${$i18n.t('dashboard.widget.resin.title')}` && Widget.checked === true}
					<ResinTrackerWidget />
				{/if}
			{/each}
		</div>
	</div>
</DefaultLayout>
