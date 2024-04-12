<script lang="ts">
	import { Toaster as Sonner, type ToasterProps as SonnerProps } from 'svelte-sonner';

	type $$Props = SonnerProps;
</script>

<Sonner
	{...$$restProps}
	class="toaster group"
	toastOptions={{
		classes: {
			toast: 'group toast group-[.toaster]:bg-neutral bg-neutral group-[.toaster]:text-text group-[.toaster]:border-border group-[.toaster]:shadow-lg',
			description: 'group-[.toast]:text-text',
			actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-text',
			cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground'
		}
	}}
/>
