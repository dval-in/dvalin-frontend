<script lang="ts">
	import Text from '$lib/components/typography/Text.svelte';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
	import i18n from '$lib/services/i18n';
	import BackendService from '$lib/services/backend';
	import Loading from '$lib/components/ui/loading/Loading.svelte';

	const backend = BackendService.getInstance();

	const a = backend.github.fetchGithubLatestRelease();
</script>

<Card class=" flex flex-col">
	<CardHeader>
		<CardTitle>
			<Text type="h4">
				{$i18n.t('dashboard.widget.changelog.title')}:
			</Text>
		</CardTitle>
	</CardHeader>
	<CardContent class="whitespace-pre-line">
		{#if $a.isSuccess}
			{#if JSON.stringify($a.data) === '{}'}
				<Text type="p">Missing release</Text>
			{:else}
				<Text type="p">{JSON.stringify($a.data)}</Text>
			{/if}
		{:else}
			<Loading />
		{/if}
	</CardContent>
</Card>
