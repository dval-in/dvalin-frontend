<script lang="ts">
	import Text from '$lib/components/typography/Text.svelte';
	import Card from '../card/card.svelte';
	import WeaponItem from './weapon-item.svelte';
	import ArtifactItem from './artifact-item.svelte';
	import type { ArtifactSetKey } from '$lib/types/keys/ArtifactSetKey';
	import { isWeaponKey, type WeaponKey } from '$lib/types/keys/WeaponKey';
	import IconCirclet from '$lib/assets/Icon_Circlet_of_Logos.png';
	import IconGoblet from '$lib/assets/Icon_Goblet_of_Eonothem.png';
	import IconSands from '$lib/assets/Icon_Sands_of_Eon.png';
	import { dataIndexStore } from '$lib/store/index_store.js';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import i18n from '$lib/services/i18n';

	export let builds: Build[];

	type Build = {
		name: string;
		description: string[];
		talentPriority: string[];
		weapons: {
			signatureWeapon: string;
			altWeapons: string[];
		};
		artifacts: {
			signatureSet: {
				key: ArtifactSetKey;
				quantity: number;
			};
			altSets: {
				key: ArtifactSetKey;
				quantity: number;
			}[];
			stats: {
				main: string[];
				sub: string[];
			};
		};
	};

	function getKey(key: string): ArtifactSetKey | WeaponKey {
		if (isWeaponKey(key)) {
			return key;
		} else {
			return key;
		}
	}

	const buildItems = [
		{
			name: 'Sands of Eon',
			img: IconSands
		},
		{
			name: 'Goblet of Eonothem',
			img: IconGoblet
		},
		{
			name: 'Circlet of Logos',
			img: IconCirclet
		}
	];
	// [IMPORTANT!] Change IMG links later!!
</script>

<Tabs value={builds[0].name} class="w-full">
	<TabsList class={`grid grid-cols-${builds.length}`}>
		{#each builds as build}
			<TabsTrigger value={build.name}>{build.name}</TabsTrigger>
		{/each}
	</TabsList>
	{#each builds as build}
		<TabsContent value={build.name}>
			<div class="flex flex-col lg:flex-row gap-4 pt-2">
				<div
					class="flex flex-col lg:order-2 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:grid-flow-dense gap-4"
				>
					<Card class="h-min max-w-full flex flex-col gap-4 p-4 lg:h-auto">
						<Text type="h3">
							{$i18n.t('characters.detailed.category.builds.weapons.title')}
						</Text>
						<WeaponItem
							signature={true}
							rarity={$dataIndexStore.weapon[getKey(build.weapons.signatureWeapon)]
								.rarity}
							refine={1}
							key={getKey(build.weapons.signatureWeapon)}
						/>
						<div class="flex flex-col gap-2">
							{#each build.weapons.altWeapons as alt}
								<WeaponItem
									signature={false}
									rarity={$dataIndexStore.weapon[getKey(alt)].rarity}
									key={getKey(alt)}
								/>
							{/each}
						</div>
					</Card>
					<!--Weapon Recomendation Card-->

					<Card class="h-min max-w-full flex flex-col gap-4 p-4 lg:row-span-2">
						<Text type="h3">
							{$i18n.t('characters.detailed.category.builds.artifacts.title')}
						</Text>
						<ArtifactItem
							signature={true}
							rarity={5}
							quantity={build.artifacts.signatureSet.quantity}
							key={build.artifacts.signatureSet.key}
						/>
						<div class="flex flex-col gap-2">
							{#each build.artifacts.altSets as alt}
								<ArtifactItem signature={false} rarity={5} key={alt.key} />
							{/each}
						</div>
						<Text type="h4">
							{$i18n.t(
								'characters.detailed.category.builds.artifacts.main_stats.title'
							)}
						</Text>
						<div
							class="grid grid-cols-3 grid-rows-2 grid-flow-col items-center justify-items-center text-center gap-2"
						>
							{#each build.artifacts.stats.main as item, i}
								<img
									class="w-full min-w-0 object-contain h-fit max-w-12"
									alt={buildItems[i].name}
									src={buildItems[i].img}
								/>
								<Text type="p">{item}</Text>
							{/each}
						</div>

						<Text type="h4">
							{$i18n.t(
								'characters.detailed.category.builds.artifacts.sub_stats.title'
							)}
						</Text>
						<div class="flex flex-col gap-1">
							{#each build.artifacts.stats.sub as item}
								<Text type="p">{item}</Text>
							{/each}
						</div>
					</Card>
					<!--Artifact Recomendation Card-->

					<Card class="h-min max-w-full flex flex-col gap-4 p-4">
						<Text type="h3">
							{$i18n.t('characters.detailed.category.builds.talents.title')}
						</Text>
						<div class="flex flex-row flex-1 gap-2 h-16 justify-center items-center">
							<img
								class="w-full min-w-0 object-contain max-w-12"
								src={buildItems[0].img}
								alt={build.talentPriority[0]}
							/>
							<p>&gt;</p>
							<img
								class="w-full min-w-0 object-contain max-w-12"
								src={buildItems[0].img}
								alt={build.talentPriority[1]}
							/>
							<p>&gt;</p>
							<img
								class="w-full min-w-0 object-contain max-w-12"
								src={buildItems[0].img}
								alt={build.talentPriority[2]}
							/>
						</div>
					</Card>
					<!--Talent Priority Card-->
				</div>
				<div class="basis-3/4 flex flex-col gap-2 lg:order-1">
					{#each build.description as p}
						<Text type="p">
							{p}
						</Text>
					{/each}
				</div>
			</div>
		</TabsContent>
	{/each}
</Tabs>
