<script lang="ts">
	import type { achievementData } from '$lib/types/achievement';
	import Text from '$lib/components/typography/Text.svelte';
	import ScrollArea from '../ui/scroll-area/scroll-area.svelte';
	import { Card } from '../ui/card';
	import Checkbox from '../ui/checkbox/checkbox.svelte';
	import Badge from '../ui/badge/badge.svelte';
	import { Collapsible, CollapsibleTrigger } from '../ui/collapsible';
	import CollapsibleContent from '../ui/collapsible/collapsible-content.svelte';
	import Separator from '../ui/separator/separator.svelte';

	export let achievements: achievementData[];
</script>

<ScrollArea class="h-screen">
	<div class="flex flex-col">
		{#each achievements as achievement}
			<Card class={`${achievement.preStage ? '' : 'mt-4'} p-4`}>
				<div class={`flex flex-row justify-between `}>
					<div class="w-10/12">
						<Text type="h4">{achievement.name}</Text>
						<Text type="p">{achievement.desc}</Text>
						<div class="flex flex-row gap-2">
							{#if achievement.hidden}
								<Badge class="bg-primary/50">Hidden</Badge>
							{/if}
							{#if achievement.type}
								<Badge class="bg-primary/50">{achievement.type}</Badge>
							{/if}
							{#if achievement.version}
								<Badge class="bg-primary/50">{achievement.version}</Badge>
							{/if}
						</div>
					</div>
					<div class="flex flex-col">
						<Text type="p">{achievement.reward}</Text>
						<Checkbox />
					</div>
				</div>
				{#if achievement.requirements || achievement.steps}
					<Collapsible>
						<div class="flex flex-row items-center gap-2">
							<CollapsibleTrigger>More info</CollapsibleTrigger>
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
								{#each achievement.steps as step}
									<Text type="small">{step}</Text>
								{/each}
							{/if}
						</CollapsibleContent>
					</Collapsible>
				{/if}
			</Card>
		{/each}
	</div>
</ScrollArea>
