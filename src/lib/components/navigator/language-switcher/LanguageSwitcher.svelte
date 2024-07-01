<script lang="ts">
	import i18n from '$lib/services/i18n/index.js';
	import langFlagDE from '$lib/assets/languages/DE.svg';
	import langFlagEN from '$lib/assets/languages/EN.svg';
	import langFlagES from '$lib/assets/languages/ES.svg';
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
	import { Alert } from '$lib/components/ui/alert';
	import { AlertDescription, AlertTitle } from '$lib/components/ui/alert/index.js';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import { mdiTranslate } from '@mdi/js';
	import BackendService from '$lib/services/backend';

	let selectedLanguage = get(i18n).language;
	const backend = BackendService.getInstance();
	$: createConfigMutation = backend.user.updateConfig();
	let isDialogOpen = false;

	const languages = Object.keys(get(i18n).options.resources ?? {});

	const matchLocaleToFlag = (locale: string) => {
		switch (locale) {
			case 'DE':
				return langFlagDE;
			case 'EN':
				return langFlagEN;
			case 'ES':
				return langFlagES;
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
		$createConfigMutation.mutate({
			config: { preferedLanguage: selectedLanguage.toLowerCase() }
		});
	};

	const openDialog = () => {
		isDialogOpen = true;
	};
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
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

		<a
			href="https://crowdin.com/project/dvalin/invite?h=6095df94b0e8f4b9171e4457b4d168002094188"
		>
			<Alert>
				<Icon path={mdiTranslate} />
				<AlertTitle>Want to help with translation?</AlertTitle>
				<AlertDescription>Join our Crowdin Project</AlertDescription>
			</Alert>
		</a>

		<div class="grid-cols-2 grid gap-4">
			{#each languages as language}
				<Button
					variant="ghost"
					on:click={() => setSelectedLanguage(language)}
					class="flex justify-start gap-2"
				>
					<img
						src={matchLocaleToFlag(language)}
						alt="language switcher"
						class={`flex rounded-full w-10 h-10 object-cover ${selectedLanguage === language ? 'border-primary border-4' : 'border-0'} transition-all`}
					/>
					<Text type="p">{$i18n.t('language.' + language)}</Text>
				</Button>
			{/each}
		</div>

		<DialogFooter>
			<Button on:click={saveLanguage}>Save changes</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>
