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

	// Function to download settings
	function download(filename: string, text: string) {
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		element.setAttribute('download', filename);

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	}

	// Function to change theme to selected
	function themeChange(themeNumber: number) {
		settings.update((n) => {
			n.global.theme = themeNumber;
			return n;
		});
		location.reload();
	}
</script>

<div>
	<div class="flex flex-col gap-y-3">
		<!--Here is the User Settings region-->
		<Card.Root>
			<Card.Header>
				<Card.Title style="font-size: 21px"><b><u>Log-In</u></b></Card.Title>
			</Card.Header>
			<Card.Content>
				<div
					class="flex items-center justify-center flex-col rounded-xl border-2 border-border bg-black/20"
				>
					<p style="font-size: 18px"><b><u>Currently Logged Out</u></b></p>
					<Button href="login" class="m-5" variant="default"><u>Sign In</u></Button>
				</div>
			</Card.Content>
			<Card.Header>
				<!--TODO: Replace this with i18n key-->
				<Card.Title style="font-size: 21px; color:"><b><u>User Settings</u></b></Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="rounded-xl border-2 border-border bg-black/20">
					<p style="font-size: 18px"><b><u> Themes </u></b></p>
					<br />
					<input
						type="radio"
						id="option1"
						name="theme"
						value="option1"
						on:click={() => themeChange(0)}
					/>
					<label for="option1">Abyss</label>
					<br />

					<input
						type="radio"
						id="option2"
						name="theme"
						value="option2"
						on:click={() => themeChange(1)}
					/>
					<label for="option2">Light</label>
					<br />

					<input
						type="radio"
						id="option3"
						name="theme"
						value="option3"
						on:click={() => themeChange(2)}
					/>
					<label for="option3">Fontaine</label>
					<br />

					<input
						type="radio"
						id="option4"
						name="theme"
						value="option4"
						on:click={() => themeChange(3)}
					/>
					<label for="option4">Sumeru</label>
					<br />

					<input
						type="radio"
						id="option5"
						name="theme"
						value="option5"
						on:click={() => themeChange(4)}
					/>
					<label for="option5">Inazuma</label>
					<br />

					<input
						type="radio"
						id="option6"
						name="theme"
						value="option6"
						on:click={() => themeChange(5)}
					/>
					<label for="option6">Liyue</label>
					<br />

					<input
						type="radio"
						id="option7"
						name="theme"
						value="option7"
						on:click={() => themeChange(6)}
					/>
					<label for="option7">Mondstadt</label>
				</div>
			</Card.Content>
			<Card.Content>
				<div class="rounded-xl border-2 border-green-500 bg-black/20">
					<p style="font-size: 18px"><b><u> Accessibility </u></b></p>
					<br />
					<label for="option1">Increase Font Size (WIP)</label>
					<br />
					<div class="flex justify-evenly rounded-xl border-2 bg-black/20">
						<Button class="m-5" variant="default" on:click={() => themeChange(0)}>+</Button>
						<Button class="m-5" variant="default" on:click={() => themeChange(1)}>-</Button>
					</div>
				</div>
			</Card.Content>
		</Card.Root>
		<!--Here is the Global Settings region-->
		<Card.Root>
			<Card.Header>
				<!--TODO: Replace this with i18n key-->
				<Card.Title style="font-size: 21px"><b><u>Global Settings</u></b></Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="flex justify-evenly rounded-xl border-2 border-red-500 bg-black/20">
					<Button
						class="m-5"
						variant="default"
						on:click={() => handleSettingFileSelect(SettingFileMode.Import)}
						><u>Import Data</u></Button
					>
					<Button
						class="m-5"
						variant="default"
						on:click={() => handleSettingFileSelect(SettingFileMode.Export)}
						><u>Export Data<u></u></u></Button
					>
				</div>
			</Card.Content>
		</Card.Root>
	</div>
</div>
