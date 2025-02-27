<script lang="ts">
	import Text from '$lib/components/typography/Text.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import i18n from '$lib/services/i18n';
	import { onMount } from 'svelte';

	let currentResin: number = 12;
	let maxResin: number = 200;

	let resinRegenTime = 8;

	let currentDate = new Date();

	onMount(() => {
		const interval = setInterval(() => {
			currentDate = new Date();
		}, 5000);

		return () => {
			clearInterval(interval);
		};
	});

	$: ResinCounter = {
		HandleInput(): void {
			let temp = currentResin.toString();
			temp = temp.replace(/[.e]/g, '');
			currentResin = parseInt(temp);
			if (currentResin > 2000) currentResin = maxResin;
			else if (currentResin < 1 || !currentResin) currentResin = 0;
		},

		increaseResin(n: number): void {
			currentResin += n;
			if (currentResin > 2000) currentResin = maxResin;
		},

		decreaseResin(n: number): void {
			currentResin -= n;
			if (currentResin < 0) currentResin = 0;
		},

		countTimeLeft(goal: number): string {
			let output: string;

			let minutesTillRegen = (goal - currentResin) * resinRegenTime;
			let hoursTillRegen = Math.floor(minutesTillRegen / 60);
			minutesTillRegen -= hoursTillRegen * 60;

			if (hoursTillRegen == 0)
				output = `${minutesTillRegen}${$i18n.t('dashboard.widget.resin.hour')}`;
			else if (minutesTillRegen > 0)
				output = `${hoursTillRegen}${$i18n.t('dashboard.widget.resin.hour')} ${minutesTillRegen}${$i18n.t('dashboard.widget.resin.minute')}`;
			else output = `${hoursTillRegen}${$i18n.t('dashboard.widget.resin.hour')}`;

			return output;
		},

		countEndTime(goal: number): string {
			let output: string;

			let currentMins = currentDate.getMinutes();
			let currentHours = currentDate.getHours();

			let minutesTillRegen = currentMins + (goal - currentResin) * resinRegenTime;
			let hoursTillRegen = Math.floor(minutesTillRegen / 60);
			minutesTillRegen -= hoursTillRegen * 60;

			let endHours = ((currentHours + hoursTillRegen) % 24).toString().padStart(2, '0');
			let endMins = minutesTillRegen.toString().padStart(2, '0');

			output = `${endHours}:${endMins}`;

			return output;
		}
	};
</script>

<Card class=" flex flex-col gap-5">
	<CardHeader>
		<CardTitle class="flex items-center justify-between">
			<Text type="h4">{$i18n.t('dashboard.widget.resin.title')}</Text>
		</CardTitle>
	</CardHeader>
	<CardContent class="flex flex-col gap-3">
		<div class="flex flex-row items-center justify-center gap-4">
			<img class="h-8 w-8" src="" alt="Resin Icon" />
			<Text type="large">
				<Input
					type="number"
					class="hover:border-text/30 focus-visible:border-text/30 inline
										h-5 w-12 rounded-none border-none p-0 pb-1 pl-1 text-right text-lg font-semibold [appearance:textfield]
										hover:border-0 hover:border-b-2 hover:border-solid focus-visible:border-0
										focus-visible:border-b-2 focus-visible:border-solid focus-visible:ring-0 focus-visible:ring-offset-0
										[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
					bind:value={currentResin}
					on:input={() => ResinCounter.HandleInput()}
				/>/{maxResin}
			</Text>
		</div>
		<div class="flex flex-row justify-center">
			<Button
				on:click={() => ResinCounter.decreaseResin(20)}
				class="rounded-l-md rounded-r-none"
			>
				-20
			</Button>
			<Button on:click={() => ResinCounter.decreaseResin(30)} class="rounded-none">
				-30
			</Button>
			<Button on:click={() => ResinCounter.decreaseResin(40)} class="rounded-none">
				-40
			</Button>
			<Button on:click={() => ResinCounter.decreaseResin(60)} class="rounded-none">
				-60
			</Button>
			<Button
				on:click={() => ResinCounter.increaseResin(60)}
				class="rounded-l-none rounded-r-md"
			>
				+60
			</Button>
		</div>

		{#if currentResin < maxResin}
			<div class="flex flex-col items-center">
				{#if currentResin < 20}
					<Text type="p">
						20 in {ResinCounter.countTimeLeft(20)}
						({ResinCounter.countEndTime(20)})
					</Text>
				{/if}
				{#if currentResin < 30}
					<Text type="p">
						30 in {ResinCounter.countTimeLeft(30)}
						({ResinCounter.countEndTime(30)})
					</Text>
				{/if}
				{#if currentResin < 40}
					<Text type="p">
						40 in {ResinCounter.countTimeLeft(40)}
						({ResinCounter.countEndTime(40)})
					</Text>
				{/if}
				{#if currentResin < 60}
					<Text type="p">
						60 in {ResinCounter.countTimeLeft(60)}
						({ResinCounter.countEndTime(60)})
					</Text>
				{/if}
				<Text type="p">
					{maxResin} in {ResinCounter.countTimeLeft(maxResin)}
					({ResinCounter.countEndTime(maxResin)})
				</Text>
			</div>
		{/if}
	</CardContent>
	<!-- <Card.Footer class="flex justify-end">
    <Button class="w-full">View more</Button>
  </Card.Footer> -->
</Card>
