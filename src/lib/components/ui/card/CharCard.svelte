<script lang="ts">
	import { Content, Root } from '$lib/components/ui/card';

	export let link: string;
	export let name: string;
	export let img: string;
	export let element: string = '';
	export let weapon: string = '';
</script>

<a href={link} class="w-64 mx-2 my-2">
	<Root>
		<Content>
			<div
				class="relative h-50 mx-4 mt-6 overflow-hidden text-text shadow-lg bg-clip-border rounded-xl bg-foreground shadow-background/40"
			>
				<img src={img} alt={name} />
			</div>
			<div class="p-1">
				<h5
					class="block mb-3 text-xl text-center antialiased font-semibold leading-snug tracking-normal text-text"
				>
					{name}
				</h5>
			</div>
		</Content>
	</Root>
</a>
