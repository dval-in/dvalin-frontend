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
	import { mdiCheck, mdiCloudSync, mdiFile, mdiHumanQueue, mdiLink, mdiLogin } from '@mdi/js';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import IconButton from '$lib/components/ui/icon-button/IconButton.svelte';
	import { applicationState } from '$lib/store/application_state';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import { openFileDialog } from '$lib/utils';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';

	let wishURL = '';

	const backend = BackendService.getInstance();
	const fetchHoyoWishHistoryStatus = backend.hoyo.fetchHoyoWishHistoryStatus();
	const mutateHoyoWishHistory = backend.hoyo.mutateHoyoWishHistory();
	const client = useQueryClient();

	dayjs.extend(relativeTime);

	const processFile = (event: Event) => {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files.length === 1) {
			target.files[0].text().then((streamResult) => {
				const regex =
					/(https:\/\/www.|http:\/\/www.|https:\/\/|http:\/\/)?gs.hoyoverse.com\/genshin\/event\/e20190909gacha-v3\/index.html(.*?)&game_biz=hk4e_global/g;
				const matchResult = streamResult.match(regex);

				if (matchResult === null || matchResult.length === 0) {
					toast.error(
						'File does not contain wish url. Please make sure to select the right file.'
					);

					return;
				}

				matchResult.forEach((r) => console.log(r));

				wishURL = matchResult[0];
			});
		}
	};

	const fetchHoyoWishHistory = () => {
		if (!wishURL.includes('gacha_id')) {
			toast.error('Wrong url');
			return;
		}

		if (!URL.canParse(wishURL)) {
			toast.error('Url brokey');
			return;
		}

		const authkey = new URL(wishURL).searchParams.get('authkey');

		if (authkey === null) {
			toast.error('Wrong url, missing authkey');
			return;
		}

		const encodedAuthKey = encodeURIComponent(authkey);

		$mutateHoyoWishHistory.mutateAsync(encodedAuthKey, {
			onSuccess: (response) => {
				if (response.state === 'CREATED') {
					toast.success('Created');
					client.invalidateQueries({ queryKey: ['fetchHoyoWishhistoryStatus'] });
				}
			},
			onError: (error) => {
				console.log('abc');
				toast.error(error.message);
			}
		});
	};
</script>

<DefaultLayout
	title={$i18n.t('wish.import.title')}
	isLoading={$fetchHoyoWishHistoryStatus.isPending || $fetchHoyoWishHistoryStatus.isLoading}
	showRequirements={!$applicationState.isAuthenticated}
>
	<svelte:fragment slot="requirements">
		<Text type="p">You need to login in order to use this feature</Text>
		<IconButton icon={mdiLogin} href="/login">Login</IconButton>
	</svelte:fragment>

	{#if $fetchHoyoWishHistoryStatus.isError}
		<Text type="p">{$i18n.t('wish.import.state.error.title')}</Text>
	{/if}

	{#if $fetchHoyoWishHistoryStatus.isSuccess}
		{#if $fetchHoyoWishHistoryStatus.data.state === 'NO_JOB'}
			<Tabs>
				<TabsList>
					<TabsTrigger value="pc">PC</TabsTrigger>
					<TabsTrigger value="android">Android</TabsTrigger>
					<TabsTrigger value="ios">iOS</TabsTrigger>
				</TabsList>
				<TabsContent value="pc">
					<Text type="p">
						{$i18n.t('wish.import.instructions.step1')}
					</Text>
					<Text type="p">{$i18n.t('wish.import.instructions.step2')}</Text>
					<Text type="p">
						{$i18n.t('wish.import.instructions.step3')}
					</Text>
					<Text type="p">{$i18n.t('wish.import.instructions.step4')}</Text>
					<Text type="p">{$i18n.t('wish.import.instructions.step5')}</Text>
					<IconButton icon={mdiFile} on:click={() => openFileDialog(processFile)}>
						{$i18n.t('action.select_file')}
					</IconButton>
				</TabsContent>
				<TabsContent value="android">
					<Text type="p">Use Ascent by 403f</Text>
					<IconButton icon={mdiLink} href="https://github.com/4o3F/Ascent">
						Github
					</IconButton>
				</TabsContent>
				<TabsContent value="ios">
					<Text type="p"></Text>
				</TabsContent>
			</Tabs>

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
				<Icon path={mdiHumanQueue} class="size-52" />
				<Text type="h2">{$i18n.t('wish.import.state.queued.title')}</Text>
				<Text type="p">
					{$i18n.t('wish.import.state.queued.description', {
						count: $fetchHoyoWishHistoryStatus.data.data.count
					})}
				</Text>
			</div>
		{:else if $fetchHoyoWishHistoryStatus.data.state === 'ACTIVE'}
			<div class="flex flex-1 flex-col justify-center items-center gap-6">
				<Icon path={mdiCloudSync} class="size-52" />
				<Text type="h2">{$i18n.t('wish.import.state.active.title')}</Text>
			</div>
		{:else if $fetchHoyoWishHistoryStatus.data.state === 'COMPLETED_RATE_LIMIT'}
			<div class="flex flex-1 flex-col justify-center items-center gap-6">
				<Icon path={mdiCheck} class="size-52" />
				<Text type="h2">{$i18n.t('wish.import.state.completed.title')}</Text>
				<Text type="p">
					{$i18n.t('wish.import.state.completed.description', {
						date: dayjs(
							$fetchHoyoWishHistoryStatus.data.data.completedTimestamp +
								$fetchHoyoWishHistoryStatus.data.data.rateLimitDuration
						).fromNow(true),
						interpolation: { escapeValue: false }
					})}
				</Text>
			</div>
		{/if}
	{/if}
</DefaultLayout>
