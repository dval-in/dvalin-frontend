<script lang="ts">
	import { mdiStar } from '@mdi/js';
	import Icon from '../icon/icon.svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import Badge from '../badge/badge.svelte';
	import S3Service from '$lib/services/s3';
	import type { ArtifactSetKey } from '$lib/types/keys/ArtifactSetKey';

	export let signature: Boolean,
		rarity: number,
		quantity: number = 4,
		key: ArtifactSetKey;
</script>

{#if signature}
	<div class="flex gap-2 w-full">
		<img
			class="flex-grow aspect-square object-contain h-0 min-h-full"
			src={S3Service.getArtifactLink(key) + '/flower.png'}
			alt={key}
		/>
		<div class="flex flex-col gap-1 box-border h-full">
			<div class="flex w-full justify-start">
				{#each { length: rarity } as _}
					<Icon path={mdiStar} class={rarity === 5 ? 'fill-fivestar' : 'fill-fourstar'} />
				{/each}
			</div>
			<Text type="h4">{key.replace(/([A-Z])/g, ' $1').trim()}</Text>
			<Badge type="default" class="w-fit rounded bg-neutral">x{quantity}</Badge>
		</div>
	</div>
{:else}
	<div class="flex w-full flex-row gap-2 items-center">
		<img
			class="aspect-square object-cover h-0 min-h-full"
			src={S3Service.getArtifactLink(key) + '/flower.png'}
			alt={key}
		/>
		<Icon path={mdiStar} class={rarity === 5 ? 'fill-fivestar' : 'fill-fourstar'} />
		<Text type="p">{key.replace(/([A-Z])/g, ' $1').trim()}</Text>
	</div>
{/if}
