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
	import { Slider } from '$lib/components/ui/slider';
	import { mdiArrowLeft, mdiStar } from '@mdi/js';
	import * as Tabs from '$lib/components/ui/character-tabs';
	import * as Table from '$lib/components/ui/table';
	import * as Accordion from '$lib/components/ui/accordion';
	import CharacterBuilds from '$lib/components/ui/builds/character-builds.svelte';
	import defaultBuilds from '$lib/components/ui/builds/defaultBuilds.json';

	/** @type {import('../../../../.svelte-kit/types/src/routes').PageData} */
	export let data: {
		character: CharacterKey;
		characterData: Character;
		weaponIndex: WeaponIndex;
	};

	const card =
		S3Service.getCharacterLink(data.character) +
		'/gacha_card.' +
		data.characterData.pictures.gatchaCard.split('.')[1];
	const splash =
		S3Service.getCharacterLink(data.character) +
		'/gacha_splash.' +
		data.characterData.pictures.gachaSplash.split('.')[1];
	const ascensions = data.characterData.ascension;
	const skillTypes = ['Normal Attack', 'Elemental Skill', 'Elemental Burst'];

	function goBack() {
		history.back();
	}

	$: talentLevels = [9, 9, 9];
</script>

<main class="flex-col w-full h-min">
	<section
		class="grid grid-cols-1 gap-4 p-6 box-content lg:max-h-[65rem] lg:grid-cols-[15rem_1fr] lg:grid-flow-dense lg:grid-rows-[auto_auto_auto_auto_auto_auto_auto_auto_auto_auto_auto_auto]"
	>
		<div class="flex items-center gap-2 lg:col-start-2">
			<Button class="lg:hidden" on:click={goBack} variant="ghost" size="icon">
				<Icon class="fill-primary" path={mdiArrowLeft} />
			</Button>
			<Text class="text-primary" type="h1">{data.characterData.name}</Text>
		</div>
		<Card class="p-0 sm:p-0 relative lg:w-full lg:row-span-full">
			<img
				class="aspect-auto w-full rounded-lg object-contain object-center lg:hidden"
				src={splash}
				alt="{data.characterData.name} Gacha Splash"
			/>
			<img
				class="hidden h-0 min-h-full w-full rounded-lg object-cover object-center lg:block"
				src={card}
				alt="{data.characterData.name} Gacha Card"
			/>
			<div class="flex w-full justify-center absolute bottom-3 left-0">
				{#each { length: data.characterData.rarity } as _}
					<Icon
						path={mdiStar}
						class={data.characterData.rarity == 5 ? 'fill-fivestar' : 'fill-fourstar'}
					/>
				{/each}
			</div>
		</Card>
		<span class="font-bold lg:row-start-2">
			{data.characterData.element} • {data.characterData.weaponType}
		</span>
		<div class="flex flex-row w-full gap-2 lg:row-start-3">
			{#each defaultBuilds as build}
				<Badge class="rounded bg-tertiary h-min p-2" variant="default">{build.name}</Badge>
			{/each}
		</div>
		<!--Badges-->

		<Text class="w-full lg:row-start-4" type="p">{data.characterData.description}</Text>

		<Tabs.Root
			value="stats"
			class="lg:row-start-5 lg:row-span-full lg:flex lg:flex-col lg:flex-shrink lg:h-full"
		>
			<Tabs.List class="grid w-full grid-cols-3">
				<Tabs.Trigger value="stats">Stats</Tabs.Trigger>
				<Tabs.Trigger value="talents">Talents</Tabs.Trigger>
				<Tabs.Trigger value="constellations">Constellations</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content
				value="stats"
				class="border border-secondary/50 lg:flex-shrink lg:overflow-auto"
			>
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
			<Tabs.Content value="talents" class="lg:flex-shrink lg:overflow-auto">
				<div class="flex flex-col gap-4">
					<Accordion.Root class="flex flex-col gap-2">
						{#each data.characterData.skills as skill, i}
							<Accordion.Item value={'item-' + i.toString()} class="border-0">
								<Card class="p-4 sm:p-4">
									<Accordion.Trigger class="p-0">
										<div class="flex flex-col items-start">
											<Text type="h3">{skill.name}</Text>
											<Text type="p">{skillTypes[i]}</Text>
										</div>
									</Accordion.Trigger>

									<Accordion.Content class="flex-grow min-h-full">
										<div
											class="flex flex-col gap-4 py-4 lg:grid lg:grid-cols-2 lg:items-center lg:h-full lg:auto-rows-auto"
										>
											<div class="flex flex-col gap-4 lg:grid lg:grid-rows-subgrid lg:row-span-2">
												<Table.Root class="border border-secondary lg:w-full lg:h-full">
													<Table.Body>
														{#each skill.attributes as attr}
															<Table.Row class="border-secondary">
																<Table.Cell class="p-2 font-bold border-r border-secondary"
																	>{attr.label}</Table.Cell
																>
																<Table.Cell class="p-2">{attr.values[talentLevels[i]]}</Table.Cell>
															</Table.Row>
														{/each}
													</Table.Body>
												</Table.Root>
												<Text type="h4">Skill Attributes: (Level {talentLevels[i] + 1})</Text>
											</div>
											<div
												class="flex-shrink flex flex-col gap-6 lg:grid lg:grid-rows-subgrid lg:row-span-2"
											>
												<div id="skill">{skill.description}</div>
												<div class="px-4">
													<Slider
														value={[10]}
														onValueChange={(v) => {
															talentLevels[i] = v[0];
														}}
														max={14}
														step={1}
													/>
												</div>
											</div>
										</div>
									</Accordion.Content>
								</Card>
							</Accordion.Item>
						{/each}
					</Accordion.Root>
					<div class="flex flex-1 flex-col gap-2 lg:flex-row">
						{#each data.characterData.passives as passive}
							<Card class="flex flex-col bg-neutral border-secondary w-full">
								<Text type="h4"
									>{`${passive.level == 0 ? 'Utility Passive: ' : `A${passive.level}: `} ${passive.name}`}</Text
								>
								<Text type="p">{passive.description}</Text>
							</Card>
						{/each}
					</div>
				</div>
			</Tabs.Content>
			<Tabs.Content value="constellations">
				<div
					class="grid grid-cols-1 grid-row-6 gap-2 lg:h-fit lg:grid-cols-2 lg:grid-rows-[auto_auto_auto] lg:grid-flow-col"
				>
					{#each data.characterData.constellations as con}
						<Card class="flex flex-col gap-2">
							<Text type="h4">{con.level}. {con.name}</Text>
							<Text type="p">{con.description}</Text>
						</Card>
					{/each}
				</div>
			</Tabs.Content>
		</Tabs.Root>

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

<style>
	:global(span) {
		font-weight: bold;
	}
</style>
