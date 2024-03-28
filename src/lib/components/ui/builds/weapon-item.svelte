<script lang="ts">
	import { mdiStar } from '@mdi/js';
	import Icon from '../icon/icon.svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import Badge from '../badge/badge.svelte';
	import S3Service from '$lib/services/s3';
	import type { WeaponIndex } from '$lib/types/index/weapon';
	import { type WeaponKey } from '$lib/types/keys/WeaponKey';

	export let signature: Boolean,
		rarity: number,
		refine: number = 1,
		key: WeaponKey,
		index: WeaponIndex;
</script>

{#if signature}
	<div class="flex gap-2 w-full">
		<img
			class="basis-1/4 aspect-square object-contain w-full"
			src={S3Service.getWeaponLink(key) + '/icon.png'}
			alt={index[key].name}
		/>
		<div class="flex-grow flex flex-col gap-1 text-md min-h-0">
			<div class="flex w-full justify-start">
				{#each { length: rarity } as _}
					<Icon path={mdiStar} color={rarity == 5 ? 'fill-fivestar' : 'fill-fourstar'} />
				{/each}
			</div>
			<Text type="h4">{index[key].name}</Text>
			<Badge type="default" class="w-fit rounded bg-neutral">R{refine}</Badge>
		</div>
	</div>
{:else}
	<div class="w-full flex gap-2 items-center">
		<img
			class="aspect-square object-cover h-0 min-h-full"
			src={S3Service.getWeaponLink(key) + '/icon.png'}
			alt={index[key].name}
		/>
		<div class="flex flex-row gap-2 w-full">
			<Icon path={mdiStar} color={rarity == 5 ? 'fill-fivestar' : 'fill-fourstar'} />
			<Text type="p">{index[key].name}</Text>
		</div>
	</div>
{/if}
