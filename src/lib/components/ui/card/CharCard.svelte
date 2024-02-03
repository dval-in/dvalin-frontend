<script lang="ts">
	import { Content, Root } from '$lib/components/ui/card';

	export let link: string;
</script>

<a href={link} class="w-40">
	<Root>
		<Content>
			<div
				class="relative h-50 mx-4 mt-6 overflow-hidden text-text shadow-lg bg-clip-border rounded-xl bg-foreground shadow-background/40"
			>
				<img src="https://www.ginx.tv/uploads/pasted_image_0-137.png" alt="Albedo" />
			</div>
			<div class="p-1">
				<h5
					class="block mb-1 text-xl text-center antialiased font-semibold leading-snug tracking-normal text-text"
				>
					Albedo
				</h5>
			</div>
		</Content>
	</Root>
</a>
