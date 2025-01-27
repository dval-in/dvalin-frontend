<script lang="ts">
	import S3Service from '$lib/services/s3';
	import { type CharacterKey } from '$lib/types/keys/CharacterKey';
	import type { WeaponKey } from '$lib/types/keys/WeaponKey';
	import { dataIndex } from '$lib/store/index_store';

	export let key: CharacterKey | WeaponKey;

	const isCharacter = $dataIndex.character[key];

	const imgUrl = (isCharacter ? S3Service.getCharacter(key) : S3Service.getWeapon(key)).icon;

	const name = (isCharacter ? $dataIndex.character : $dataIndex.weapon)[key].name;
</script>

<div class="flex flex-1 items-center gap-2">
	<img alt={'Image of ' + name} class="h-6 w-6 rounded-full" src={imgUrl} />
	{name}
</div>
