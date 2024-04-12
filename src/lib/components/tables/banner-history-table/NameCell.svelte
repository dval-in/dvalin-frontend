<script lang="ts">
	import S3Service from '$lib/services/s3';
	import { type CharacterKey, isCharacterKey } from '$lib/types/keys/CharacterKey';
	import type { WeaponKey } from '$lib/types/keys/WeaponKey';

	export let name: CharacterKey | WeaponKey;

	const imgUrl = isCharacterKey(name)
		? S3Service.getCharacter(name).icon
		: S3Service.getWeapon(name).icon;
</script>

<div class="flex flex-1 items-center gap-2">
	<img alt={'Image of ' + name} class="w-6 h-6 rounded-full" src={imgUrl} />
	{name}
</div>
