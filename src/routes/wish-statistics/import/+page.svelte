<script lang="ts">
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import BackendService from '$lib/services/backend';
	import i18n from '$lib/services/i18n';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import Text from '$lib/components/typography/Text.svelte';
	import { useQueryClient } from '@tanstack/svelte-query';

	let authkey = '';
	let errorMessage: string | undefined = undefined;

	const backend = new BackendService();
	const fetchHoyoWishHistoryStatus = backend.hoyo.fetchHoyoWishHistoryStatus();
	const mutateHoyoWishHistory = backend.hoyo.mutateHoyoWishHistory();
	const client = useQueryClient();

	const fetchHoyoWishHistory = () => {
		if (authkey !== '') {
			$mutateHoyoWishHistory.mutate(authkey, {
				onSuccess: () => {
					client.invalidateQueries({ queryKey: ['fetchHoyoWishhistoryStatus'] });
				},
				onError: (error) => {
					console.log(JSON.stringify(error));
					errorMessage = error.message;
				}
			});
		} else {
			console.log('empty input');
		}
	};
</script>

<DefaultLayout title={$i18n.t('wish.import.title')}>
	{#if errorMessage !== undefined}
		<Text type="p">{errorMessage}</Text>
	{/if}
	{#if $fetchHoyoWishHistoryStatus.isPending}
		<Text type="p">loading</Text>
	{/if}
	{#if $fetchHoyoWishHistoryStatus.isError}
		<Text type="p">error</Text>
	{/if}
	{#if $fetchHoyoWishHistoryStatus.isSuccess}
		{#if $fetchHoyoWishHistoryStatus.data.state === 'NO_JOB'}
			<Label for="authkey">Authkey</Label>
			<Input id="authkey" bind:value={authkey} placeholder="Authkey" />
			<Button on:click={fetchHoyoWishHistory}>Import History</Button>
		{:else if $fetchHoyoWishHistoryStatus.data.state === 'IN_PROGRESS'}
			<Text type="p">in progress</Text>
		{:else if $fetchHoyoWishHistoryStatus.data.state === 'COMPLETED_RATE_LIMIT'}
			<Text type="p">completed</Text>
		{/if}
	{/if}
</DefaultLayout>
