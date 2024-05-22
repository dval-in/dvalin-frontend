<script lang="ts">
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import { toast } from 'svelte-sonner';
	import IconButton from '$lib/components/ui/icon-button/IconButton.svelte';
	import { mdiAlert, mdiFile, mdiImport } from '@mdi/js';
	import { Tabs, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import ImporterService, { type ImporterServices } from '$lib/services/importer';
	import { Button } from '$lib/components/ui/button';
	import {
		AlertDialog,
		AlertDialogContent,
		AlertDialogDescription,
		AlertDialogFooter,
		AlertDialogHeader,
		AlertDialogTitle
	} from '$lib/components/ui/alert-dialog';
	import { Alert, AlertDescription, AlertTitle } from '$lib/components/ui/alert';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import { goto } from '$app/navigation';
	import Text from '$lib/components/typography/Text.svelte';
	import i18n from '$lib/services/i18n';
	import { userProfile } from '$lib/store/user_profile';
	import { applicationState } from '$lib/store/application_state';

	let value: ImporterServices = 'dvalin';
	const importerService = new ImporterService();
	let file: File | undefined = undefined;
	let dialogOpen = false;

	const selectFile = () => {
		let element = document.createElement('input');
		element.type = 'file';
		element.style.display = 'none';
		element.onchange = (event) => {
			const target = event.target as HTMLInputElement;
			if (target.files && target.files.length === 1) {
				file = target.files[0];
			}
		};

		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	};

	const handleSettingsImport = () => {
		dialogOpen = false;
		if (file !== undefined) {
			file.text().then((fileContent) => {
				try {
					let data = JSON.parse(fileContent);
					const importedUserProfile = importerService
						.getImporterService(value)
						.import(data);

					userProfile.set(importedUserProfile);
					toast.success('Imported successfully!', {
						description:
							'Your data has been imported successfully and stored locally in your Browser'
					});
					goto('/settings');
				} catch (e) {
					toast.error('An error happened!', {
						description: e.message
					});
				}
			});
		}
	};
</script>

<DefaultLayout
	title={$i18n.t('settings.import.title')}
	showRequirements={$applicationState.isAuthenticated}
>
	<svelte:fragment slot="requirements">
		<Text type="h3">Imports are temporarily disabled while being logged in</Text>
	</svelte:fragment>

	<Tabs bind:value>
		<TabsList>
			<TabsTrigger value="dvalin">Dval.in</TabsTrigger>
			<TabsTrigger value="paimon">Paimon.moe</TabsTrigger>
		</TabsList>
	</Tabs>

	<div class="flex items-center gap-2">
		<IconButton icon={mdiFile} on:click={selectFile}>
			{$i18n.t('action.select_file')}
		</IconButton>
		{#if file !== undefined}
			{file?.name}
		{:else}
			<Text type="p">{$i18n.t('settings.import.no_file_selected')}</Text>
		{/if}
	</div>

	<div class="flex flex-col gap-2">
		<Alert class="gap-6">
			<Icon class="fill-red-500" path={mdiAlert} />
			<AlertTitle>{$i18n.t('settings.import.warning.title')}</AlertTitle>
			<AlertDescription>{$i18n.t('settings.import.warning.description')}</AlertDescription>
		</Alert>
		<IconButton
			disabled={file === undefined}
			icon={mdiImport}
			on:click={() => {
				dialogOpen = true;
			}}
		>
			{$i18n.t('settings.import.start_import_button')}
		</IconButton>
	</div>
</DefaultLayout>

<AlertDialog bind:open={dialogOpen}>
	<AlertDialogContent class="sm:max-w-[425px]">
		<AlertDialogHeader>
			<AlertDialogTitle>
				{$i18n.t('settings.import.confirmation_dialog.title')}
			</AlertDialogTitle>
			<AlertDialogDescription>
				{$i18n.t('settings.import.confirmation_dialog.description')}
			</AlertDialogDescription>
		</AlertDialogHeader>

		<AlertDialogFooter>
			<Button
				on:click={() => {
					dialogOpen = false;
				}}
				variant="outline"
			>
				{$i18n.t('action.no')}
			</Button>
			<Button on:click={handleSettingsImport}>{$i18n.t('action.yes')}</Button>
		</AlertDialogFooter>
	</AlertDialogContent>
</AlertDialog>
