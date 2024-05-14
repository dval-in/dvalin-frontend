<script lang="ts">
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import BackendService from '$lib/services/backend';
	import i18n from '$lib/services/i18n';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import Text from '$lib/components/typography/Text.svelte';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { toast } from 'svelte-sonner';
	import { mdiCheck, mdiHumanQueue } from '@mdi/js';
	import Icon from '$lib/components/ui/icon/icon.svelte';

	let wishURL = '';

	const backend = BackendService.getInstance();
	const fetchHoyoWishHistoryStatus = backend.hoyo.fetchHoyoWishHistoryStatus();
	const mutateHoyoWishHistory = backend.hoyo.mutateHoyoWishHistory();
	const client = useQueryClient();

	const fetchHoyoWishHistory = () => {
		if (!wishURL.includes('e20190909gacha-v3')) {
			toast.error('Wrong url');
			return;
		}

		if (!URL.canParse(wishURL)) {
			toast.error('Url brokey');
			return;
		}

		const authkey = new URL(wishURL).searchParams.get('authkey');

		if (authkey === null) {
			toast.error('Url no auth key');
			return;
		}

		const encodedAuthKey = encodeURIComponent(authkey);

		$mutateHoyoWishHistory.mutate(encodedAuthKey, {
			onSuccess: (response) => {
				if (response.state === 'CREATED') {
					toast.success('Created');
					client.invalidateQueries({ queryKey: ['fetchHoyoWishhistoryStatus'] });
				}
			},
			onError: (error) => {
				toast.error(error.message);
			}
		});
	};
</script>

<DefaultLayout
	title={$i18n.t('wish.import.title')}
	isLoading={$fetchHoyoWishHistoryStatus.isPending || $fetchHoyoWishHistoryStatus.isLoading}
>
	{#if $fetchHoyoWishHistoryStatus.isError}
		<Text type="p">{$i18n.t('wish.import.state.error.title')}</Text>
	{/if}

	{#if $fetchHoyoWishHistoryStatus.isSuccess}
		{#if $fetchHoyoWishHistoryStatus.data.state === 'NO_JOB'}
			<Text type="p">
				{$i18n.t('wish.import.instructions.step1')}
			</Text>
			<Text type="p">{$i18n.t('wish.import.instructions.step2')}</Text>
			<Text type="p">
				{$i18n.t('wish.import.instructions.step3')}
			</Text>
			<Text type="p">{$i18n.t('wish.import.instructions.step4')}</Text>
			<Text type="p">{$i18n.t('wish.import.instructions.step5')}</Text>
			<Label for="wishurl">Wish URL</Label>
			<Input
				id="wishurl"
				bind:value={wishURL}
				placeholder="https://webstatic-sea.hoyoverse.com/genshin/event/e20190909gacha-v3/index.html?authkey=.......&game_biz=hk4e_global"
			/>
			<Button
				on:click={fetchHoyoWishHistory}
				disabled={$mutateHoyoWishHistory.isPending || wishURL === ''}
			>
				Import History
			</Button>
		{:else if $fetchHoyoWishHistoryStatus.data.state === 'QUEUED'}
			<div class="flex flex-1 flex-col justify-center items-center gap-6">
				<Icon path={mdiHumanQueue} size={2} />
				<Text type="h2">{$i18n.t('wish.import.state.queued.title')}</Text>
				<Text type="p">
					{$i18n.t('wish.import.state.queued.description', {
						count: $fetchHoyoWishHistoryStatus.data.data.count
					})}
				</Text>
			</div>
		{:else if $fetchHoyoWishHistoryStatus.data.state === 'ACTIVE'}
			<div class="flex flex-1 flex-col justify-center items-center gap-6">
				<Icon path={mdiHumanQueue} size={2} />
				<Text type="h2">{$i18n.t('wish.import.state.active.title')}</Text>
			</div>
		{:else if $fetchHoyoWishHistoryStatus.data.state === 'COMPLETED_RATE_LIMIT'}
			<div class="flex flex-1 flex-col justify-center items-center gap-6">
				<Icon path={mdiCheck} size={2} />
				<Text type="h2">{$i18n.t('wish.import.state.completed.title')}</Text>
				<Text type="p">
					{$i18n.t('wish.import.state.completed.description', {
						date: new Date(
							$fetchHoyoWishHistoryStatus.data.data.completedTimestamp +
								$fetchHoyoWishHistoryStatus.data.data.rateLimitDuration
						).toLocaleString(),
						interpolation: { escapeValue: false }
					})}
				</Text>
			</div>
		{/if}
	{/if}
</DefaultLayout>
