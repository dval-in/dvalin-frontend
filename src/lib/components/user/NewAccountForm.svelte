<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { AlertCircle } from 'lucide-svelte';
	import { Alert, AlertDescription, AlertTitle } from '$lib/components/ui/alert';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import H3 from '$lib/components/typography/H3.svelte';

	import langFlagDE from '$lib/assets/languages/DE.svg';
	import langFlagEN from '$lib/assets/languages/EN.svg';
	import langFlagES from '$lib/assets/languages/ES.svg';
	import langFlagFR from '$lib/assets/languages/FR.svg';
	import langFlagIT from '$lib/assets/languages/IT.svg';
	import langFlagPT from '$lib/assets/languages/PT.svg';
	import langFlagPL from '$lib/assets/languages/PL.svg';
	import langFlagRU from '$lib/assets/languages/RU.svg';
	import langFlagTH from '$lib/assets/languages/TH.svg';
	import langFlagZHS from '$lib/assets/languages/ZHS.svg';
	import langFlagZHT from '$lib/assets/languages/ZHT.svg';

	// Props
	export let onSubmit: (data: { user: UserData; config: ConfigData }) => void;

	const languages = [
		{ code: 'en', name: 'English', flag: langFlagEN },
		{ code: 'de', name: 'Deutsch', flag: langFlagDE },
		{ code: 'es', name: 'Español', flag: langFlagES },
		{ code: 'fr', name: 'Français', flag: langFlagFR },
		{ code: 'it', name: 'Italiano', flag: langFlagIT },
		{ code: 'pt', name: 'Português', flag: langFlagPT },
		{ code: 'pl', name: 'Polski', flag: langFlagPL },
		{ code: 'ru', name: 'Русский', flag: langFlagRU },
		{ code: 'th', name: 'ไทย', flag: langFlagTH },
		{ code: 'zh-CN', name: '简体中文', flag: langFlagZHS },
		{ code: 'zh-TW', name: '繁體中文', flag: langFlagZHT }
	];

	interface UserData {
		uid: number;
	}

	interface ConfigData {
		autoRefine3: boolean;
		autoRefine4: boolean;
		autoRefine5: boolean;
		preferedLanguage: string;
	}

	let user: UserData = {
		uid: 1
	};

	let config: ConfigData = {
		autoRefine3: false,
		autoRefine4: false,
		autoRefine5: false,
		preferedLanguage: 'en'
	};

	let errors: Partial<{ uid: string }> = {};

	function validateForm(): boolean {
		errors = {};
		if (!user.uid || user.uid < 100000000 || user.uid > 999999999) {
			errors.uid = 'UID must be a 9-digit number';
		}
		return Object.keys(errors).length === 0;
	}

	function handleSubmit() {
		if (!validateForm()) {
			return;
		}
		onSubmit({ user, config });
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-4 col-span-2 p-5">
	{#if Object.keys(errors).length > 0}
		<Alert variant="destructive" class="mt-4">
			<AlertCircle class="h-4 w-4" />
			<AlertTitle>Error</AlertTitle>
			<AlertDescription>
				Please correct the errors in the form before submitting.
			</AlertDescription>
		</Alert>
	{/if}
	<div>
		<Label for="uid">UID</Label>
		<Input type="number" id="uid" bind:value={user.uid} />
		{#if errors.uid}
			<p class="text-red-500 text-sm mt-1">{errors.uid}</p>
		{/if}
	</div>
	<H3>Add configuration information (optional)</H3>
	<div>
		<Label>Auto Refine Settings</Label>
		<div class="space-y-2">
			<div class="flex items-center space-x-2">
				<Checkbox bind:checked={config.autoRefine3} id="autoRefine3" />
				<label for="autoRefine3">Auto Refine 3-star weapons</label>
			</div>
			<div class="flex items-center space-x-2">
				<Checkbox bind:checked={config.autoRefine4} id="autoRefine4" />
				<label for="autoRefine4">Auto Refine 4-star weapons</label>
			</div>
			<div class="flex items-center space-x-2">
				<Checkbox bind:checked={config.autoRefine5} id="autoRefine5" />
				<label for="autoRefine5">Auto Refine 5-star weapons</label>
			</div>
		</div>
	</div>

	<div>
		<Label for="language">Preferred Language</Label>
		<div class="grid grid-cols-2 gap-2 mt-2">
			{#each languages as lang}
				<Button
					type="button"
					variant={config.preferedLanguage === lang.code ? 'default' : 'outline'}
					class="flex items-center justify-start space-x-2"
					on:click={() => (config.preferedLanguage = lang.code)}
				>
					<img src={lang.flag} alt={lang.name} class="w-6 h-4" />
					<span>{lang.name}</span>
				</Button>
			{/each}
		</div>
	</div>

	<div class="flex space-x-4">
		<Button type="submit" class="flex-1 bg-primary text-primary-foreground">
			Complete Profile
		</Button>
	</div>
</form>
