<script lang="ts">
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import { mdiStar } from '@mdi/js';

	export let rarity: number;
</script>

<div class="flex flex-1 items-center gap-2">
	{#each { length: rarity } as _}
		<Icon path={mdiStar} />
	{/each}
</div>
