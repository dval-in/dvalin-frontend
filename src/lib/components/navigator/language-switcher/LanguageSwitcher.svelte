<script lang="ts">
	import i18n from '$lib/services/i18n/index.js';
	import langFlagDE from '$lib/assets/languages/DE.svg';
	import langFlagEN from '$lib/assets/languages/EN.svg';
	import langFlagFR from '$lib/assets/languages/FR.svg';
	import langFlagIT from '$lib/assets/languages/IT.svg';
	import langFlagPT from '$lib/assets/languages/PT.svg';
	import langFlagPL from '$lib/assets/languages/PL.svg';
	import langFlagRU from '$lib/assets/languages/RU.svg';
	import langFlagTH from '$lib/assets/languages/TH.svg';
	import langFlagZHS from '$lib/assets/languages/ZHS.svg';
	import langFlagZHT from '$lib/assets/languages/ZHT.svg';
	import {
		Dialog,
		DialogContent,
		DialogFooter,
		DialogHeader,
		DialogTitle
	} from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { get } from 'svelte/store';
	import Text from '$lib/components/typography/Text.svelte';

	let selectedLanguage = get(i18n).language;

	let isDialogOpen = false;

	const languages = Object.keys(get(i18n).options.resources ?? {});

	const matchLocaleToFlag = (locale: string) => {
		switch (locale) {
			case 'DE':
				return langFlagDE;
			case 'EN':
				return langFlagEN;
			case 'FR':
				return langFlagFR;
			case 'IT':
				return langFlagIT;
			case 'PL':
				return langFlagPL;
			case 'PT':
				return langFlagPT;
			case 'RU':
				return langFlagRU;
			case 'TH':
				return langFlagTH;
			case 'ZHS':
				return langFlagZHS;
			case 'ZHT':
				return langFlagZHT;
			default:
				return langFlagEN;
		}
	};

	const setSelectedLanguage = (locale: string) => {
		selectedLanguage = locale;
	};

	const saveLanguage = () => {
		$i18n.changeLanguage(selectedLanguage);
		isDialogOpen = false;
	};

	const openDialog = () => {
		isDialogOpen = true;
	};
</script>

<img
	src={matchLocaleToFlag($i18n.language)}
	alt="language switcher"
	class={`flex rounded-full size-10 object-cover`}
	role="button"
	on:click={openDialog}
/>

<Dialog bind:open={isDialogOpen}>
	<DialogContent class="sm:max-w-[425px]">
		<DialogHeader>
			<DialogTitle>{$i18n.t('navigation.languageswitcher.title')}</DialogTitle>
		</DialogHeader>
		{#each languages as language}
			<Button
				variant="ghost"
				on:click={() => setSelectedLanguage(language)}
				class="flex gap-2"
			>
				<img
					src={matchLocaleToFlag(language)}
					alt="language switcher"
					class={`flex rounded-full w-10 h-10 object-cover ${selectedLanguage === language ? 'border-primary border-4' : 'border-0'} transition-all`}
				/>
				<Text type="p">{$i18n.t('language.' + language)}</Text>
			</Button>
		{/each}

		<DialogFooter>
			<Button on:click={saveLanguage}>Save changes</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>
