<script lang="ts">
	import { get } from 'svelte/store';
	import Text from '$lib/components/typography/Text.svelte';
	import { applicationState } from '$lib/store/application_state';
	import IconButton from '$lib/components/ui/icon-button/IconButton.svelte';
	import {
		mdiAlert,
		mdiContentSave,
		mdiDelete,
		mdiExport,
		mdiImport,
		mdiMicrosoft
	} from '@mdi/js';
	import type { Theme } from '$lib/types/theme';
	import { Button } from '$lib/components/ui/button';
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import i18n from '$lib/services/i18n';
	import { userProfile } from '$lib/store/user_profile';
	import S3Service from '$lib/services/s3';
	import BackendService from '$lib/services/backend';
	import { siDiscord, siGithub, siGoogle, type SimpleIcon } from 'simple-icons';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
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
	import { Switch } from '$lib/components/ui/switch';

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

	const config = get(userProfile)?.config ?? {
		autoRefine3: false,
		autoRefine4: false,
		autoRefine5: false,
		preferedLanguage: 'EN'
	};
	$: $userProfile.config = config;

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
	const bgImageUrl = S3Service.getNamecard(
		get(userProfile).account?.namecard ?? 'Arlecchino'
	).url;

	async function handleDelete(): Promise<void> {
		const result = await $deleteProfileMutation.mutateAsync();
		if (result.state === 'SUCCESS') {
			backend.auth.logout();
		}
	}
</script>

<DefaultLayout title={$i18n.t('settings.overview.title')}>
	<svelte:fragment slot="titlebarActions">
		<IconButton icon={mdiContentSave} on:click={handleSave}>
			{$i18n.t('settings.save_settings')}
		</IconButton>
	</svelte:fragment>

	{#if $applicationState.isAuthenticated}
		<div class="flex flex-1 gap-4 flex-wrap max-sm:flex-col">
			<Card
				class="p-0 sm:p-0 flex flex-1 relative flex-wrap object-cover bg-no-repeat bg-cover bg-center"
				style={`background-image: url('${bgImageUrl}');`}
			>
				<div
					class="flex flex-1 flex-col z-10 items-center text-white p-2 sm:p-4 gap-6 bg-neutral bg-opacity-40"
				>
					<div class="flex">
						<img src={bgImageUrl} class="size-52 rounded-full object-cover" alt="" />
					</div>
					<div class="flex gap-6">
						<div class="flex flex-col gap-2">
							<div>
								<Text type="h1">{$userProfile.account?.name}</Text>
								<Text type="small">UID: {$userProfile.account?.uid}</Text>
							</div>
							<Text type="p">"{$userProfile.account?.signature}"</Text>
						</div>
						<div class="flex gap-2 flex-col">
							<div>
								<Text type="h4">Server:</Text>
								<Text type="p">{$userProfile.account?.server}</Text>
							</div>
							<div>
								<Text type="h4">Adventure Rank:</Text>
								<Text type="p">{$userProfile.account?.ar}</Text>
							</div>
							<div>
								<Text type="h4">World Level:</Text>
								<Text type="p">{$userProfile.account?.wl}</Text>
							</div>
						</div>
					</div>
				</div>
			</Card>
			<div class="flex flex-1 flex-col">
				<Text type="h3">Profiles</Text>
				<Button>
					<Text type="p">
						{`${$userProfile.account?.name} - ${$userProfile.account?.uid}`}
					</Text>
				</Button>
			</div>
		</div>
		<div class="flex flex-col gap-2">
			<Text type="h3">{$i18n.t('settings.login_providers')}</Text>
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{#each loginOptions as option}
					<IconButton
						icon={isSimpleIcon(option.icon) ? option.icon.path : option.icon}
						variant="outline"
						class="w-full justify-center hover:border-primary"
						on:click={option.action}
						disabled={$userProfile?.auth?.includes(option.name) ?? true}
					>
						{option.name}
					</IconButton>
				{/each}
			</div>
		</div>
		<div class="mt-6">
			<form on:submit|preventDefault={handleSave} class="space-y-4">
				<div class="flex flex-col gap-2">
					<Text type="h3">{$i18n.t('settings.auto_refine_settings')}</Text>
					<div class="flex flex-col gap-4">
						<div class="flex items-center space-x-2">
							<Switch
								id="autoRefine3"
								bind:checked={$userProfile.config.autoRefine3}
							/>
							<Label for={'autoRefine3'}>
								{$i18n.t('settings.auto_refine_3_star')}
							</Label>
						</div>
						<div class="flex items-center space-x-2">
							<Switch
								id="autoRefine4"
								bind:checked={$userProfile.config.autoRefine4}
							/>
							<Label for={'autoRefine4'}>
								{$i18n.t('settings.auto_refine_4_star')}
							</Label>
						</div>
						<div class="flex items-center space-x-2">
							<Switch
								id="autoRefine5"
								bind:checked={$userProfile.config.autoRefine5}
							/>
							<Label for={'autoRefine5'}>
								{$i18n.t('settings.auto_refine_5_star')}
							</Label>
						</div>
					</div>
				</div>
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
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<Text type="h3">{$i18n.t('settings.category.danger_zone.title')}</Text>

			<div class="flex flex-row gap-4">
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
