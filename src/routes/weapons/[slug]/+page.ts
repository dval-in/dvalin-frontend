import type { PageLoadEvent } from './$types';

export async function load({ params, parent, fetch }: PageLoadEvent) {
	const { queryClient, backend } = await parent();
	const key = params.slug;

	await queryClient.prefetchQuery({
		queryKey: ['fetchWeaponData', key],
		queryFn: async () => (await fetch(backend.data.getWeaponDataUrl(key))).json()
	});

	return { weaponKey: key };
}
