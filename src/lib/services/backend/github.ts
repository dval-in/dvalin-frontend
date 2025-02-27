import { createQuery, type QueryClient } from '@tanstack/svelte-query';

type GithubReleaseR = {
	name: string;
	body: string;
	created_at: string;
	published_at: string;
	author: {
		login: string;
		avatar_url: string;
	};
};

export class BackendGithubService {
	public constructor(private queryClient: QueryClient) {}

	fetchGithubLatestRelease() {
		return createQuery(
			{
				queryKey: ['fetchGithub', 'latestRelease'],
				staleTime: 6 * 60 * 60 * 1000, //6h
				queryFn: async () =>
					await fetch(
						`https://api.github.com/repos/dval-in/dvalin-frontend/releases/latest`
					)
			},
			this.queryClient
		);
	}
}
