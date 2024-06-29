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
	import BackendService from '$lib/services/backend';
	import { siGoogle, siDiscord, siMicrosoft, siGithub } from 'simple-icons';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import { CardHeader, CardTitle, CardContent } from '$lib/components/ui/card';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	const backend = BackendService.getInstance();
	$: createConfigMutation = backend.user.updateConfig();

	const nav = (url: string) => {
		window.location.href = url;
	};

	const loginOptions = [
		{ name: 'Google', icon: siGoogle, action: () => nav(backend.auth.login('google')) },
		{ name: 'Discord', icon: siDiscord, action: () => nav(backend.auth.login('discord')) },
		{
			name: 'Microsoft',
			icon: siMicrosoft,
			action: () => nav(backend.auth.login('microsoft'))
		},
		{ name: 'Github', icon: siGithub, action: () => nav(backend.auth.login('github')) }
	];

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
	const userProfil = get(userProfile);
	const user = userProfil.account;
	const settings = userProfil.config;
	console.log('her', userProfil);
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

	function handleSave() {
		$createConfigMutation.mutate({
			config: { ...settings }
		});
	}
	const bgImageUrl = '/xiao_temp.png';
</script>

<DefaultLayout title={$i18n.t('settings.overview.title')}>
	<div class="grid grid-cols-3 gap-4">
		<Card class=" col-span-2 overflow-hidden relative">
			<div
				class="absolute inset-0 bg-cover bg-center z-0"
				style="background-image: url('{bgImageUrl}');"
			></div>
			<div
				class="relative z-10 h-full grid grid-cols-2 items-center bg-black bg-opacity-50 text-white p-6"
			>
				<CardHeader>
					<CardTitle class="text-5xl font-bold">{user.name}</CardTitle>
					<p class="text-sm opacity-75">UID: {user.uid}</p>
				</CardHeader>
				<CardContent class="space-y-2">
					<p>
						<span class="font-semibold">Server:</span>
						{user.server}
					</p>
					<p>
						<span class="font-semibold">Adventure Rank:</span>
						{user.ar}
					</p>
					<p>
						<span class="font-semibold">World Level:</span>
						{user.wl}
					</p>
					<p class="italic">"{user.signature}"</p>
				</CardContent>
			</div>
		</Card>
		<div>
			<Text
				class={`${$applicationState.settings.theme === 'dark' ? 'text-text' : 'text-neutral'}`}
				type="h3"
			>
				Profiles
			</Text>
			<div class="flex flex-col">
				<Button>
					<Text type="p">{`${user.name} - ${user.uid}`}</Text>
				</Button>
			</div>
		</div>
	</div>
	<div class="flex flex-col gap-2">
		<Text type="h3">Login providers</Text>
		<div class="grid grid-cols-2 gap-4">
			{#each loginOptions as option}
				<Button
					variant="outline"
					class="w-full justify-center hover:border-primary"
					on:click={option.action}
					disabled={userProfil?.auth?.includes(option.name)}
				>
					<Icon path={option.icon.path} class="mr-2" />
					{option.name}
				</Button>
			{/each}
		</div>
	</div>
	<div class="mt-6">
		<form on:submit|preventDefault={handleSave} class="space-y-4">
			<div class="flex flex-col gap-2">
				<Text type="h3">Auto Refine Settings</Text>
				<div class="flex flex-row gap-4">
					<div class="flex items-center space-x-2">
						<Checkbox id={'autoRefine3'} bind:checked={settings.autoRefine3} />
						<Label for={'autoRefine3'}>Auto Refine 3-star weapons</Label>
					</div>
					<div class="flex items-center space-x-2">
						<Checkbox id={'autoRefine4'} bind:checked={settings.autoRefine4} />
						<Label for={'autoRefine4'}>Auto Refine 4-star weapons</Label>
					</div>
					<div class="flex items-center space-x-2">
						<Checkbox id={'autoRefine5'} bind:checked={settings.autoRefine5} />
						<Label for={'autoRefine5'}>Auto Refine 5-star weapons</Label>
					</div>
				</div>
			</div>
			<Button
				type="submit"
				variant="outline"
				class="w-full justify-center hover:border-primary"
			>
				Save Settings
			</Button>
		</form>
	</div>
	<div class="flex flex-col gap-2 mb-2">
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
			<IconButton href="/settings/import" icon={mdiImport}>
				{$i18n.t('settings.category.data.import_data_button')}
			</IconButton>

			<IconButton icon={mdiExport} on:click={handleSettingsExport}>
				{$i18n.t('settings.category.data.export_data_button')}
			</IconButton>
		</div>
	</div>
</DefaultLayout>
