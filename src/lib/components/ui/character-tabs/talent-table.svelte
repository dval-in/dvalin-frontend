<script lang="ts">
	import Card from '$lib/components/ui/card/card.svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import * as Table from '$lib/components/ui/table';
	import { Slider } from '$lib/components/ui/slider';
	import type { Skill } from '$lib/types/data/Character';
	import Button from '$lib/components/ui/button/button.svelte';
	import Icon from '../icon/icon.svelte';
	import { mdiClose } from '@mdi/js';

	export let skills: Skill[];
	export let passives: Passive[];
	const skillTypes = ['Normal Attack', 'Elemental Skill', 'Elemental Burst'];

	$: talentLevels = [9, 9, 9];
	$: detailOpen = false;
	$: currentSkill = 0;
</script>

<div data-open={detailOpen} class="data-[open=true]:hidden flex flex-col gap-4 h-full flex-shrink">
	<div class="flex flex-col gap-2 h-full">
		{#each skills as skill, i}
			<Button
				variant="ghost"
				class="h-full flex flex-col items-start bg-tertiary "
				on:click={() => {
					currentSkill = i;
					detailOpen = true;
				}}
			>
				<Text type="h3" class="text-wrap text-left">{skill.name}</Text>
				<Text type="p" class="text-base">{skillTypes[i]}</Text>
			</Button>
		{/each}
	</div>
	<div class="flex flex-1 flex-col gap-2 lg:flex-row lg:h-full">
		{#each passives as passive}
			<Card class="flex flex-col bg-neutral border-secondary">
				<Text type="p" class="font-bold text-lg"
					>{`${passive.level == 0 ? 'Utility Passive: ' : `A${passive.level}: `} ${passive.name}`}</Text
				>
				<Text type="p" class="text-sm lg:overflow-auto">{passive.description}</Text>
			</Card>
		{/each}
	</div>
</div>

<Card
	data-open={detailOpen}
	class="data-[open=true]:flex flex-col justify-between h-full border-0 hidden px-4"
>
	<div class="flex flex-col gap-0">
		<span class="flex justify-between">
			<Text type="h3">{skills[currentSkill].name}</Text>
			<Button
				size="icon"
				variant="ghost"
				class="hover:bg-neutral"
				on:click={() => {
					detailOpen = false;
				}}><Icon path={mdiClose}></Icon></Button
			>
		</span>
		<Text type="p">{skillTypes[currentSkill]}</Text>
	</div>
	<div
		class="flex flex-col gap-4 lg:grid lg:grid-cols-[auto_auto] lg:items-center lg:h-full lg:grid-rows-[auto_auto]"
	>
		<Table.Root class="border border-secondary lg:w-fit lg:overflow-auto">
			<Table.Body>
				{#each skills[currentSkill].attributes as attr}
					<Table.Row class="border-secondary">
						<Table.Cell class="py-1 px-2 font-bold border-r border-secondary text-sm"
							>{attr.label}</Table.Cell
						>
						<Table.Cell class="py-1 px-2 text-sm"
							>{attr.values[talentLevels[currentSkill]]}</Table.Cell
						>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>

		<div id="skill">{skills[currentSkill].description}</div>
	</div>
	<div class="p-4 w-full flex flex-col gap-3 justify-between lg:flex-row">
		<Text type="h4" class="h-fit">
			Skill Attributes: (Level {talentLevels[currentSkill] + 1})
		</Text>
		<Slider
			value={[10]}
			onValueChange={(v) => {
				talentLevels[currentSkill] = v[0];
			}}
			max={14}
			step={1}
		/>
	</div>
</Card>

<style>
	:global(span) {
		font-weight: bold;
	}
</style>
