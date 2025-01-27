import { createMutation, type QueryClient } from '@tanstack/svelte-query';
import type SocketService from '$lib/services/socket';
import type { UserProfile } from '$lib/types/user_profile';

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
			mutationKey: [''],
			mutationFn: async (mutationData: { achievementsState: any; uid: string }) => {
				const a = await this.socketService.socket.emitWithAck('updateAchievements', {
					achievements: mutationData.achievementsState,
					uid: mutationData.uid
				});

				if (a.status === 'error') {
					throw new Error('test');
				}

				console.log(a);

				return a;
			},
			onMutate: async (mutationData) => {
				console.log('mutating');
				await this.queryClient.cancelQueries({ queryKey: ['fetchUserProfile', true] });

				const prevUserProfile = this.queryClient.getQueryData<UserProfile>([
					'fetchUserProfile',
					true
				]);

				console.log(prevUserProfile);

				this.queryClient.setQueryData<UserProfile>(['fetchUserProfile', true], (old) => {
					if (old === undefined) return undefined;

					return {
						...old,
						achievements: { ...old.achievements, ...mutationData.achievementsState }
					};
				});

				return prevUserProfile;
			},
			onError: (err, mutationData, context) => {
				console.log('error');
				console.log(err);
				console.log(context);
				this.queryClient.setQueryData(['fetchUserProfile', true], context);
			},
			onSettled: () => {
				console.log('refetch');
				this.queryClient.invalidateQueries({ queryKey: ['fetchUserProfile'] });
			}
		});
	}
}
