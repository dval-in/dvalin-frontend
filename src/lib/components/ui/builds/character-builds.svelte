<script lang="ts">
	import * as Tabs from '$lib/components/ui/character-tabs';
	import Text from '$lib/components/typography/Text.svelte';
	import Card from '../card/card.svelte';
	import WeaponItem from './weapon-item.svelte';
	import ArtifactItem from './artifact-item.svelte';
	import type { ArtifactSetKey } from '$lib/types/keys/ArtifactSetKey';
	import type { WeaponIndex } from '$lib/types/index/weapon';
	import { isWeaponKey, type WeaponKey } from '$lib/types/keys/WeaponKey';

	export let builds: Build[];
	export let weaponIndex: WeaponIndex;

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
				key: string;
				quantity: number;
			};
			altSets: {
				key: string;
				quantity: number;
			}[];
		};
	};

	function getKey(key: string): ArtifactSetKey | WeaponKey {
		if (isWeaponKey(key)) {
			return <WeaponKey>key;
		} else {
			return <ArtifactSetKey>key;
		}
	}
</script>

<Tabs.Root value={builds[0].name} class="w-full">
	<Tabs.List class={`grid grid-cols-${builds.length}`}>
		{#each builds as build}
			<Tabs.Trigger value={build.name}>{build.name}</Tabs.Trigger>
		{/each}
	</Tabs.List>
	{#each builds as build}
		<Tabs.Content value={build.name}>
			<div class="flex flex-row gap-4">
				<div class="basis-1/2 flex flex-col gap-2">
					{#each build.description as p}
						<Text type="p">
							{p}
						</Text>
					{/each}
				</div>
				<div class="basis-1/4 flex flex-col gap-4">
					<Card class="flex flex-col w-full gap-2">
						<Text type="h3">Weapons</Text>
						<WeaponItem
							signature={true}
							rarity={weaponIndex[getKey(build.weapons.signatureWeapon)].rarity}
							refine={1}
							key={getKey(build.weapons.signatureWeapon)}
							index={weaponIndex}
						/>
						{#each build.weapons.altWeapons as alt}
							<WeaponItem
								signature={false}
								rarity={weaponIndex[getKey(alt)].rarity}
								key={getKey(alt)}
								index={weaponIndex}
							/>
						{/each}
					</Card>
					<!--Weapon Recomendation Card-->

					<Card class="flex flex-col w-full gap-4">
						<Text type="h3">Talents</Text>
						<div class="flex flex-row w-full gap-2 h-16 justify-center items-center">
							<img
								class="aspect-square object-cover h-0 min-h-full"
								src=""
								alt={build.talentPriority[0]}
							/>
							<p>&gt;</p>
							<img
								class="aspect-square object-cover h-0 min-h-full"
								src=""
								alt={build.talentPriority[1]}
							/>
							<p>&gt;</p>
							<img
								class="aspect-square object-cover h-0 min-h-full"
								src=""
								alt={build.talentPriority[2]}
							/>
						</div>
					</Card>
					<!--Talent Priority Card-->
				</div>
				<div class="basis-1/4 flex flex-col gap-4">
					<Card class="flex flex-col w-full gap-2">
						<Text type="h3">Artifacts</Text>
						<ArtifactItem
							signature={true}
							rarity={5}
							quantity={build.artifacts.signatureSet.quantity}
							key={getKey(build.artifacts.signatureSet.key)}
						/>
						{#each build.artifacts.altSets as alt}
							<ArtifactItem signature={false} rarity={5} key={getKey(alt.key)} />
						{/each}
					</Card>
				</div>
			</div>
		</Tabs.Content>
	{/each}
</Tabs.Root>
