<script lang="ts">
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import H2 from '$lib/components/typography/H2.svelte';
	import NewAccountForm from '$lib/components/user/NewAccountForm.svelte';
	import BackendService from '$lib/services/backend';
	import { Alert, AlertDescription, AlertTitle } from '$lib/components/ui/alert';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import i18n from '$lib/services/i18n';

	interface UserData {
		uid: number;
	}

	interface ConfigData {
		autoRefine3: boolean;
		autoRefine4: boolean;
		autoRefine5: boolean;
		preferedLanguage: string;
	}

	const backend = BackendService.getInstance();

	const createProfileMutation = backend.user.createUserProfile();

	let error: string | null = null;
	const handleProfileSubmit = async ({
		user,
		config
	}: {
		user: UserData;
		config: ConfigData;
	}) => {
		const data = { ...user, config };
		console.log(data);
		await $createProfileMutation.mutateAsync(data, {
			onError: (error) => {
				toast.error($i18n.t('profile.create.error', { error: error.message }));
			},
			onSuccess: () => {
				toast.success($i18n.t('profile.create.success'));
				goto('/');
			}
		});
	};
</script>

<DefaultLayout title={$i18n.t('welcome.title')}>
	{#if $createProfileMutation.isIdle}
		<div class="grid grid-cols-3 items-center">
			<div class="p-5">
				<H2>{$i18n.t('profile.complete.title')}</H2>
				<p>{$i18n.t('profile.complete.description')}</p>
			</div>
			<NewAccountForm onSubmit={handleProfileSubmit} />
		</div>
	{/if}

	{#if $createProfileMutation.isPending}
		<Alert>
			<AlertTitle>{$i18n.t('profile.create.pending.title')}</AlertTitle>
			<AlertDescription>{$i18n.t('profile.create.pending.description')}</AlertDescription>
		</Alert>
	{/if}

	{#if $createProfileMutation.isError}
		<Alert variant="destructive">
			<AlertTitle>{$i18n.t('profile.create.error.title')}</AlertTitle>
			<AlertDescription>{error}</AlertDescription>
		</Alert>
	{/if}
</DefaultLayout>
