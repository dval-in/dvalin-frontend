<script lang="ts">
	import Text from '$lib/components/typography/Text.svelte';

	export let name: string;
	export let counter: number;
	export let type: 'character' | 'weapon';

	const imgUrl =
		type === 'character'
			? 'https://s3-api.dval.in/character/' + name + '/icon.webp'
			: 'https://s3-api.dval.in/weapons/' + name + '.png';
</script>

<div class="flex items-center gap-2 bg-neutral p-1 rounded-md">
	<img alt={'Image of ' + name} class="w-8 h-8 rounded-full" src={imgUrl} />
	<Text type="p">{name}</Text>
	<Text type="p">{counter}</Text>
</div>
