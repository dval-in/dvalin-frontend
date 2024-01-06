<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { settings } from '$lib/store/global_state';
	import { get } from 'svelte/store';
	import { type Settings, Convert as SettingsConvertor } from '$lib/structs/settings';
	let categoryOn: string;

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
	function themeChange(themeNumber: number) {
		settings.update((n) => {
			n.global.theme = themeNumber;
			return n;
		});
		location.reload();
	}
</script>

{#key categoryOn}
	<div>
		<div class="flex flex-col gap-y-3">
			<!--Here is the User Settings region-->
			<Card.Root>
				<Card.Header>
					<!--TODO: Replace this with i18n key-->
					<Card.Title>User Settings</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="rounded-xl border-2 border-border bg-black/20">
						<input
							type="radio"
							id="option1"
							name="theme"
							value="option1"
							on:click={() => themeChange(0)}
							bind:group={categoryOn}
						/>
						<label for="option1">Blue</label>
						<br />

						<input
							type="radio"
							id="option2"
							name="theme"
							value="option2"
							on:click={() => themeChange(1)}
							bind:group={categoryOn}
						/>
						<label for="option2">Green</label>
						<br />

						<input
							type="radio"
							id="option3"
							name="theme"
							value="option3"
							on:click={() => themeChange(2)}
						/>
						<label for="option3">Yellow</label>
					</div>
				</Card.Content>
			</Card.Root>
			<!--Here is the Global Settings region-->
			<Card.Root>
				<Card.Header>
					<!--TODO: Replace this with i18n key-->
					<Card.Title>Global Settings</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="rounded-xl border-2 border-red-500 bg-black/20">
						<Button
							class="m-2"
							variant="destructive"
							on:click={() => handleSettingFileSelect(SettingFileMode.Import)}
							><u>Import settings from file</u></Button
							>
						<Button
							class="m-2"
							variant="default"
							on:click={() => handleSettingFileSelect(SettingFileMode.Export)}
							><u>Export settings to file<u></Button
							>
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
{/key}
