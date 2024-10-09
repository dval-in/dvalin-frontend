<script lang="ts">
	import type { achievementData } from '$lib/types/achievement';
	import Text from '$lib/components/typography/Text.svelte';
	import ScrollArea from '../ui/scroll-area/scroll-area.svelte';
	import { Card } from '../ui/card';
	import { Checkbox } from '../ui/checkbox';
	import Badge from '../ui/badge/badge.svelte';
	import { Collapsible, CollapsibleTrigger } from '../ui/collapsible';
	import CollapsibleContent from '../ui/collapsible/collapsible-content.svelte';
	import Separator from '../ui/separator/separator.svelte';
	import { onMount } from 'svelte';
	import { debounce } from 'lodash-es';
	import { socketStore } from '$lib/services/socketServer';
	import type { Socket } from 'socket.io-client';
	import i18n from '$lib/services/i18n';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import { mdiStarFourPoints } from '@mdi/js';
	import { userProfile } from '$lib/store/user_profile';

	export let achievements: achievementData[];
	export let showUnDoneFirst: boolean = false;
	export let uid: string;

	let socket: Socket | null;
	let achievementsState: { [key: number]: { achieved: boolean; progression: string } } = {};

	$: sortedAchievements = showUnDoneFirst
		? [...achievements].sort((a, b) => (a.achieved === b.achieved ? 0 : a.achieved ? 1 : -1))
		: achievements;

	function isCheckboxChecked(progression: string | undefined, index: number) {
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
	}

	function updateAchievement(id: number, achieved: boolean, progression?: string) {
		achievementsState[id] = {
			achieved,
			progression:
				progression !== undefined ? progression : achievementsState[id]?.progression || '0'
		};
		sendUpdate();
	}

	const sendUpdate = debounce(() => {
		if (socket && socket.connected) {
			socket.emit('updateAchievements', { achievements: achievementsState, uid });
		}
		const updatedAchievements = {
			...($userProfile.achievements ?? {}),
			...achievementsState
		};

		$userProfile.achievements = updatedAchievements;
	}, 1000);

	function handleAchievedChange(
		achievement: achievementData,
		checked: boolean | 'indeterminate'
	) {
		if (checked === 'indeterminate') {
			checked = false;
		}
		updateAchievement(achievement.id, checked);
	}

	function handleStepChange(
		achievement: achievementData,
		stepIndex: number,
		checked: boolean | 'indeterminate'
	) {
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
	}

	onMount(() => {
		const unsubscribe = socketStore.subscribe((value) => {
			socket = value;
		});

		return () => {
			unsubscribe();
		};
	});
</script>

<ScrollArea class="h-screen">
	<div class="flex flex-col">
		{#each sortedAchievements as achievement}
			<Card class={`${achievement.preStage ? '' : 'mt-4'} p-4`}>
				<div class={`flex flex-row justify-between `}>
					<div class="w-10/12">
						<Text type="h4">{achievement.name}</Text>
						<Text type="p">{achievement.desc}</Text>
						<div class="flex flex-row gap-2">
							{#if achievement.hidden === 'Yes'}
								<Badge variant="secondary">Hidden</Badge>
							{/if}
							{#if achievement.type}
								<Badge variant="secondary">{achievement.type}</Badge>
							{/if}
							{#if achievement.version}
								<Badge variant="secondary">{achievement.version}</Badge>
							{/if}
						</div>
					</div>
					<div class="flex flex-col items-center justify-center gap-2">
						<Text type="p" class="flex flex-row items-center">
							{achievement.reward}
							<Icon path={mdiStarFourPoints} class="w-4" />
						</Text>
						<Checkbox
							checked={achievementsState[achievement.id]?.achieved ||
								achievement.achieved}
							onCheckedChange={(checked) =>
								handleAchievedChange(achievement, checked)}
						/>
					</div>
				</div>
				{#if achievement.requirements || achievement.steps}
					<Collapsible>
						<div class="flex flex-row items-center gap-2">
							<CollapsibleTrigger>
								{$i18n.t('achievement.more_info')}
							</CollapsibleTrigger>
							<Separator class="w-2/3" />
						</div>
						<CollapsibleContent>
							{#if achievement.requirements}
								<Text type="h4">Requirements</Text>
								{#if achievement.requirementQuestLink}
									<Text type="small">
										{achievement.requirements}

										(
										<a
											href={'https://genshin-impact.fandom.com' +
												achievement.requirementQuestLink}
											class="underline text-primary"
										>
											wiki
										</a>
										)
									</Text>
								{:else}
									<Text type="small">{achievement.requirements}</Text>
								{/if}
							{/if}

							{#if achievement.steps}
								<Text type="h4">Steps</Text>
								{#if Array.isArray(achievement.steps)}
									{#each achievement.steps as step, index}
										<div class="flex flex-row items-center gap-2">
											<Checkbox
												checked={isCheckboxChecked(
													achievementsState[achievement.id]
														?.progression || achievement.progression,
													index
												)}
												onCheckedChange={(checked) =>
													handleStepChange(achievement, index, checked)}
												id={`${achievement.id}-${index}`}
											/>
											<Text type="small">{step}</Text>
										</div>
									{/each}
								{:else}
									<div class="flex flex-row items-center gap-2">
										<Checkbox
											checked={isCheckboxChecked(
												achievementsState[achievement.id]?.progression ||
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
							{/if}
						</CollapsibleContent>
					</Collapsible>
				{/if}
			</Card>
		{/each}
	</div>
</ScrollArea>
