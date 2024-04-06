<script lang="ts">
	import Card from '$lib/components/ui/card/card.svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import * as Table from '$lib/components/tables/character-tab-table';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import { Slider } from '$lib/components/ui/slider';
	import type { Passive, Skill } from '$lib/types/data/Character';
	import Button from '$lib/components/ui/button/button.svelte';
	import Icon from '../../ui/icon/icon.svelte';
	import { mdiClose } from '@mdi/js';

	export let skills: Skill[];
	export let passives: Passive[];
	const skillTypes = ['Normal Attack', 'Elemental Skill', 'Elemental Burst'];

	$: talentLevels = [9, 9, 9];
	$: detailOpen = false;
	$: currentSkill = 0;
</script>

<div
	data-open={detailOpen}
	class="data-[open=true]:hidden flex flex-col gap-4 h-full flex-shrink lg:overflow-auto"
>
	<div class="flex flex-col gap-2 h-full">
		{#each skills as skill, i}
			<Button
				variant="ghost"
				class="h-full flex flex-col items-start bg-tertiary"
				on:click={() => {
					currentSkill = i;
					detailOpen = true;
				}}
			>
				<Text type="h4" class="text-wrap text-left">{skill.name}</Text>
				<Text type="p" class="text-base">{skillTypes[i]}</Text>
			</Button>
		{/each}
	</div>
	<div class="flex flex-1 flex-col gap-2 lg:flex-row lg:max-h-full">
		{#each passives as passive}
			<Card
				class="flex flex-col bg-neutral border-secondary h-full w-full lg:overflow-auto sm:p-0"
			>
				<Collapsible.Root class="h-full">
					<Collapsible.Trigger class="flex flex-col w-full p-4 h-full">
						<Text type="p" class="font-bold text-lg w-full">
							{`${passive.level == 0 ? 'Utility Passive: ' : `A${passive.level}: `} ${passive.name}`}
						</Text>
						<Collapsible.Content>
							<Text type="p" class="text-sm lg:overflow-auto"
								>{passive.description}</Text
							>
						</Collapsible.Content>
					</Collapsible.Trigger>
				</Collapsible.Root>
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
			<Text type="h4">{skills[currentSkill].name}</Text>
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
	<div class="flex flex-col gap-4 lg:items-start lg:flex-row lg:h-full lg:max-h-full lg:min-h-0">
		<div class="lg:flex lg:flex-col lg:w-full lg:h-full">
			<Table.Root class="flex-1 border border-secondary lg:overflow-auto">
				<Table.Body>
					{#each skills[currentSkill].attributes as attr}
						<Table.Row class="border-secondary">
							<Table.Cell
								class="py-1 px-2 font-bold border-r border-secondary text-sm"
								>{attr.label}</Table.Cell
							>
							<Table.Cell class="py-1 px-2 text-sm"
								>{attr.values[talentLevels[currentSkill]]}</Table.Cell
							>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
			<div class="p-4 w-full flex flex-col gap-3 justify-between lg:flex-row">
				<Text type="p" class="font-bold size-base w-full">
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
		</div>

		<div id="skill" class="lg:w-full lg:overflow-auto lg:h-full text-sm">
			{skills[currentSkill].description}
		</div>
	</div>
</Card>

<style>
	:global(span) {
		font-weight: bold;
	}
</style>
