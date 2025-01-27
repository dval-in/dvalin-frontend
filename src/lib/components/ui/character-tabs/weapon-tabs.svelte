<script lang="ts">
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/character-tabs';
	import Card from '$lib/components/ui/card/card.svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import StatTable from '$lib/components/tables/weapon-tab-table/StatTable.svelte';
	import i18n from '$lib/services/i18n';
	import type { Weapon } from 'dvalin-data';

	export let weaponData: Weapon;
	const ascensions = weaponData.ascensions;
	const stats = weaponData.stats;
</script>

<Tabs value="stats" class="lg:flex lg:grow lg:flex-col">
	<TabsList class="grid w-full grid-cols-2">
		<TabsTrigger value="stats">{$i18n.t('weapons.detailed.tab.stats.title')}</TabsTrigger>
		<TabsTrigger value="refinement">
			{$i18n.t('weapons.detailed.tab.refinement.title')}
		</TabsTrigger>
		<!-- TODO : Add Materials Tab -->
		<!-- <TabsTrigger value="materials">
			{$i18n.t('weapons.detailed.tab.materials.title')}
		</TabsTrigger> -->
	</TabsList>
	<TabsContent value="stats" class="border-secondary/50 border lg:shrink lg:overflow-auto">
		<StatTable {ascensions} {stats} />
	</TabsContent>
	<!--Ascension Table-->
	<TabsContent value="refinement" class="lg:shrink lg:overflow-auto">
		{#each weaponData.refinements as refinement}
			<Card class="flex flex-1 flex-col gap-2">
				<Text type="h4">{weaponData.passive}. {refinement.refinement}</Text>
				<Text type="p" class="text-sm">{refinement.desc}</Text>
			</Card>
		{/each}
	</TabsContent>
</Tabs>
