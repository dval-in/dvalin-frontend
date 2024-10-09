<script lang="ts">
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/character-tabs';
	import type { Character } from 'dvalin-data';
	import Card from '$lib/components/ui/card/card.svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import StatTable from '$lib/components/tables/character-tab-table/StatTable.svelte';
	import TalentTable from '$lib/components/tables/character-tab-table/TalentTable.svelte';
	import i18n from '$lib/services/i18n';

	export let characterData: Character;
	const ascensions = characterData.ascension;
</script>

<Tabs value="talents" class="lg:flex lg:flex-col lg:flex-grow lg:h-0">
	<TabsList class="grid w-full grid-cols-3">
		<TabsTrigger value="stats">{$i18n.t('characters.detailed.tab.stats.title')}</TabsTrigger>
		<TabsTrigger value="talents">
			{$i18n.t('characters.detailed.tab.talents.title')}
		</TabsTrigger>
		<TabsTrigger value="constellations">
			{$i18n.t('characters.detailed.tab.constellations.title')}
		</TabsTrigger>
	</TabsList>
	<TabsContent value="stats" class="border border-secondary/50 lg:flex-shrink lg:overflow-auto">
		<StatTable {ascensions} />
	</TabsContent>
	<!--Ascension Table-->
	<TabsContent value="talents" class="lg:flex-shrink relative lg:h-full lg:overflow-auto">
		<TalentTable skills={characterData.skills} passives={characterData.passives} />
	</TabsContent>
	<TabsContent value="constellations" class="lg:flex-shrink lg:overflow-auto">
		<div class="grid grid-cols-1 grid-row-6 gap-2">
			{#each characterData.constellations as con}
				<Card class="flex flex-col gap-2 flex-1">
					<Text type="h4">{con.level}. {con.name}</Text>
					<Text type="p" class="text-sm">{con.description}</Text>
				</Card>
			{/each}
		</div>
	</TabsContent>
</Tabs>
