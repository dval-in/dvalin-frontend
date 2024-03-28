<script lang="ts">
	import { type WeaponIndex } from '$lib/types/index/weapon';
	import { type CharacterKey } from '$lib/types/keys/CharacterKey';
	import { type Character } from '$lib/types/data/Character';
	import S3Service from '$lib/services/s3';
	import Text from '$lib/components/typography/Text.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import { mdiArrowLeft, mdiStar } from '@mdi/js';
	import * as Tabs from '$lib/components/ui/character-tabs';
	import * as Table from '$lib/components/ui/table';
	import CharacterBuilds from '$lib/components/ui/builds/character-builds.svelte';
	import defaultBuilds from '$lib/components/ui/builds/defaultBuilds.json';

	/** @type {import('../../../../.svelte-kit/types/src/routes').PageData} */
	export let data: {
		character: CharacterKey;
		characterData: Character;
		weaponIndex: WeaponIndex;
	};

	const splash = S3Service.getCharacterLink(data.character) + '/gacha_splash.webp';
	const ascensions = data.characterData.ascension;

	function goBack() {
		history.back();
	}
</script>

<main class="flex-col w-full h-min">
	<section
		class="grid grid-cols-1 gap-4 p-6 box-content md:max-h-[65vh] md:grid-cols-2 md:grid-flow-dense md:auto-cols-min md:grid-rows-10"
	>
		<div class="flex items-center gap-2 md:col-start-2">
			<Button on:click={goBack} variant="ghost" size="icon">
				<Icon color="fill-primary" path={mdiArrowLeft} />
			</Button>
			<Text textColor="primary" type="h1">{data.characterData.name}</Text>
		</div>
		<Card
			class="p-0 sm:p-0 aspect-[1/2] h-full w-full box-border relative md:w-auto md:h-0 md:min-h-full md:row-span-full"
		>
			<img
				class="h-0 min-h-full rounded-md object-cover object-center"
				src={splash}
				alt="{data.characterData.name} Gacha Splash"
			/>
			<div class="flex w-full justify-center absolute bottom-3 left-0">
				{#each { length: data.characterData.rarity } as _}
					<Icon
						path={mdiStar}
						color={data.characterData.rarity == 5 ? 'fill-fivestar' : 'fill-fourstar'}
					/>
				{/each}
			</div>
		</Card>

		<div class="flex flex-col gap-2 md:grid-rows-subgrid md:row-start-2 md:row-span-full">
			<span class=" font-bold">{data.characterData.element} • {data.characterData.weaponType}</span>
			<div class="flex flex-row w-full">
				<Badge class="rounded bg-tertiary" variant="default">Sub-DPS</Badge>
				<!--Find Badge Data Somewhere?-->
				<!--
							{#each badges as badge}
							 <Badge variant="default">{ badge }</Badge>
							{/each}
						-->
			</div>
			<!--Badges-->
			<span class="w-full"><Text type="p">{data.characterData.description}</Text></span>
			<Tabs.Root value="stats" class="w-full h-full min-h-0 flex-grow md:row-start-4 md:row-span-6">
				<Tabs.List class="grid w-full grid-cols-3">
					<Tabs.Trigger value="stats">Stats</Tabs.Trigger>
					<Tabs.Trigger value="talents">Talents</Tabs.Trigger>
					<Tabs.Trigger value="constellations">Constellations</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="stats" class="border border-secondary/50">
					<Table.Root class="h-full">
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
						<Table.Body>
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
				</Tabs.Content>
				<!--Ascension Table-->
				<Tabs.Content value="talents"></Tabs.Content>
				<Tabs.Content value="constellations"></Tabs.Content>
			</Tabs.Root>
		</div>

		<!--Text Column-->
	</section>
	<!--Basic Character Details-->

	<section class="flex flex-col w-full gap-4 p-6 box-border">
		<span class="flex justify-between">
			<Text type="h2">Builds</Text>
			<Button href="https://keqingmains.com/{data.character.toLocaleLowerCase()}"
				>View on KQM</Button
			>
		</span>
		<CharacterBuilds builds={defaultBuilds} weaponIndex={data.weaponIndex} />
	</section>
</main>
