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
	<div class="flex w-full gap-2">
		<img
			class="aspect-square w-14 basis-1/4 object-contain"
			src={S3Service.getArtifact(key).flower}
			alt={key}
		/>
		<div class="box-border h-full gap-1">
			<div class="flex w-full justify-start">
				{#each { length: rarity } as _}
					<Icon
						path={mdiStar}
						class={`${rarity === 5 ? 'fill-fivestar' : 'fill-fourstar'}`}
					/>
				{/each}
			</div>
			<Text type="h4">{key.replace(/([A-Z])/g, ' $1').trim()}</Text>
			<Badge type="default" class="bg-neutral w-fit rounded-sm">x{quantity}</Badge>
		</div>
	</div>
{:else}
	<div class="grid grid-cols-[2rem_auto] items-center gap-2">
		<img
			class="aspect-square h-0 min-h-full object-contain"
			src={S3Service.getArtifact(key).flower}
			alt={key}
		/>
		<div class="flex w-full items-center gap-2">
			<Icon path={mdiStar} class={rarity === 5 ? 'fill-fivestar' : 'fill-fourstar'} />
			<div class="flex flex-1 flex-wrap">
				<p class="leading-7">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
			</div>
		</div>
	</div>
{/if}
