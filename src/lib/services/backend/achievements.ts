import { createMutation, type QueryCache, type QueryClient } from '@tanstack/svelte-query';
import type SocketService from '$lib/services/socket';
import type { UserProfile } from '$lib/types/user_profile';
import type { FetchUserProfileResponse } from '$lib/services/backend/user';

export class BackendAchievementService {
	private readonly baseUrl: string;

	public constructor(
		baseUrl: string,
		private queryClient: QueryClient,
		private socketService: SocketService
	) {
		this.baseUrl = baseUrl + '/user';
	}

	mutateUserAchievements() {
		return createMutation({
			mutationKey: ['userAchievements'],
			mutationFn: async (mutationData: { achievementsState: any; uid: string }) => {
				const a = await this.socketService.socket.emitWithAck('updateAchievements', {
					achievements: mutationData.achievementsState,
					uid: mutationData.uid
				});

				if (a.state === 'error') {
					throw new Error(a.message);
				}
			},
			onMutate: async (mutationData) => {
				await this.queryClient.cancelQueries({ queryKey: ['fetchUserProfile', true] });

				const prevUserProfile = this.queryClient.getQueryData<UserProfile>([
					'fetchUserProfile',
					true
				]);

				this.queryClient.setQueryData<FetchUserProfileResponse>(
					['fetchUserProfile', true],
					(old) => {
						if (old === undefined) return undefined;
						if (old.state === 'NO_GENSHIN_ACCOUNTS') return old;

						return {
							...old,
							data: {
								...old.data,
								achievements: {
									...old.data.achievements,
									...mutationData.achievementsState
								}
							}
						};
					}
				);

				return prevUserProfile;
			},
			onError: (err, mutationData, context) => {
				this.queryClient.setQueryData(['fetchUserProfile', true], context);
			},
			onSettled: () => {
				this.queryClient.invalidateQueries({ queryKey: ['fetchUserProfile'] });
			}
		});
	}
}
