<script lang="ts">
	import S3Service from '$lib/services/s3';
	import { type CharacterKey } from '$lib/types/keys/CharacterKey';
	import Text from '$lib/components/typography/Text.svelte';
	import * as Card from '$lib/components/ui/card';
	import type { Character } from '$lib/types/data/Character';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import * as Tabs from '$lib/components/ui/character-tabs';
	import * as Table from '$lib/components/ui/table';
	import { Star } from 'lucide-svelte';
	import { buttonVariants } from '$lib/components/ui/button';
	import type { WeaponIndex } from '$lib/types/index/weapon';

	/** @type {import('../../../../.svelte-kit/types/src/routes').PageData} */
	export let data: {
		character: CharacterKey;
		characterData: Character;
		weaponIndex: WeaponIndex;
	};

	const splash = S3Service.getCharacterLink(data.character) + '/gacha_splash.webp';
</script>

<main class="flex-col w-full h-full">
	<section class="flex w-full gap-4 p-6 box-border h-[75vh]">
		<Card.Root class="aspect-[1/2] box-border relative">
			<img
				class="h-0 min-h-full rounded-md object-cover object-center"
				src={splash}
				alt="{data.character} Gacha Splash"
			/>
			<div class="flex w-full justify-center absolute bottom-3 left-0">
				{#each { length: data.characterData.rarity } as _}
					<Star strokeWidth={0} fill={data.characterData.rarity == 5 ? '#FFB13F' : '#7B5C90'} />
				{/each}
			</div>
		</Card.Root>
		<!--a href={splash}>{splash}</a-->

		<div class="flex-grow h-full flex gap-2 flex-col box-border">
			<Text textColor="primary" type="h1">{data.character}</Text>
			<span class="font-bold">{data.characterData.element} • {data.characterData.weaponType}</span>
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

			<Text type="p">{data.characterData.description}</Text>

			<Tabs.Root value="stats" class="w-full flex-grow-0 min-h-0">
				<Tabs.List class="grid w-full grid-cols-3">
					<Tabs.Trigger value="stats">Stats</Tabs.Trigger>
					<Tabs.Trigger value="talents">Talents</Tabs.Trigger>
					<Tabs.Trigger value="constellations">Constellations</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="stats" class="min-h-0 overflow-scroll border border-secondary/50">
					<Table.Root>
						<Table.Header>
							<Table.Row class="p-2 border-b border-secondary/50">
								{#each data.characterData.ascension[0].stats as stat, i}
									<Table.Head class="p-2 px-4 font-bold">
										{stat.label === 'Ascend' ? 'ASC' : stat.label}
									</Table.Head>
									{#if i == 0}
										<Table.Head class="p-2 px-4 font-bold">Level</Table.Head>
									{/if}
								{/each}
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#each data.characterData.ascension.slice(0,7) as ascension, j}
								<Table.Row class="p-2 border-y border-secondary/50">
									{#each ascension.stats as stat, i}
										<Table.Cell class="p-2 px-4">
											<div class="flex flex-col">
												{#if stat.label != 'Ascend' && stat.values?.at(0) != '-'}
													<!--p>
														{stat.values?.at(0)}
													</p-->
												{/if}
												<p>
													{stat.values?.at(0) != '-' && stat.label != 'Ascend' && i < 5
														? data.characterData.ascension.slice(0,7)?.at(j+1)?.stats[i].values?.at(0)
														: stat.values?.at(1)}
												</p>
											</div>
										</Table.Cell>
										{#if i == 0}
											<Table.Cell class="p-2 px-4">
												<div class="flex flex-col">
													<!--p>
														{data.characterData.ascension[j - 1]
															? data.characterData.ascension[j - 1].level[0]
															: ''}
													</p-->
													<p>{data.characterData.ascension.at(j+1)?.level?.at(0)}</p>
												</div>
											</Table.Cell>
										{/if}
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
		<span class="flex justify-between"
			><Text type="h2">Builds</Text>
			<a
				href="https://keqingmains.com+{data.character}"
				class={buttonVariants({ variant: 'default' })}>View on KQM</a
			></span
		>
		<Tabs.Root value="Sub-DPS" class="w-full">
			<Tabs.List class="grid grid-cols-1">
				<Tabs.Trigger value="Sub-DPS">Sub-DPS</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="Sub-DPS" class="flex flex-row gap-4">
				<div class="basis-1/2 flex flex-col gap-2">
					<Text type="p">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet urna in nunc
						ultrices tempus. Nullam bibendum nunc et sapien aliquet, at bibendum nulla sollicitudin.
						Duis laoreet at leo vitae ultrices. Nullam finibus sodales libero et laoreet. Sed ac
						consequat lorem. Quisque sodales quam ligula, sed eleifend odio fringilla vel. Integer
						auctor, quam sit amet ornare porta, mauris augue vulputate neque, ac dapibus dui augue
						sed neque. Curabitur vel fringilla lacus, in interdum felis. Donec ornare nulla ac risus
						porttitor tempor.
					</Text>
					<Text type="p">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet urna in nunc
						ultrices tempus. Nullam bibendum nunc et sapien aliquet, at bibendum nulla sollicitudin.
						Duis laoreet at leo vitae ultrices. Nullam finibus sodales libero et laoreet. Sed ac
						consequat lorem. Quisque sodales quam ligula, sed eleifend odio fringilla vel. Integer
						auctor, quam sit amet ornare porta, mauris augue vulputate neque, ac dapibus dui augue
						sed neque. Curabitur vel fringilla lacus, in interdum felis. Donec ornare nulla ac risus
						porttitor tempor.
					</Text>
					<Text type="p">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet urna in nunc
						ultrices tempus. Nullam bibendum nunc et sapien aliquet, at bibendum nulla sollicitudin.
						Duis laoreet at leo vitae ultrices. Nullam finibus sodales libero et laoreet. Sed ac
						consequat lorem. Quisque sodales quam ligula, sed eleifend odio fringilla vel. Integer
						auctor, quam sit amet ornare porta, mauris augue vulputate neque, ac dapibus dui augue
						sed neque. Curabitur vel fringilla lacus, in interdum felis. Donec ornare nulla ac risus
						porttitor tempor.
					</Text>
				</div>
				<div class="basis-1/4 flex flex-col gap-4">
					<Card.Root class="flex flex-col w-full gap-2">
						<Text type="h3">Weapons</Text>
						<div class="flex gap-2 w-full">
							<img
								class="flex-grow aspect-square object-cover h-0 min-h-full"
								src={S3Service.getWeaponLink(data.characterData.signatureWeapon) + '/icon.png'}
								alt={data.characterData.signatureWeapon}
							/>
							<div class="flex-grow flex flex-col gap-1 text-md min-h-0">
								<div class="flex w-full justify-start">
									{#each { length: data.characterData.rarity } as _}
										<Star
											class="lg:size-4"
											strokeWidth={0}
											fill={data.weaponIndex[data.characterData.signatureWeapon].rarity == 5
												? '#FFB13F'
												: '#7B5C90'}
										/>
									{/each}
								</div>
								<Text type="h4">{data.weaponIndex[data.characterData.signatureWeapon].name}</Text>
								<Badge type="default" class="w-fit rounded bg-neutral">R1</Badge>
							</div>
						</div>
						<!--BIS Weapon Rec-->
						{#each { length: 4 } as _}
							<div class="flex w-full flex-row gap-2 items-center">
								<img
									class="aspect-square object-cover h-0 min-h-full"
									src={S3Service.getWeaponLink(data.characterData.signatureWeapon) + '/icon.png'}
									alt={data.characterData.signatureWeapon}
								/>
								<Star
									class="lg:size-4"
									strokeWidth={0}
									fill={data.weaponIndex[data.characterData.signatureWeapon].rarity == 5
										? '#FFB13F'
										: '#7B5C90'}
								/>
								<Text type="p">{data.weaponIndex[data.characterData.signatureWeapon].name}</Text>
							</div>
						{/each}
					</Card.Root>
					<!--Weapon Recomendation Card-->
					<Card.Root class="flex flex-col w-full gap-4">
						<Text type="h3">Talents</Text>
						<div class="flex flex-row w-full gap-2 h-16 justify-center items-center">
							<img
								class="aspect-square object-cover h-0 min-h-full"
								src={S3Service.getWeaponLink(data.characterData.signatureWeapon) + '/icon.png'}
								alt={data.characterData.signatureWeapon}
							/>
							<p>></p>
							<img
								class="aspect-square object-cover h-0 min-h-full"
								src={S3Service.getWeaponLink(data.characterData.signatureWeapon) + '/icon.png'}
								alt={data.characterData.signatureWeapon}
							/>
							<p>></p>
							<img
								class="aspect-square object-cover h-0 min-h-full"
								src={S3Service.getWeaponLink(data.characterData.signatureWeapon) + '/icon.png'}
								alt={data.characterData.signatureWeapon}
							/>
						</div>
					</Card.Root>
				</div>
				<div class="basis-1/4 flex flex-col gap-4">
					<Card.Root class="flex flex-col w-full gap-2">
						<Text type="h3">Artifacts</Text>
						<div class="flex gap-2 w-full">
							<img
								class="aspect-square object-cover h-0 min-h-full"
								src={S3Service.getArtifactLink('HuskOfOpulentDreams') + '/flower.png'}
								alt="HuskOfOpulentDreams"
							/>
							<div class="flex-grow flex flex-col gap-1 text-md h-full">
								<div class="flex w-full justify-start">
									{#each { length: data.characterData.rarity } as _}
										<Star
											class="lg:size-4"
											strokeWidth={0}
											fill={data.weaponIndex[data.characterData.signatureWeapon].rarity == 5
												? '#FFB13F'
												: '#7B5C90'}
										/>
									{/each}
								</div>
								<Text type="h4">Husk Of Opulent Dreams</Text>
								<Badge type="default" class="w-fit rounded bg-neutral">x4</Badge>
							</div>
						</div>

						{#each { length: 4 } as _}
							<div class="flex w-full flex-row gap-2 items-center">
								<img
									class="aspect-square object-cover h-0 min-h-full"
									src={S3Service.getArtifactLink('HuskOfOpulentDreams') + '/flower.png'}
									alt="HuskOfOpulentDreams"
								/>
								<Star
									class="lg:size-4"
									strokeWidth={0}
									fill={data.weaponIndex[data.characterData.signatureWeapon].rarity == 5
										? '#FFB13F'
										: '#7B5C90'}
								/>
								<Text type="p">Husk of Opulent Dreams</Text>
							</div>
						{/each}
					</Card.Root>
				</div>
			</Tabs.Content>
		</Tabs.Root>
	</section>
</main>
