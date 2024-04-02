<script lang="ts">
	import * as Tabs from '$lib/components/ui/character-tabs';
	import { type Character } from '$lib/types/data/Character';
	import Card from '$lib/components/ui/card/card.svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import StatTable from './stat-table.svelte';
	import TalentTable from './talent-table.svelte';

	export let characterData: Character;
	const ascensions = characterData.ascension;
</script>

<Tabs.Root value="talents" class="lg:flex lg:flex-col lg:flex-grow lg:h-0">
	<Tabs.List class="grid w-full grid-cols-3">
		<Tabs.Trigger value="stats">Stats</Tabs.Trigger>
		<Tabs.Trigger value="talents">Talents</Tabs.Trigger>
		<Tabs.Trigger value="constellations">Constellations</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="stats" class="border border-secondary/50 lg:flex-shrink lg:overflow-auto">
		<StatTable {ascensions} />
	</Tabs.Content>
	<!--Ascension Table-->
	<Tabs.Content value="talents" class="lg:flex-shrink relative lg:h-full lg:overflow-auto">
		<TalentTable skills={characterData.skills} passives={characterData.passives} />
	</Tabs.Content>
	<Tabs.Content value="constellations" class="lg:flex-shrink lg:overflow-auto">
		<div class="grid grid-cols-1 grid-row-6 gap-2">
			{#each characterData.constellations as con}
				<Card class="flex flex-col gap-2 flex-1">
					<Text type="h4">{con.level}. {con.name}</Text>
					<Text type="p" class="text-sm">{con.description}</Text>
				</Card>
			{/each}
		</div>
	</Tabs.Content>
</Tabs.Root>
