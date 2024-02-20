<script lang="ts">
	import { get } from 'svelte/store';
	import Text from '$lib/components/typography/Text.svelte';
	import { applicationState } from '$lib/store/global_state';
	import IconButton from '$lib/components/ui/icon-button/IconButton.svelte';
	import { mdiExport, mdiImport } from '@mdi/js';
	import type { Theme } from '$lib/structs/theme';
	import type { PaimonData } from '$lib/structs/paimon_data';
	import ConverterService from '$lib/services/converter';
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';

	function handleSettingsImport() {
		let element = document.createElement('input');
		element.type = 'file';
		element.style.display = 'none';
		element.onchange = (event) => {
			const target = event.target as HTMLInputElement;
			if (target.files) {
				const file = target.files[0];
				// Handle file operations here
				file.text().then((text) => {
					try {
						let paimonData: PaimonData = JSON.parse(text);
						applicationState.set(
							ConverterService.convertPaimonDataToApplicationState(
								paimonData,
								$applicationState.settings
							)
						);
						toast.success('Imported successfully!', {
							description:
								'Your data has been imported successfully and stored locally in your Browser'
						});
					} catch (e) {
						toast.error('An error happened!', {
							description: 'Make sure you upload the right file format'
						});
					}
				});
			}
		};

		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}

	const handleSettingsExport = () => {
		let element = document.createElement('a');
		element.setAttribute(
			'href',
			'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(get(applicationState)))
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

<div class="flex flex-1 flex-col gap-6">
	<Text type="h1">Settings</Text>

	<div class="flex flex-col gap-2">
		<Text type="h3">Theming</Text>
		<div class="flex flex-row gap-4">
			<Button
				class={`flex w-[150px] h-[200px] ${$applicationState.settings.theme === 'light' ? 'bg-neutral border-primary' : 'bg-text border-text'} justify-start items-end p-2 border-4 rounded-md`}
				on:click={() => changeThemeTo('light')}
			>
				<Text
					textColor={`${$applicationState.settings.theme === 'light' ? 'text' : 'neutral'}`}
					type="h3"
				>
					Light
				</Text>
			</Button>
			<Button
				class={`flex w-[150px] h-[200px] ${$applicationState.settings.theme === 'dark' ? 'bg-neutral border-primary' : 'bg-text border-text text-neutral'} justify-start items-end p-2 border-4 rounded-md`}
				on:click={() => changeThemeTo('dark')}
			>
				<Text
					textColor={`${$applicationState.settings.theme === 'dark' ? 'text' : 'neutral'}`}
					type="h3"
				>
					Dark
				</Text>
			</Button>
		</div>
	</div>

	<div class="flex flex-col gap-2">
		<Text type="h3">Data</Text>

		<div class="flex flex-row gap-4">
			<IconButton icon={mdiImport} onClick={handleSettingsImport}>Import Data</IconButton>
			<IconButton icon={mdiExport} onClick={handleSettingsExport}>Export Data</IconButton>
		</div>
	</div>
</div>
