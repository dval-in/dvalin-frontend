<script lang="ts">
	import { applicationState } from '$lib/store/application_state';
	import { get } from 'svelte/store';
	import { userProfile } from '$lib/store/user_profile';
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import i18n from '$lib/services/i18n';
	import AchievementCategoryDisplay from '$lib/components/navigator/AchievementCategoryDisplay.svelte';

	console.log(get(applicationState));
	console.log(get(userProfile));
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
<!-- svelte-ignore a11y-label-has-associated-control -->
<DefaultLayout title={$i18n.t('achievements.categories.title')}>
	<svelte:fragment slot="titlebarActions"></svelte:fragment>
	<AchievementCategoryDisplay></AchievementCategoryDisplay>
</DefaultLayout>
