<script lang="ts">
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import BackendService from '$lib/services/backend';
	import { mdiAccount, mdiAlert, mdiDevices, mdiMicrosoft, mdiServer } from '@mdi/js';
	import { siDiscord, siGithub, siGoogle, type SimpleIcon } from 'simple-icons';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import i18n from '$lib/services/i18n';
	import { Alert, AlertDescription, AlertTitle } from '$lib/components/ui/alert';
	import { Button } from '$lib/components/ui/button';

	const backend = BackendService.getInstance();

	const nav = (url: string) => {
		window.location.href = url;
	};

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

	const perks = [
		{
			icon: mdiDevices,
			title: 'login.perk.cross_device_sync.title',
			description: 'login.perk.cross_device_sync.description'
		},
		{
			icon: mdiServer,
			title: 'login.perk.server_access.title',
			description: 'login.perk.server_access.description'
		},
		{
			icon: mdiAccount,
			title: 'login.perk.personal_profile.title',
			description: 'login.perk.personal_profile.description'
		}
	];
</script>

<DefaultLayout title={$i18n.t('login.title')}>
	<div class="flex flex-col sm:flex-row gap-6 items-start">
		<div class="flex-1 space-y-6">
			{#each perks as perk}
				<div class="flex items-center gap-4">
					<Icon class="size-32" path={perk.icon} />
					<div>
						<h4 class="text-lg font-semibold">{$i18n.t(perk.title)}</h4>
						<p class="text-sm text-muted-foreground">{$i18n.t(perk.description)}</p>
					</div>
				</div>
			{/each}
		</div>
		<div class="flex-1 space-y-6">
			<Alert variant="destructive">
				<Icon path={mdiAlert} />
				<AlertTitle>{$i18n.t('login.alert.title')}</AlertTitle>
				<AlertDescription>{$i18n.t('login.alert.description')}</AlertDescription>
			</Alert>
			{#each loginOptions as option}
				<Button variant="outline" class="w-full justify-center" on:click={option.action}>
					<Icon
						path={isSimpleIcon(option.icon) ? option.icon.path : option.icon}
						class="mr-2"
					/>
					{option.name}
				</Button>
			{/each}
		</div>
	</div>
</DefaultLayout>
