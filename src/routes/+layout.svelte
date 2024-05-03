<script lang="ts">
	import { applicationState } from '$lib/store/application_state';
	import '../app.pcss';
	import Sidebar from '$lib/components/navigator/Sidebar.svelte';
	import { get } from 'svelte/store';
	import { toast, Toaster } from 'svelte-sonner';
	import { pwaInfo } from 'virtual:pwa-info';
	import { pwaAssetsHead } from 'virtual:pwa-assets/head';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { browser } from '$app/environment';
	import { io } from 'socket.io-client';
	import i18n from '$lib/services/i18n';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});
	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.href : '';

	if (browser) {
		const socket = io(import.meta.env.VITE_BACKEND_URL, { withCredentials: true });

		socket.on('authenticationState', (state: boolean) => {
			applicationState.set({
				...get(applicationState),
				isAuthenticated: state
			});
		});

		socket.on('invalidateQuery', (queryKey: string[]) => {
			queryClient.invalidateQueries({ queryKey });
		});

		socket.on(
			'toast',
			(toastMessage: { type: 'success' | 'error' | 'info'; message: string }) => {
				const message = $i18n.t(toastMessage.message);

				switch (toastMessage.type) {
					case 'success':
						return toast.success(message);
					case 'error':
						return toast.error(message);
					case 'info':
						return toast.info(message);
				}
			}
		);
	}

	console.log(get(applicationState));
</script>

<svelte:head>
	<link href={webManifestLink} rel="manifest" />
	{#if pwaAssetsHead.themeColor}
		<meta name="theme-color" content={pwaAssetsHead.themeColor.content} />
	{/if}
	{#each pwaAssetsHead.links as link}
		<link {...link} />
	{/each}
</svelte:head>

<QueryClientProvider client={queryClient}>
	<div class={`${$applicationState.settings.theme} bg-neutral text-text min-h-screen`}>
		<div class="min-h-screen" id="main">
			<Sidebar />
			<!--  Main content-->
			<div class="sm:pl-20 xl:pl-72 max-sm:pt-16 sm:flex sm:justify-center min-h-screen">
				<slot />
			</div>
			<Toaster richColors />
		</div>
	</div>
</QueryClientProvider>
