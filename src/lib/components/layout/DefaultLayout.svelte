<script lang="ts">
	import Text from '$lib/components/typography/Text.svelte';
	import Loading from '$lib/components/ui/loading/Loading.svelte';
	import { mdiArrowLeft } from '@mdi/js';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import Button from '../ui/button/button.svelte';

	export let title: string = '';
	export let isLoading: boolean = false;
	export let showRequirements: boolean = false;
	export let onBackClick: (() => void) | undefined = undefined;
</script>

<svelte:head>
	<title>{'Dval.in | ' + title}</title>
</svelte:head>

<div
	class={`flex flex-1 p-2 ${isLoading ? '' : 'sm:p-4 sm:pt-14'} scrollbar-gutter sm:max-w-[2560px]`}
>
	<div class="flex flex-1 flex-col gap-4 overflow-x-hidden sm:gap-6">
		{#if title !== '' || $$slots.titlebarActions}
			<div
				class="flex flex-row flex-wrap justify-between gap-4 max-sm:flex-1 max-sm:flex-col sm:gap-6"
			>
				<div class="flex gap-2">
					{#if onBackClick !== undefined}
						<Button on:click={onBackClick} variant="ghost" size="icon">
							<Icon class="fill-primary" path={mdiArrowLeft} />
						</Button>
					{/if}
					{#if title !== ''}
						<Text class="text-primary" type="h1">{title}</Text>
					{/if}
				</div>
				{#if $$slots.titlebarActions && !showRequirements}
					<div
						class="flex flex-row flex-wrap justify-end gap-2 max-sm:flex-1 max-sm:flex-col sm:items-center"
					>
						<slot name="titlebarActions" />
					</div>
				{/if}
			</div>
		{/if}

		{#if !showRequirements}
			{#if isLoading}
				<div class="flex flex-1 flex-col items-center justify-center">
					<Loading />
				</div>
			{:else}
				<slot />
			{/if}
		{:else}
			<slot name="requirements" />
		{/if}
	</div>
</div>
