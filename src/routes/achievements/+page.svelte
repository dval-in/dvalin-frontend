<script lang="ts">
	import { applicationState } from '$lib/store/application_state';
	import { get, derived } from 'svelte/store';
	import { userProfile } from '$lib/store/user_profile';
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import { dataIndexStore } from '$lib/store/index_store';
	import i18n from '$lib/services/i18n';

	const transformedAchievements = derived([dataIndexStore], ([dataIndexStore]) => {
		const achievements = dataIndexStore.achievementCategory;
		console.log(achievements);
		return achievements;
	});

	console.log(transformedAchievements);
	console.log(get(applicationState));
	console.log(get(userProfile));
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
<!-- svelte-ignore a11y-label-has-associated-control -->
<DefaultLayout title={$i18n.t('characters.overview.title')}>
	<svelte:fragment slot="titlebarActions">
		<!--		<Searchbar searchGroup="Characters" searchableDataList={$transformedAchievements} />-->
	</svelte:fragment>
	<div class="flex flex-wrap gap-4 justify-center">
		<!--{#each $transformedAchievements as achievement}-->
		<!--	<CharCard-->
		<!--		link={character.link}-->
		<!--		name={character.name}-->
		<!--		img={character.img}-->
		<!--		level={0}-->
		<!--		constellation={0}-->
		<!--		element={character.element}-->
		<!--		weapon={character.weapon}-->
		<!--		rarity={character.rarity}-->
		<!--		obtained={character.obtained}-->
		<!--	/>-->
		<!--{/each}-->
	</div>
</DefaultLayout>
