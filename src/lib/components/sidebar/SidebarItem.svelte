<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from '../Icon.svelte';

	export let label: string;
	export let href: string;
	export let active: boolean;
	export let path: string;

	const dispatch = createEventDispatcher();
	function clicked() {
		dispatch('clicked');
	}
</script>

<a
	on:click={clicked}
	class={`w-full rounded-xl ease-in duration-150 pl-3 ${active ? 'active' : ''}`}
	{href}
>
	<div class="group w-full py-2 flex items-center px-2 cursor-pointer transition-colors">
		<div
			class="h-6 w-6 flex justify-center mr-3 opacity-75 group-hover:opacity-100 ease-in duration-150"
		>
			<Icon {path} color="black" size="auto" />
		</div>
		<span
			class="font-body font-semibold flex-1 text-sm leading-none text-gray-500 group-hover:text-white ease-in duration-150"
		>
			{label}
		</span>
	</div>
</a>
