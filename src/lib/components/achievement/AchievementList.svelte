<script lang="ts">
	import type { achievementData } from '$lib/types/achievement';
	import Text from '$lib/components/typography/Text.svelte';

	export let achievements: achievementData[];
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
	{#each achievements as achievement}
		<div class="bg-white p-4 rounded-md shadow">
			<Text type="h4">{achievement.name}</Text>
			<Text type="p">{achievement.desc}</Text>
			<!-- Add more details about the achievement as needed -->
		</div>
	{/each}
</div>
