<script lang="ts">
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import BackendService from '$lib/services/backend';
	import Text from '$lib/components/typography/Text.svelte';
	import IconButton from '$lib/components/ui/icon-button/IconButton.svelte';
	import { mdiAccount, mdiDevices, mdiGithub, mdiGoogle, mdiMicrosoft, mdiServer } from '@mdi/js';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import i18n from '$lib/services/i18n';

	const backend = BackendService.getInstance();

	const nav = (url: string) => {
		window.location.href = url;
	};
</script>

<DefaultLayout title={$i18n.t('login.title')}>
	<div class="flex flex-1 flex-col sm:flex-row gap-6 items-center">
		<div class="flex flex-1 flex-col gap-6">
			<div class="flex flex-row gap-4 items-center">
				<Icon size={2} path={mdiDevices} />
				<div class="flex flex-1 flex-col">
					<Text type="h4">{$i18n.t('login.perk.cross_device_sync.title')}</Text>
					<Text type="p">
						{$i18n.t('login.perk.cross_device_sync.description')}
					</Text>
				</div>
			</div>
			<div class="flex flex-row gap-4 items-center">
				<Icon size={2} path={mdiServer} />
				<div class="flex flex-1 flex-col">
					<Text type="h4">{$i18n.t('login.perk.server_access.title')}</Text>
					<Text type="p">
						{$i18n.t('login.perk.server_access.description')}
					</Text>
				</div>
			</div>
			<div class="flex flex-row gap-4 items-center">
				<Icon size={2} path={mdiAccount} />
				<div class="flex flex-1 flex-col">
					<Text type="h4">{$i18n.t('login.perk.personal_profile.title')}</Text>
					<Text type="p">
						{$i18n.t('login.perk.personal_profile.description')}
					</Text>
				</div>
			</div>
		</div>
		<div class="flex flex-1 flex-col gap-6">
			<IconButton
				icon={mdiGoogle}
				variant="ghost"
				on:click={() => nav(backend.auth.login('google'))}
			>
				Google
			</IconButton>
			<IconButton
				icon={mdiMicrosoft}
				variant="ghost"
				on:click={() => nav(backend.auth.login('microsoft'))}
			>
				Microsoft
			</IconButton>
			<IconButton
				icon={mdiGithub}
				variant="ghost"
				on:click={() => nav(backend.auth.login('github'))}
			>
				Github
			</IconButton>
		</div>
	</div>
</DefaultLayout>
