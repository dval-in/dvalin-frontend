<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import type { Weapon, WeaponAscension } from 'dvalin-data';

	export let ascensions: WeaponAscension[];
	export let stats: Weapon['stats'];
</script>

<Table.Root class="h-full overflow-auto">
	<Table.Header>
		<Table.Row class="border-secondary/50 border-b p-2">
			<Table.Head class="p-2 px-4 font-bold">Asc</Table.Head>
			<Table.Head class="p-2 px-4 font-bold">Level</Table.Head>
			{#each Object.values(stats) as value}
				{#if typeof value === 'string'}
					<Table.Head class="p-2 px-4 font-bold">
						{value.replace('Base ', '')}
					</Table.Head>
				{/if}
			{/each}
		</Table.Row>
	</Table.Header>
	<Table.Body class="h-full">
		{#each ascensions as ascension, j}
			<Table.Row class="border-secondary/50 border-y p-2">
				<Table.Cell class="p-2 px-4">
					<div class="flex flex-col">
						<p>
							{ascension.ascension}
						</p>
					</div>
				</Table.Cell>
				<Table.Cell class="p-2 px-4">
					<div class="flex flex-col">
						<p>
							{ascension.level}
						</p>
					</div>
				</Table.Cell>
				<Table.Cell class="p-2 px-4">
					<div class="flex flex-col">
						<p>
							{stats.levels[j * 2].primary}
						</p>
						<p>
							{stats.levels[j * 2 + 1].primary}
						</p>
					</div>
				</Table.Cell>
				<Table.Cell class="p-2 px-4">
					<div class="flex flex-col">
						<p>
							{stats.levels[j * 2].secondary}
						</p>
						<p>
							{stats.levels[j * 2 + 1].secondary}
						</p>
					</div>
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
