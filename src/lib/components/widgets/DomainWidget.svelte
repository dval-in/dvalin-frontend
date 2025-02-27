<script>
	import Text from '$lib/components/typography/Text.svelte';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import i18n from '$lib/services/i18n';
</script>

<Card class="flex flex-col">
	<CardHeader>
		<CardTitle>
			<Text type="h4">{$i18n.t('dashboard.widget.domain.title')}</Text>
		</CardTitle>
	</CardHeader>
	<CardContent>
		<Text type="p">talent materials, weapon materials + corresponding chars/weaps</Text>
	</CardContent>
</Card>
