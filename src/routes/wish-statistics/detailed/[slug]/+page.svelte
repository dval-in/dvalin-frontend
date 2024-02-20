<script lang="ts">
	import { applicationState } from '$lib/store/global_state';
	import Text from '$lib/components/typography/Text.svelte';
	import { Body, Cell, Head, Header, Root, Row } from '$lib/components/ui/table';

	/** @type {import('./$types').PageData} */
	export let data;

	const bannerHistory = $applicationState.wishes.bannerHistory[data.type];
</script>

<div class="flex flex-1 flex-col gap-6">
	<Text type="h1">{data.type + ' banner history'}</Text>
	<div class="flex flex-row">
		<div class="flex flex-1">a</div>
		<div class="flex flex-1">
			<Root>
				<Header>
					<Row>
						<Head class="w-[100px]">Invoice</Head>
						<Head>Status</Head>
						<Head>Method</Head>
						<Head class="text-right">Amount</Head>
					</Row>
				</Header>
				<Body>
					{#each bannerHistory as pull}
						<Row>
							<Cell class="font-medium">{pull.type}</Cell>
							<Cell>{pull.name}</Cell>
							<Cell>{pull.rarity}</Cell>
							<Cell class="text-right">{pull.date}</Cell>
						</Row>
					{/each}
				</Body>
			</Root>
		</div>
	</div>
</div>
