<script lang="ts">
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import H2 from '$lib/components/typography/H2.svelte';
	import NewAccountForm from '$lib/components/user/NewAccountForm.svelte';
	import BackendService from '$lib/services/backend';
	import { Alert, AlertDescription, AlertTitle } from '$lib/components/ui/alert';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';

	interface UserData {
		uid: number;
	}

	interface ConfigData {
		autoRefine3: boolean;
		autoRefine4: boolean;
		autoRefine5: boolean;
		preferedLanguage: string;
	}

	const backendService = BackendService.getInstance();

	$: createProfileMutation = backendService.user.createUserProfile();

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

		const result = await $createProfileMutation.mutateAsync(data);
		if (result.state === 'SUCCESS') {
			toast.success('Profile created successfully');
			goto('/');
		} else {
			toast.error('Error creating profile:' + result.state);
		}

		goto('/');
	};
</script>

<DefaultLayout title="Welcome Traveller !">
	<div class="grid grid-cols-3 items-center">
		<div class="p-5">
			<H2>Complete your profile to access our features !</H2>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quos modi non excepturi
			incidunt unde? Ratione reprehenderit asperiores excepturi eos ut odio sequi officiis molestiae
			impedit!
		</div>
		<NewAccountForm onSubmit={handleProfileSubmit} />
	</div>

	{#if $createProfileMutation.isPending}
		<Alert>
			<AlertTitle>Creating Profile</AlertTitle>
			<AlertDescription>Please wait while we create your profile...</AlertDescription>
		</Alert>
	{/if}

	{#if error}
		<Alert variant="destructive">
			<AlertTitle>Error</AlertTitle>
			<AlertDescription>{error}</AlertDescription>
		</Alert>
	{/if}
</DefaultLayout>
