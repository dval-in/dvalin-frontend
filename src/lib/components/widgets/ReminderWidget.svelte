<script lang="ts">
	import Text from '$lib/components/typography/Text.svelte';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import i18n from '$lib/services/i18n';
</script>

<Card class=" flex flex-col">
	<CardHeader>
		<CardTitle>
			<Text type="h4">{$i18n.t('dashboard.widget.reminder.title')}</Text>
		</CardTitle>
	</CardHeader>
	<CardContent>
		<!-- The checks will uncheck themselves after N server resets -->

		<!-- Daily -->
		<Text type="large">{$i18n.t('dashboard.widget.reminder.daily')}</Text>
		<div class="flex flex-row items-center">
			<Checkbox id="reminder_teapot" class="mr-3" />
			<Label for="reminder_teapot" class="text-base font-normal">
				<Text type="p">
					{$i18n.t('dashboard.widget.reminder.daily.teapot_currency')}
				</Text>
			</Label>
		</div>
		<div class="flex flex-row items-center">
			<Checkbox id="reminder_commissions" class="mr-3" />
			<Label for="reminder_commissions" class="text-base font-normal">
				<Text type="p">
					{$i18n.t('dashboard.widget.reminder.daily.commissions')}
				</Text>
			</Label>
		</div>
		<div class="flex flex-row items-center">
			<Checkbox id="reminder_resin" class="mr-3" />
			<Label for="reminder_resin" class="text-base font-normal">
				<Text type="p">
					{$i18n.t('dashboard.widget.reminder.daily.resin')}
				</Text>
			</Label>
		</div>
		<div class="flex flex-row items-center">
			<Checkbox id="reminder_welkin" class="mr-3" />
			<Label for="reminder_welkin" class="text-base font-normal">
				<Text type="p">
					{$i18n.t('dashboard.widget.reminder.daily.welkin')}
				</Text>
			</Label>
		</div>

		<!-- Every 2 days -->
		<Text type="large">
			{$i18n.t('dashboard.widget.reminder.two_day.title')}
		</Text>
		<div class="flex flex-row items-center">
			<Checkbox id="reminder_local" class="mr-3" />
			<Label for="reminder_local" class="text-base font-normal">
				<Text type="p">
					{$i18n.t('dashboard.widget.reminder.two_day.local_specialties')}
				</Text>
			</Label>
		</div>
		<div class="flex flex-row items-center">
			<Checkbox id="reminder_ore" class="mr-3" />
			<Label for="reminder_ore" class="text-base font-normal">
				<Text type="p">
					{$i18n.t('dashboard.widget.reminder.two_day.ores')}
				</Text>
			</Label>
		</div>

		<!-- Every 3 days -->
		<Text type="large">
			{$i18n.t('dashboard.widget.reminder.three_day.title')}
		</Text>
		<div class="flex flex-row items-center">
			<Checkbox id="reminder_chunks" class="mr-3" />
			<Label for="reminder_chunks" class="text-base font-normal">
				<Text type="p">
					{$i18n.t('dashboard.widget.reminder.three_day.crystals')}
				</Text>
			</Label>
		</div>
		<div class="flex flex-row items-center">
			<Checkbox id="reminder_teapotFarm" class="mr-3" />
			<Label for="reminder_teapotFarm" class="text-base font-normal">
				<Text type="p">
					{$i18n.t('dashboard.widget.reminder.three_day.teapot_farm')}
				</Text>
			</Label>
		</div>
		<div class="flex flex-row items-center">
			<Checkbox id="reminder_fish" class="mr-3" />
			<Label for="reminder_fish" class="text-base font-normal">
				<Text type="p">
					{$i18n.t('dashboard.widget.reminder.three_day.fishing')}
				</Text>
			</Label>
		</div>

		<!-- Weekly -->
		<Text type="large">
			{$i18n.t('dashboard.widget.reminder.weekly.title')}
		</Text>
		<div class="flex flex-row items-center">
			<Checkbox id="reminder_parametric" class="mr-3" />
			<Label for="reminder_parametric" class="text-base font-normal">
				<Text type="p">
					{$i18n.t('dashboard.widget.reminder.weekly.parametric_transformer')}
				</Text>
			</Label>
		</div>
		<div class="flex flex-row items-center">
			<Checkbox id="reminder_trap" class="mr-3" />
			<Label for="reminder_trap" class="text-base font-normal">
				<Text type="p">
					{$i18n.t('dashboard.widget.reminder.weekly.crystalfly_trap')}
				</Text>
			</Label>
		</div>
		<div class="flex flex-row items-center">
			<Checkbox id="reminder_boss" class="mr-3" />
			<Label for="reminder_boss" class="text-base font-normal">
				<Text type="p">
					{$i18n.t('dashboard.widget.reminder.weekly.bosses')}
				</Text>
			</Label>
		</div>
		<div class="flex flex-row items-center">
			<Checkbox id="reminder_reputation" class="mr-3" />
			<Label for="reminder_reputation" class="text-base font-normal">
				<Text type="p">
					{$i18n.t('dashboard.widget.reminder.weekly.reputation')}
				</Text>
			</Label>
		</div>
	</CardContent>
</Card>
