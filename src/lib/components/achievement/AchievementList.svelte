<script lang="ts">
	import type { achievementData } from '$lib/types/achievement';
	import Text from '$lib/components/typography/Text.svelte';
	import { Card } from '../ui/card';
	import { Checkbox } from '../ui/checkbox';
	import Badge from '../ui/badge/badge.svelte';
	import { Collapsible, CollapsibleTrigger } from '../ui/collapsible';
	import CollapsibleContent from '../ui/collapsible/collapsible-content.svelte';
	import Separator from '../ui/separator/separator.svelte';
	import i18n from '$lib/services/i18n';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import { mdiOpenInNew, mdiStarFourPoints } from '@mdi/js';
	import { userProfile } from '$lib/store/user_profile';
	import { get } from 'svelte/store';
	import BackendService from '$lib/services/backend';

	export let achievements: achievementData[];

	$: mutateUserAchievements = BackendService.getInstance().achievement.mutateUserAchievements();

	let achievementsState: { [key: number]: { achieved: boolean; progression: string } } = {};
	let checkAllState: boolean = false;

	const isCheckboxChecked = (progression: string | undefined, index: number) => {
		if (!progression) {
			return false;
		}
		if (progression === '-1') {
			return true;
		} else if (progression === '0') {
			return false;
		} else {
			const checkedSteps = progression.split('@').map(Number);
			return checkedSteps.includes(index + 1);
		}
	};

	const updateAchievement = (achievementId: number, achieved: boolean, progression?: string) => {
		achievementsState[achievementId] = {
			achieved,
			progression:
				progression !== undefined
					? progression
					: achievementsState[achievementId]?.progression || '0'
		};
		$mutateUserAchievements.mutate({
			achievementsState,
			uid: get(userProfile).account.uid.toString()
		});
	};

	const handleCheckboxChange = (achievementId: number, checked: boolean | 'indeterminate') => {
		if (checked === 'indeterminate') {
			checked = false;
		}
		updateAchievement(achievementId, checked);
	};

	const handleStepChange = (
		achievement: achievementData,
		stepIndex: number,
		checked: boolean | 'indeterminate'
	) => {
		if (checked === 'indeterminate') {
			checked = false;
		}
		const currentProgression = achievementsState[achievement.id]?.progression || '0';
		let newProgression: string;

		const totalSteps = Array.isArray(achievement.steps) ? achievement.steps.length : 1;

		if (checked) {
			if (currentProgression === '0') {
				newProgression = `${stepIndex + 1}@`;
			} else if (currentProgression !== '-1') {
				const steps = currentProgression.split('@').filter(Boolean).map(Number);
				if (!steps.includes(stepIndex + 1)) {
					steps.push(stepIndex + 1);
					newProgression = steps.sort((a, b) => a - b).join('@') + '@';
				} else {
					newProgression = currentProgression;
				}
			} else {
				newProgression = '-1';
			}
		} else {
			if (currentProgression === '-1') {
				newProgression = Array.from({ length: totalSteps }, (_, i) =>
					i !== stepIndex ? i + 1 + '@' : ''
				).join('');
			} else {
				const steps = currentProgression.split('@').filter(Boolean).map(Number);
				newProgression = steps.filter((step) => step !== stepIndex + 1).join('@') + '@';
			}
		}

		if (newProgression === Array.from({ length: totalSteps }, (_, i) => i + 1 + '@').join('')) {
			newProgression = '-1';
		}
		if (newProgression === '@') {
			newProgression = '0';
		}
		updateAchievement(
			achievement.id,
			achievementsState[achievement.id]?.achieved || false,
			newProgression
		);
	};

	const handleCheckAll = (checked: boolean | 'indeterminate') => {
		if (checked === 'indeterminate') {
			checked = false;
		}
		checkAllState = checked;
		achievements.forEach((achievement) => {
			updateAchievement(achievement.id, checked, checked ? '-1' : '0');
		});
	};
</script>

<div class="flex flex-1 flex-col gap-2">
	<Card class="p-4">
		<div class="flex items-center justify-between gap-2">
			<Text type="h4">
				{`${(0 / achievements.length) * 100}% (${0} / ${achievements.length})`}
			</Text>
			<div class="flex items-center gap-2">
				<Text type="p">{$i18n.t('achievement.check_all')}</Text>
				<Checkbox checked={checkAllState} onCheckedChange={handleCheckAll} id="check-all" />
			</div>
		</div>
	</Card>
	{#each achievements as achievement (achievement.id)}
		<Card class={`${achievement.preStage ? '' : ''} p-4`}>
			<div class={`flex flex-row justify-between`}>
				<div class="flex flex-1 flex-col gap-2">
					<Text type="h4">{achievement.name}</Text>
					<div class="flex flex-row flex-wrap gap-2">
						{#if achievement.version}
							<Badge variant="secondary">{achievement.version}</Badge>
						{/if}
						{#if achievement.type}
							<Badge variant="secondary">{achievement.type}</Badge>
						{/if}
						{#if achievement.hidden === 'Yes'}
							<Badge variant="secondary">Hidden</Badge>
						{/if}
					</div>

					<Text type="p">{achievement.desc}</Text>
					{#if achievement.requirements || achievement.steps}
						<Collapsible>
							<div class="flex flex-row items-center gap-2">
								<CollapsibleTrigger>
									{$i18n.t('achievement.more_info')}
								</CollapsibleTrigger>
								<Separator class="flex" />
							</div>
							<CollapsibleContent class="flex flex-col gap-3">
								{#if achievement.requirements}
									<div>
										<Text type="h4">Requirements</Text>

										<Text type="p">
											{#if achievement.requirementQuestLink}
												<a
													href={'https://genshin-impact.fandom.com' +
														achievement.requirementQuestLink}
												>
													{achievement.requirements}
													<Icon path={mdiOpenInNew} />
												</a>
											{:else}
												{achievement.requirements}
											{/if}
										</Text>
									</div>
								{/if}

								{#if achievement.steps}
									<div>
										<Text type="h4">Steps</Text>
										{#if Array.isArray(achievement.steps)}
											{#each achievement.steps as step, index}
												<div class="flex flex-row items-center gap-2">
													<Checkbox
														checked={isCheckboxChecked(
															achievementsState[achievement.id]
																?.progression ||
																achievement.progression,
															index
														)}
														onCheckedChange={(checked) =>
															handleStepChange(
																achievement,
																index,
																checked
															)}
														id={`${achievement.id}-${index}`}
													/>
													<Text type="small">{step}</Text>
												</div>
											{/each}
										{:else}
											<div class="flex flex-row items-center gap-2">
												<Checkbox
													checked={isCheckboxChecked(
														achievementsState[achievement.id]
															?.progression ||
															achievement.progression,
														0
													)}
													onCheckedChange={(checked) =>
														handleStepChange(achievement, 0, checked)}
													id={`${achievement.id}-0`}
												/>
												<Text type="small">{achievement.steps}</Text>
											</div>
										{/if}
									</div>
								{/if}
							</CollapsibleContent>
						</Collapsible>
					{/if}
				</div>
				<div class="flex flex-row items-center justify-center gap-2">
					<Text
						type="p"
						class="flex min-w-16 flex-row items-center justify-center text-center"
					>
						{achievement.reward}
						<Icon path={mdiStarFourPoints} />
					</Text>
					<Checkbox
						checked={achievement.achieved}
						onCheckedChange={(checked) => handleCheckboxChange(achievement.id, checked)}
					/>
				</div>
			</div>
		</Card>
	{/each}
</div>
