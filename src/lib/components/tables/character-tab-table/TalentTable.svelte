<script lang="ts">
	import Card from '$lib/components/ui/card/card.svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import {
		Collapsible,
		CollapsibleContent,
		CollapsibleTrigger
	} from '$lib/components/ui/collapsible';
	import { Slider } from '$lib/components/ui/slider';
	import type { Passive, Skill } from '$lib/types/data/Character';
	import Button from '$lib/components/ui/button/button.svelte';
	import Icon from '../../ui/icon/icon.svelte';
	import { mdiClose } from '@mdi/js';
	import { Table, TableBody, TableCell, TableRow } from '$lib/components/ui/table';

	export let skills: Skill[];
	export let passives: Passive[];
	const skillTypes = ['Normal Attack', 'Elemental Skill', 'Elemental Burst'];

	$: talentLevels = [9, 9, 9];
	$: detailOpen = false;
	$: currentSkill = 0;
</script>

<div
	data-open={detailOpen}
	class="flex h-full shrink flex-col gap-4 data-[open=true]:hidden lg:overflow-auto"
>
	<div class="flex h-full flex-col gap-2">
		{#each skills as skill, i}
			<Button
				variant="ghost"
				class="bg-tertiary flex h-full flex-col items-start"
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
	<div class="flex flex-1 flex-col gap-2 lg:max-h-full lg:flex-row">
		{#each passives as passive}
			<Card
				class="bg-neutral border-secondary flex h-full w-full flex-col sm:p-0 lg:overflow-auto"
			>
				<Collapsible class="h-full">
					<CollapsibleTrigger class="flex h-full w-full flex-col p-4">
						<Text type="p" class="w-full text-lg font-bold">
							{`${passive.level === 0 ? 'Utility Passive: ' : `A${passive.level}: `} ${passive.name}`}
						</Text>
						<CollapsibleContent>
							<Text type="p" class="text-sm lg:overflow-auto">
								{passive.description}
							</Text>
						</CollapsibleContent>
					</CollapsibleTrigger>
				</Collapsible>
			</Card>
		{/each}
	</div>
</div>

<Card
	data-open={detailOpen}
	class="hidden h-full flex-col justify-between border-0 px-4 data-[open=true]:flex"
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
				}}
			>
				<Icon path={mdiClose} />
			</Button>
		</span>
		<Text type="p">{skillTypes[currentSkill]}</Text>
	</div>
	<div class="flex flex-col gap-4 lg:h-full lg:max-h-full lg:min-h-0 lg:flex-row lg:items-start">
		<div class="lg:flex lg:h-full lg:w-full lg:flex-col">
			<Table class="border-secondary flex-1 border lg:overflow-auto">
				<TableBody>
					{#each skills[currentSkill].attributes as attr}
						<TableRow class="border-secondary">
							<TableCell
								class="border-secondary border-r px-2 py-1 text-sm font-bold"
							>
								{attr.label}
							</TableCell>
							<TableCell class="px-2 py-1 text-sm">
								{attr.values[talentLevels[currentSkill]]}
							</TableCell>
						</TableRow>
					{/each}
				</TableBody>
			</Table>
			<div class="flex w-full flex-col justify-between gap-3 p-4 lg:flex-row">
				<Text type="p" class="size-base w-full font-bold">
					Skill Attributes: (Level {talentLevels[currentSkill] + 1})
				</Text>
				<Slider
					value={[9]}
					onValueChange={(v) => {
						talentLevels[currentSkill] = v[0];
					}}
					max={14}
					step={1}
				/>
			</div>
		</div>

		<div id="skill" class="text-sm lg:h-full lg:w-full lg:overflow-auto">
			{skills[currentSkill].description}
		</div>
	</div>
</Card>

<style>
	:global(span) {
		font-weight: bold;
	}
</style>
