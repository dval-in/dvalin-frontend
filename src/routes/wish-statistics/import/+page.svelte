<script lang="ts">
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import BackendService from '$lib/services/backend';
	import i18n from '$lib/services/i18n';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';

	let authKey = '';

	const backend = new BackendService();
	const fetchHoyoWishHistoryStatus = backend.hoyo.fetchHoyoWishHistoryStatus();
	const fetchHoyoWishHistory = () => {
		if (authKey !== '') {
			backend.hoyo.fetchHoyoWishHistory(authKey);
		} else {
			console.log('empty input');
		}
	};
</script>

<DefaultLayout title={$i18n.t('wish.import.title')}>
	{#if $fetchHoyoWishHistoryStatus.isPending}
		<div>loading</div>
	{/if}
	{#if $fetchHoyoWishHistoryStatus.isError}
		<div>error</div>
	{/if}
	{#if $fetchHoyoWishHistoryStatus.isSuccess}
		{#if $fetchHoyoWishHistoryStatus.data.state === 'NO_JOB'}
			<div>
				<Input bind:value={authKey} />
				<Button on:click={fetchHoyoWishHistory}></Button>
			</div>
		{:else if $fetchHoyoWishHistoryStatus.data.state === 'IN_PROGRESS'}
			<div>in progress</div>
		{:else if $fetchHoyoWishHistoryStatus.data.state === 'COMPLETED_RATE_LIMIT'}
			<div>completed</div>
		{/if}
	{/if}
</DefaultLayout>
