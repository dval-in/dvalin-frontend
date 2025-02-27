<script lang="ts">
	import Text from '$lib/components/typography/Text.svelte';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
	import i18n from '$lib/services/i18n';
</script>

<Card class=" flex flex-col">
	<CardHeader>
		<CardTitle>
			<Text type="h4">{$i18n.t('dashboard.widget.todo.title')}</Text>
		</CardTitle>
	</CardHeader>
	<CardContent>
		<Text type="p">
			Farmable today: thing thing thing thing summary: some more even more thing
		</Text>
	</CardContent>
</Card>
