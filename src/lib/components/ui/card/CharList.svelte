<script lang="ts">
	import { Content, Root } from '$lib/components/ui/card';

	export let link: string;
	export let name: string;
	export let img: string;
	export let hp: number;
	export let atk: number;
	export let def: number;
	export let element: string = '';
	export let weapon: string = '';
	export let constellation: number = 0;
	export let rarity: string = '';
</script>

<a class="mx-2 my-2 w-64" href={link}>
	<Root>
		<Content>
			<div
				class="h-50 text-text bg-tertiary shadow-background/40 relative mx-4 mt-6 overflow-hidden rounded-xl bg-clip-border shadow-lg"
			>
				<img alt={name} class="h-20 w-20" src={img} />
				<h5
					class="text-text mb-3 block text-center text-xl font-semibold leading-snug tracking-normal antialiased"
				>
					{name}
					{hp}
					{atk}
					{def} //expert mode// //add character own to show// //customizability//
					{element}
					{weapon}
					{constellation}
					{rarity}
				</h5>
			</div>
		</Content>
	</Root>
</a>
