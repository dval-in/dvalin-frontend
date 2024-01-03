<script lang="ts">
	import { mdiChevronDown, mdiChevronRight } from '@mdi/js';
	import { showSidebarSections } from '$lib/store/global_state';
	import Icon from '$lib/components/Icon.svelte';
	export let label: string;
	export let sidebarNum: number;
	function rightClicked(event: MouseEvent | TouchEvent) {
		showSidebarSections.update((n) => {
			n[sidebarNum] = !n[sidebarNum];
			return n;
		});
		event.preventDefault();
	}
</script>

<button
	on:contextmenu={rightClicked}
	class="group w-full py-2 flex items-center cursor-pointer transition-colors flex-row"
>
	<span
		class="font-body font-semibold flex-1 text-lg leading-none text-gray-500 ease-in duration-150"
	>
		<button on:click={rightClicked}>
			{#if $showSidebarSections[sidebarNum]}
				<Icon path={mdiChevronDown} />
			{:else}
				<Icon path={mdiChevronRight} />
			{/if}
		</button>
		{label}
	</span>
</button>

<div
	class="flex flex-col items-center w-full {$showSidebarSections[sidebarNum] === true
		? 'visible'
		: 'hidden'}"
>
	<slot />
</div>
