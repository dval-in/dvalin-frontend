<script lang="ts">
	export let path: any;

	let exportedClass = '';

	export { exportedClass as class };
</script>

<svg
	class={`${!exportedClass.includes('fill-') ? 'fill-text' : ''} ${!exportedClass.includes('size-') ? 'size-6' : ''} ${exportedClass}`}
	viewBox="0 0 24 24"
>
	<path d={path} />
</svg>

<style lang="postcss">
	svg {
		vertical-align: middle;
		display: inline-block;
	}
</style>
