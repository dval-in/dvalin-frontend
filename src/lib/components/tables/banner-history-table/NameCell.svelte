<script lang="ts">
	import S3Service from '$lib/services/s3';
	import { type CharacterKey, isCharacterKey } from '$lib/types/keys/CharacterKey';
	import type { WeaponKey } from '$lib/types/keys/WeaponKey';
	import { dataIndexStore } from '$lib/store/index_store';

	export let key: CharacterKey | WeaponKey;

	const isCharacter = isCharacterKey(key);

	const imgUrl = (isCharacter ? S3Service.getCharacter(key) : S3Service.getWeapon(key)).icon;

	const name = (isCharacter ? $dataIndexStore.character : $dataIndexStore.weapon)[key].name;
</script>

<div class="flex flex-1 items-center gap-2">
	<img alt={'Image of ' + name} class="w-6 h-6 rounded-full" src={imgUrl} />
	{name}
</div>
