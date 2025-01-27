import type { PageLoadEvent } from './$types';
import { applicationState } from '$lib/store/application_state';
import { get } from 'svelte/store';

export async function load({ parent, fetch }: PageLoadEvent) {
	const { queryClient, backend } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['fetchHoyoWishStatus', get(applicationState).isAuthenticated],
		queryFn: async () =>
			(
				await fetch(backend.hoyo.getHoyoWishHistoryStatusUrl(), {
					credentials: 'include'
				})
			).json()
	});
}
