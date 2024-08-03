<script lang="ts">
	import { get } from 'svelte/store';
	import Text from '$lib/components/typography/Text.svelte';
	import { applicationState } from '$lib/store/application_state';
	import IconButton from '$lib/components/ui/icon-button/IconButton.svelte';
	import { mdiDelete, mdiExport, mdiImport, mdiAlert, mdiMicrosoft } from '@mdi/js';
	import type { Theme } from '$lib/types/theme';
	import { Button } from '$lib/components/ui/button';
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import i18n from '$lib/services/i18n';
	import { userProfile } from '$lib/store/user_profile';
	import BackendService from '$lib/services/backend';
	import { siGoogle, siDiscord, siGithub, type SimpleIcon } from 'simple-icons';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import { CardHeader, CardTitle, CardContent } from '$lib/components/ui/card';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import {
		Dialog,
		DialogContent,
		DialogFooter,
		DialogHeader,
		DialogTitle,
		DialogTrigger
	} from '$lib/components/ui/dialog';
	import { nav } from '$lib/utils/nav_helper';
	const backend = BackendService.getInstance();
	const createConfigMutation = backend.user.updateConfig();
	const deleteProfileMutation = backend.user.deleteUserProfile();

	const loginOptions = [
		{ name: 'Google', icon: siGoogle, action: () => nav(backend.auth.login('google')) },
		{ name: 'Discord', icon: siDiscord, action: () => nav(backend.auth.login('discord')) },
		{
			name: 'Microsoft',
			icon: mdiMicrosoft,
			action: () => nav(backend.auth.login('microsoft'))
		},
		{ name: 'Github', icon: siGithub, action: () => nav(backend.auth.login('github')) }
	];

	const isSimpleIcon = (icon: string | SimpleIcon): icon is SimpleIcon => {
		return typeof icon === 'object' && 'path' in icon;
	};

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
	const userProfil = $userProfile;
	const user = userProfil.account;
	const settings = userProfil.config;
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
			config: { ...get(userProfile).config }
		});
	}
	// TODO : fix this once we have image on s3
	const bgImageUrl = get(userProfile).account.namecard;

	async function handleDelete(): Promise<void> {
		const result = await $deleteProfileMutation.mutateAsync();
		if (result.state === 'SUCCESS') {
			backend.auth.logout();
		}
	}
</script>

<DefaultLayout title={$i18n.t('settings.overview.title')}>
	{#if $applicationState.isAuthenticated}
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
			<Text type="h3">{$i18n.t('settings.login_providers')}</Text>
			<div class="grid grid-cols-2 gap-4">
				{#each loginOptions as option}
					<Button
						variant="outline"
						class="w-full justify-center hover:border-primary"
						on:click={option.action}
						disabled={userProfil?.auth?.includes(option.name)}
					>
						<Icon
							path={isSimpleIcon(option.icon) ? option.icon.path : option.icon}
							class="mr-2"
						/>
						{option.name}
					</Button>
				{/each}
			</div>
		</div>
		<div class="mt-6">
			<form on:submit|preventDefault={handleSave} class="space-y-4">
				<div class="flex flex-col gap-2">
					<Text type="h3">{$i18n.t('settings.auto_refine_settings')}</Text>
					<div class="flex flex-row gap-4">
						<div class="flex items-center space-x-2">
							<Checkbox id={'autoRefine3'} bind:checked={settings.autoRefine3} />
							<Label for={'autoRefine3'}>
								{$i18n.t('settings.auto_refine_3_star')}
							</Label>
						</div>
						<div class="flex items-center space-x-2">
							<Checkbox id={'autoRefine4'} bind:checked={settings.autoRefine4} />
							<Label for={'autoRefine4'}>
								{$i18n.t('settings.auto_refine_4_star')}
							</Label>
						</div>
						<div class="flex items-center space-x-2">
							<Checkbox id={'autoRefine5'} bind:checked={settings.autoRefine5} />
							<Label for={'autoRefine5'}>
								{$i18n.t('settings.auto_refine_5_star')}
							</Label>
						</div>
					</div>
				</div>
				<Button
					type="submit"
					variant="outline"
					class="w-full justify-center hover:border-primary"
				>
					{$i18n.t('settings.save_settings')}
				</Button>
			</form>
		</div>
	{/if}
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
	{#if $applicationState.isAuthenticated}
		<div class="flex flex-col gap-2">
			<Text type="h3">{$i18n.t('settings.category.data.title')}</Text>

			<div class="flex flex-row gap-4">
				<IconButton href="/settings/import" icon={mdiImport}>
					{$i18n.t('settings.category.data.import_data_button')}
				</IconButton>

				<IconButton icon={mdiExport} on:click={handleSettingsExport}>
					{$i18n.t('settings.category.data.export_data_button')}
				</IconButton>
				<Dialog>
					<DialogTrigger>
						<IconButton icon={mdiDelete} class="bg-red-500 hover:bg-red-600">
							Delete account
						</IconButton>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<div class="flex flex-row items-center gap-2">
								<Icon path={mdiAlert} />
								<DialogTitle>Delete account</DialogTitle>
							</div>
						</DialogHeader>
						<p>
							Are you sure you want to delete your account? This action is
							irreversible and all data will be lost.
						</p>
						<DialogFooter>
							<Button on:click={handleDelete} class="bg-red-500 hover:bg-red-600">
								Delete account
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	{/if}
</DefaultLayout>
