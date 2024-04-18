<script lang="ts">
	import Text from '$lib/components/typography/Text.svelte';
	import S3Service from '$lib/services/s3';
	import { type CharacterKey, isCharacterKey } from '$lib/types/keys/CharacterKey';
	import type { WeaponKey } from '$lib/types/keys/WeaponKey';

	export let name: string;
	export let key: CharacterKey | WeaponKey;
	export let counter: number;

	const imgUrl = isCharacterKey(key)
		? S3Service.getCharacter(key).icon
		: S3Service.getWeapon(key).icon;
</script>

<div class="flex items-center gap-2 bg-neutral p-1 rounded-md">
	<img alt={'Image of ' + name} class="w-8 h-8 rounded-full" src={imgUrl} />
	<Text type="p">{name}</Text>
	<Text type="p">{counter}</Text>
</div>
