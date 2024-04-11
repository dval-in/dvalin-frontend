<script lang="ts">
	import i18n from '$lib/services/i18n/index.js';
	import langFlagDE from '$lib/assets/languages/DE.svg';
	import langFlagEN from '$lib/assets/languages/EN.svg';
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
			case 'EN':
				return langFlagEN;
			case 'DE':
				return langFlagDE;
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
				<Text type="p">{language}</Text>
			</Button>
		{/each}

		<DialogFooter>
			<Button on:click={saveLanguage}>Save changes</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>
