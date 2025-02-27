<script lang="ts">
	import { mdiAccount, mdiInfinity, mdiSwordCross } from '@mdi/js';
	import Text from '$lib/components/typography/Text.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import type { IWish } from '$lib/types/wish';
	import i18n from '$lib/services/i18n';
	import { userProfile } from '$lib/store/user_profile';

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
		<CardTitle class="flex flex-row items-center justify-between">
			<Text type="h4">{$i18n.t('dashboard.widget.pity.title')}</Text>
			<Button href="wish-statistics/overview">
				{$i18n.t('wish.overview.title')}
			</Button>
		</CardTitle>
	</CardHeader>
	<CardContent>
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
	</CardContent>
</Card>
