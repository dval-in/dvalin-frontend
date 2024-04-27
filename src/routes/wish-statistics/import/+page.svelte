<script lang="ts">
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import BackendService from '$lib/services/backend';
	import i18n from '$lib/services/i18n';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import Text from '$lib/components/typography/Text.svelte';
	import { useQueryClient } from '@tanstack/svelte-query';

	let wishURL = '';
	let errorMessage: string | undefined = undefined;

	const backend = new BackendService();
	const fetchHoyoWishHistoryStatus = backend.hoyo.fetchHoyoWishHistoryStatus();
	const mutateHoyoWishHistory = backend.hoyo.mutateHoyoWishHistory();
	const client = useQueryClient();

	const fetchHoyoWishHistory = () => {
		if (wishURL !== '') {
			const authkey = new URL(wishURL).searchParams.get('authkey');

			if (authkey !== null) {
				$mutateHoyoWishHistory.mutate(authkey, {
					onSuccess: () => {
						client.invalidateQueries({ queryKey: ['fetchHoyoWishhistoryStatus'] });
					},
					onError: (error) => {
						console.log(JSON.stringify(error));
						errorMessage = error.message;
					}
				});
			}
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
		<Text type="p">Something went wrong. Please try again later.</Text>
	{/if}

	{#if $fetchHoyoWishHistoryStatus.isSuccess}
		{#if $fetchHoyoWishHistoryStatus.data.state === 'NO_JOB'}
			<Text type="p">
				Navigate to folder "C:\Games\Genshin Impact\GenshinImpact_Data\webCaches\%latest
				version%\Cache\Cache_Data"
			</Text>
			<Text type="p">Open file "data_2"</Text>
			<Text type="p">
				Search for the latest entry of "e20190909gacha-v3" (without the quote)
			</Text>
			<Text type="p">Copy the link and paste it into the text field</Text>
			<Label for="wishurl">Wish URL</Label>
			<Input
				id="wishurl"
				bind:value={wishURL}
				placeholder="https://webstatic-sea.hoyoverse.com/genshin/event/e20190909gacha-v3/index.html?authkey=.......&game_biz=hk4e_global"
			/>
			<Button on:click={fetchHoyoWishHistory} disabled={$mutateHoyoWishHistory.isPending}>
				Import History
			</Button>
		{:else if $fetchHoyoWishHistoryStatus.data.state === 'IN_PROGRESS'}
			<Text type="p">Your request is being processed</Text>
			<Text type="p">Currently {$fetchHoyoWishHistoryStatus.data.data.max}</Text>
		{:else if $fetchHoyoWishHistoryStatus.data.state === 'COMPLETED_RATE_LIMIT'}
			<Text type="p">Your request was completed and your wishes were imported</Text>
			<Text type="p">
				{new Date(parseInt($fetchHoyoWishHistoryStatus.data.data.completedTime) * 1000)}
			</Text>
		{/if}
	{/if}
</DefaultLayout>
