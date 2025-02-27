<script lang="ts">
	import Text from '$lib/components/typography/Text.svelte';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
	import CharCard from '$lib/components/ui/card/WeapCard.svelte';
	import S3Service from '$lib/services/s3.js';
	import type { Elements } from '$lib/types/elements';
	import type { WeaponTypes } from '$lib/types/weapon';
	import i18n from '$lib/services/i18n';

	type character = {
		element: Elements;
		img: string;
		link: string;
		name: string;
		obtained: boolean;
		rarity: number;
		weapon: WeaponTypes;
	};

	const transformIntoElements = (element: string): Elements => {
		switch (element) {
			case 'Pyro':
				return 'pyro';
			case 'Hydro':
				return 'hydro';
			case 'Anemo':
				return 'anemo';
			case 'Electro':
				return 'electro';
			case 'Dendro':
				return 'dendro';
			case 'Cryo':
				return 'cryo';
			case 'Geo':
				return 'geo';
			default:
				return 'anemo';
		}
	};

	const transformIntoWeapons = (weapon: string): WeaponTypes => {
		switch (weapon) {
			case 'Sword':
				return 'sword';
			case 'Claymore':
				return 'claymore';
			case 'Polearm':
				return 'polearm';
			case 'Catalyst':
				return 'catalyst';
			case 'Bow':
				return 'bow';
			default:
				return 'sword';
		}
	};

	const displayed_character: character = {
		obtained: true,
		link: `/characters/${'Amber'}`,
		name: 'David',
		element: transformIntoElements('Anemo'),
		weapon: transformIntoWeapons('Catalyst'),
		img: S3Service.getCharacter('Amber').icon,
		rarity: 5
	};
</script>

<Card class=" flex flex-col">
	<CardHeader>
		<CardTitle>
			<Text type="h4">{$i18n.t('dashboard.widget.display.title')}</Text>
		</CardTitle>
	</CardHeader>
	<CardContent>
		<div class="mt-2 flex flex-row justify-around">
			<CharCard
				link={displayed_character.link}
				name={displayed_character.name}
				img={displayed_character.img}
				level={0}
				constellation={0}
				element={displayed_character.element}
				weapon={displayed_character.weapon}
				rarity={displayed_character.rarity}
				obtained={displayed_character.obtained}
			/>
			<CharCard
				link={displayed_character.link}
				name={displayed_character.name}
				img={displayed_character.img}
				level={0}
				constellation={0}
				element={displayed_character.element}
				weapon={displayed_character.weapon}
				rarity={displayed_character.rarity}
				obtained={displayed_character.obtained}
			/>
		</div>
		<!-- Display setup will be in character/weapon tabs -->
	</CardContent>
</Card>
