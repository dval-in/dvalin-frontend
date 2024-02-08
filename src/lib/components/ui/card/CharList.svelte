<script lang="ts">
	import { Content, Root } from '$lib/components/ui/card';
	import type { number } from 'zod';

	export let link: string;
	export let name: string;
	export let img: string;
    export let hp: number;
    export let atk: number;
    export let def: number;
    export let element: string = '';
    export let weapon: string = '';
    export let constel: number = 0;
    export let rarity: string = '';

</script>

<a href={link} class="w-64 mx-2 my-2">
	<Root>
		<Content>
			<div
				class="relative h-50 mx-4 mt-6 overflow-hidden text-text shadow-lg bg-clip-border rounded-xl bg-foreground shadow-background/40"
			>
				<img class="h-20 w-20" src={img} alt={name} />
				<h5
					class="block mb-3 text-xl text-center antialiased font-semibold leading-snug tracking-normal text-text"
				>
					{name} {hp} {atk} {def} //expert mode// //add character own to show//
				</h5>
			</div>
		</Content>
	</Root>
</a>
