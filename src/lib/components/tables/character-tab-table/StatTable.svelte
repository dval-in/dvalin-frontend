<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import type { Ascension } from 'dvalin-data';

	export let ascensions: Ascension[];
</script>

<Table.Root class="h-full overflow-auto">
	<Table.Header>
		<Table.Row class="p-2 border-b border-secondary/50">
			{#each ascensions[0].stats as stat, i}
				<Table.Head class="p-2 px-4 font-bold">
					{stat.label === 'Ascend' ? 'ASC' : stat.label.replace('Base ', '')}
				</Table.Head>
				{#if i == 0}
					<Table.Head class="p-2 px-4 font-bold">Level</Table.Head>
				{/if}
			{/each}
		</Table.Row>
	</Table.Header>
	<Table.Body class="h-full">
		{#each ascensions.slice(1, 8) as ascension, j}
			<Table.Row class="p-2 border-y border-secondary/50">
				{#each ascension.stats as stat, i}
					<Table.Cell class="p-2 px-4">
						<div class="flex flex-col">
							{#if i != 0}
								<p>
									{ascensions.at(j)?.stats[i].values?.at(1)}
								</p>
							{/if}
							<p>
								{stat.values?.at(0)}
							</p>
						</div>
					</Table.Cell>

					{#if i == 0}
						<Table.Cell class="p-2 px-4">
							<div class="flex flex-col">
								<p>
									{ascensions.at(j)?.level?.at(0)}
								</p>
								{#if ascensions.at(j + 1)}
									<p>
										{ascensions.at(j + 1)?.level?.at(0)}
									</p>
								{/if}
							</div>
						</Table.Cell>
					{/if}
					<!--Level Data-->
				{/each}
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
