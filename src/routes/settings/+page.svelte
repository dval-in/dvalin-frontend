<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { settings } from '$lib/store/global_state';
	import { get } from 'svelte/store';
	import { type Settings, Convert as SettingsConvertor } from '$lib/structs/settings';

	enum SettingFileMode {
		Import,
		Export
	}
	// Function to handle file selection
	function handleSettingFileSelect(mode: SettingFileMode) {
		// Import settings from file
		if (mode === SettingFileMode.Import) {
			const inputDom = document.createElement('input');
			inputDom.type = 'file';
			inputDom.onchange = (event) => {
				const target = event.target as HTMLInputElement;
				if (target.files) {
					const file = target.files[0];
					// Handle file operations here
					file.text().then((text) => {
						let importedSettings: Settings = SettingsConvertor.toSettings(text);
						settings.set(importedSettings);
					});
				}
			};
			inputDom.click();
		} else {
			// Export settings to file
			let currentSettings: Settings = get(settings);
			download('settings.json', SettingsConvertor.settingsToJson(currentSettings));
		}
	}

	console.log(get(settings));

	function download(filename: string, text: string) {
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		element.setAttribute('download', filename);

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	}
</script>

<div>
	<div class="flex flex-col gap-y-3">
		<!--Here is the User Settings region-->
		<Card.Root>
			<Card.Header>
				<!--TODO: Replace this with i18n key-->
				<Card.Title>User Settings</Card.Title>
			</Card.Header>
			<Card.Content></Card.Content>
		</Card.Root>
		<!--Here is the Global Settings region-->
		<Card.Root>
			<Card.Header>
				<!--TODO: Replace this with i18n key-->
				<Card.Title>Global Settings</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="rounded-xl border-2 border-red-500">
					<Button
						class="m-2"
						variant="destructive"
						on:click={() => handleSettingFileSelect(SettingFileMode.Import)}
						>Import settings from file</Button
					>
					<Button
						class="m-2"
						variant="default"
						on:click={() => handleSettingFileSelect(SettingFileMode.Export)}
						>Export settings to file</Button
					>
				</div>
			</Card.Content>
		</Card.Root>
	</div>
</div>

<style>
	/* Add any styling here if needed */
</style>
