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
	class={`flex items-center gap-2 bg-neutral p-1 rounded-md ${wonFiftyFifty ? 'outline' : ''} outline-1 outline-primary`}
>
	<img alt={'Image of ' + name} class="w-8 h-8 rounded-full" src={imgUrl} />
	<Text type="p">{name}</Text>
	<Text type="p">{counter}</Text>
</div>
