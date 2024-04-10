<script lang="ts">
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import { Button } from '$lib/components/ui/button';
	import BackendService from '$lib/services/backend';

	const backend = new BackendService();

	const nav = (url: string) => {
		window.location = url;
	};
</script>

<DefaultLayout title="Login">
	<Button on:click={() => nav(backend.auth.login('github'))}>Github</Button>
</DefaultLayout>
