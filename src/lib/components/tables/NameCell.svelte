<script lang="ts">
	export let name: string;
	export let type: string;

	const imgUrl =
		type === 'character'
			? 'https://s3-api.dval.in/character/' + name + '/icon.webp'
			: 'https://s3-api.dval.in/weapons/' + name + '.png';
</script>

<div class="flex items-center gap-2">
	<img alt={'Image of ' + name} class="w-6 h-6 rounded-full" src={imgUrl} />
	{name}
</div>
