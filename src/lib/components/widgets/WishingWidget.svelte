<script lang="ts">
	import { mdiAccount, mdiInfinity, mdiSwordCross } from '@mdi/js';
	import Text from '$lib/components/typography/Text.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import PullChip from '$lib/components/ui/pull-chip/PullChip.svelte';
	import type { UserProfile } from '$lib/types/user_profile.js';
	import i18n from '$lib/services/i18n';
	import type { IWish } from '$lib/types/wish';
	import { userProfile } from '$lib/store/user_profile';

	function getLatestWishes(userProfile: UserProfile, count: number = 6) {
		// Combine all wishes from different banners
		const allWishes = [
			...(userProfile.wishes?.Beginner ?? []),
			...(userProfile.wishes?.CharacterEvent ?? []),
			...(userProfile.wishes?.Chronicled ?? []),
			...(userProfile.wishes?.Standard ?? []),
			...(userProfile.wishes?.WeaponEvent ?? [])
		];

		// Sort wishes by date in descending order (most recent first)
		const sortedWishes = allWishes
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
			.filter((wish) => wish.rarity === 5);

		// Return the specified number of latest wishes
		return sortedWishes.slice(0, count);
	}

	function calculateFiveStarPity(wishes: IWish[]): number {
		let pityCount = 0;

		for (const wish of wishes) {
			if (wish.rarity === 5) {
				break;
			}
			pityCount++;
		}

		return pityCount;
	}

	function calculateFourStarPity(wishes: IWish[]): number {
		let pityCount = 0;

		for (const wish of wishes) {
			if (wish.rarity === 4) {
				break;
			}
			pityCount++;
		}

		return pityCount;
	}
</script>

<Card class=" flex flex-col gap-5">
	<CardHeader>
		<CardTitle class="flex items-center justify-between">
			<Text type="h4">{$i18n.t('dashboard.widget.wishing.title')}</Text>
			<Button href="wish-statistics/overview">
				{$i18n.t('action.more')}
			</Button>
		</CardTitle>
	</CardHeader>
	<CardContent class="flex flex-col gap-3">
		<!-- pity -->
		<Text type="large">{$i18n.t('dashboard.widget.wishing.pity')}</Text>
		<div class="*:bg-neutral flex justify-between *:px-[8%] *:py-[5%]">
			<!-- char -->
			<div class="flex flex-col items-center justify-center gap-3 rounded-md">
				<Icon path={mdiAccount} />
				<div class="flex gap-4 font-semibold">
					<Text type="p" class="text-fivestar">
						{calculateFiveStarPity($userProfile.wishes?.CharacterEvent ?? [])}
					</Text>
					<Text type="p" class="text-fourstar">
						{calculateFourStarPity($userProfile.wishes?.CharacterEvent ?? [])}
					</Text>
				</div>
			</div>
			<!-- weap -->
			<div class="flex flex-col items-center justify-center gap-3 rounded-md">
				<Icon path={mdiSwordCross} />
				<div class="flex gap-4 font-semibold">
					<Text type="p" class="text-fivestar">
						{calculateFiveStarPity($userProfile.wishes?.WeaponEvent ?? [])}
					</Text>
					<Text type="p" class="text-fourstar">
						{calculateFourStarPity($userProfile.wishes?.WeaponEvent ?? [])}
					</Text>
				</div>
			</div>
			<!-- standard -->
			<div class="flex flex-col items-center justify-center gap-3 rounded-md">
				<Icon path={mdiInfinity} />
				<div class="flex gap-4 font-semibold">
					<Text type="p" class="text-fivestar">
						{calculateFiveStarPity($userProfile.wishes?.Standard ?? [])}
					</Text>
					<Text type="p" class="text-fourstar">
						{calculateFourStarPity($userProfile.wishes?.Standard ?? [])}
					</Text>
				</div>
			</div>
		</div>
		<!-- total pulls -->
		<div class="bg-neutral flex items-center justify-between rounded-md pl-3">
			<Text type="large">
				{$i18n.t('dashboard.widget.wishing.total')}
			</Text>
			<Text type="large" class="bg-neutral rounded-md p-3">
				{($userProfile.wishes?.WeaponEvent?.length ?? 0) +
					($userProfile.wishes?.CharacterEvent?.length ?? 0) +
					($userProfile.wishes?.Beginner?.length ?? 0) +
					($userProfile.wishes?.Chronicled?.length ?? 0) +
					($userProfile.wishes?.Standard?.length ?? 0)}
			</Text>
		</div>
		<!-- latest pulls -->
		<div>
			<Text type="large">
				{$i18n.t('dashboard.widget.wishing.latest')}
			</Text>
			<div class="mt-2 flex flex-row flex-wrap gap-3">
				{#each getLatestWishes($userProfile, 6) as wish}
					<PullChip
						name={wish.key}
						key={wish.key}
						counter={wish.pity}
						wonFiftyFifty={wish.wonFiftyFifty}
					></PullChip>
				{/each}
			</div>
		</div>
	</CardContent>
</Card>
