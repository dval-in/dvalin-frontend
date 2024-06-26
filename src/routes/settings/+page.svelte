<script lang="ts">
	import { get } from 'svelte/store';
	import Text from '$lib/components/typography/Text.svelte';
	import { applicationState } from '$lib/store/application_state';
	import IconButton from '$lib/components/ui/icon-button/IconButton.svelte';
	import { mdiExport, mdiImport } from '@mdi/js';
	import type { Theme } from '$lib/types/theme';
	import { Button } from '$lib/components/ui/button';
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import i18n from '$lib/services/i18n';
	import { userProfile } from '$lib/store/user_profile';

	const handleSettingsExport = () => {
		let element = document.createElement('a');
		element.setAttribute(
			'href',
			'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(get(userProfile)))
		);
		element.setAttribute('download', 'settings.json');
		element.style.display = 'none';

		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	};

	// Function to change theme to selected
	function changeThemeTo(themeName: Theme) {
		applicationState.update((state) => {
			return {
				...state,
				settings: {
					...state.settings,
					theme: themeName
				}
			};
		});
	}
</script>

<DefaultLayout title={$i18n.t('settings.overview.title')}>
	<div class="flex flex-col gap-2">
		<Text type="h3">{$i18n.t('settings.category.theming.title')}</Text>
		<div class="flex flex-row gap-4">
			<Button
				class={`flex w-[150px] h-[200px] ${$applicationState.settings.theme === 'light' ? 'bg-neutral border-primary' : 'bg-text border-text'} justify-start items-end p-2 border-4 rounded-md`}
				on:click={() => changeThemeTo('light')}
			>
				<Text
					class={`${$applicationState.settings.theme === 'light' ? 'text-text' : 'text-neutral'}`}
					type="h3"
				>
					{$i18n.t('theme.light.title')}
				</Text>
			</Button>
			<Button
				class={`flex w-[150px] h-[200px] ${$applicationState.settings.theme === 'dark' ? 'bg-neutral border-primary' : 'bg-text border-text text-neutral'} justify-start items-end p-2 border-4 rounded-md`}
				on:click={() => changeThemeTo('dark')}
			>
				<Text
					class={`${$applicationState.settings.theme === 'dark' ? 'text-text' : 'text-neutral'}`}
					type="h3"
				>
					{$i18n.t('theme.dark.title')}
				</Text>
			</Button>
		</div>
	</div>

	<div class="flex flex-col gap-2">
		<Text type="h3">{$i18n.t('settings.category.data.title')}</Text>

		<div class="flex flex-row gap-4">
			{#if !$applicationState.isAuthenticated}
				<IconButton href="/settings/import" icon={mdiImport}>
					{$i18n.t('settings.category.data.import_data_button')}
				</IconButton>
			{/if}
			<IconButton icon={mdiExport} on:click={handleSettingsExport}>
				{$i18n.t('settings.category.data.export_data_button')}
			</IconButton>
		</div>
	</div>
</DefaultLayout>
