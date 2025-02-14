<script lang="ts">
	import Text from '$lib/components/typography/Text.svelte';
	import S3Service from '$lib/services/s3';
	import { dataIndex } from '$lib/store/index_store';
	import { type CharacterKey } from '$lib/types/keys/CharacterKey';
	import type { WeaponKey } from '$lib/types/keys/WeaponKey';

	export let name: string;
	export let key: CharacterKey | WeaponKey;
	export let counter: number;
	export let wonFiftyFifty: boolean;

	const imgUrl = $dataIndex.character[key]
		? S3Service.getCharacter(key).icon
		: S3Service.getWeapon(key).icon;
</script>

<div
	class={`bg-neutral flex items-center gap-2 rounded-md p-1 ${wonFiftyFifty ? 'outline' : ''} outline-primary outline-1`}
>
	<img alt={'Image of ' + name} class="h-8 w-8 rounded-full" src={imgUrl} />
	<Text type="p">{name}</Text>
	<Text type="p">{counter}</Text>
</div>
