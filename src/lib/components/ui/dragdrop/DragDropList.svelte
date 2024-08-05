<script lang="ts">
	import { flip } from 'svelte/animate';
	import { Label } from '$lib/components/ui/label';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import Text from '$lib/components/typography/Text.svelte';

	class DatumType {
		id!: number;
		check?: string;
		checked?: boolean;
		html?: string;
		text?: string;
	}

	export let data: DatumType[] = [];
	export let removesItems = false;

	let ghost: HTMLElement;
	let grabbed: HTMLElement | null;

	let lastTarget: Element;

	let mouseY = 0; // pointer y coordinate within client
	let offsetY = 0; // y distance from top of grabbed element to pointer
	let layerY = 0; // distance from top of list to top of client

	function grab(clientY: number, element: HTMLElement) {
		// modify grabbed element
		grabbed = element;
		grabbed.dataset.grabY = String(clientY);

		// modify ghost element (which is actually dragged)
		ghost.innerHTML = grabbed.innerHTML;

		// record offset from cursor to top of element
		// (used for positioning ghost)
		offsetY = grabbed.getBoundingClientRect().y - clientY;
		drag(clientY);
	}

	// drag handler updates cursor position
	function drag(clientY: number) {
		if (grabbed) {
			mouseY = clientY;
			layerY = ghost.parentElement!.getBoundingClientRect().y;
		}
	}

	// touchEnter handler emulates the mouseenter event for touch input
	// (more or less)
	function touchEnter(ev: Touch) {
		drag(ev.clientY);
		// trigger dragEnter the first time the cursor moves over a list item
		let target = document
			.elementFromPoint(ev.clientX, ev.clientY)!
			.closest('.item') as HTMLElement;
		if (target && target != lastTarget) {
			lastTarget = target;
			dragEnter(target);
		}
	}

	function dragEnter(target: EventTarget) {
		if (!(target instanceof HTMLElement)) return;
		// swap items in data
		if (grabbed && target != grabbed && target.classList.contains('item')) {
			moveDatum(parseInt(grabbed.dataset.index!), parseInt(target.dataset.index!));
		}
	}

	// does the actual moving of items in data
	function moveDatum(from: number, to: number) {
		let temp = data[from];
		data = [...data.slice(0, from), ...data.slice(from + 1)];
		data = [...data.slice(0, to), temp, ...data.slice(to)];
	}

	function release() {
		grabbed = null;
	}

	function removeDatum(index: number) {
		data = [...data.slice(0, index), ...data.slice(index + 1)];
	}

	function check(index: number) {
		data[index].checked = !data[index].checked;
	}
</script>

<!-- All the documentation has to go up here, sorry.
     (otherwise it conflicts with the HTML or svelte/animate) 
     The .list has handlers for pointer movement and pointer up/release/end.
     Each .item has a handler for pointer down/click/start, which assigns that
     element as the item currently being "grabbed".  They also have a handler
     for pointer enter (the touchmove handler has extra logic to behave like the
     no longer extant 'touchenter'), which swaps the entered element with the
     grabbed element when triggered.
     You'll also find reactive styling below, which keeps it from being directly
     part of the imperative javascript handlers. -->
<main class="basis-[100%]">
	<div
		bind:this={ghost}
		id="ghost"
		class={grabbed ? 'item haunting' : 'item'}
		style={'top: ' + (mouseY + offsetY - layerY) + 'px'}
	>
		<p></p>
	</div>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="list"
		on:mousemove={function (ev) {
			ev.stopPropagation();
			drag(ev.clientY);
		}}
		on:touchmove={function (ev) {
			ev.stopPropagation();
			drag(ev.touches[0].clientY);
		}}
		on:mouseup={function (ev) {
			ev.stopPropagation();
			release();
		}}
		on:touchend={function (ev) {
			ev.stopPropagation();
			release();
		}}
	>
		{#each data as datum, i (datum.id ? datum.id : JSON.stringify(datum))}
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				id={grabbed && (datum.id ? datum.id : JSON.stringify(datum)) == grabbed.dataset.id
					? 'grabbed'
					: ''}
				class="item"
				data-index={i}
				data-id={datum.id}
				data-grabY="0"
				on:mousedown={function (ev) {
					grab(ev.clientY, ev.currentTarget);
				}}
				on:touchstart={function (ev) {
					grab(ev.touches[0].clientY, ev.currentTarget);
				}}
				on:mouseenter={function (ev) {
					ev.stopPropagation();
					dragEnter(ev.currentTarget);
				}}
				on:touchmove={function (ev) {
					ev.stopPropagation();
					ev.preventDefault();
					touchEnter(ev.touches[0]);
				}}
				animate:flip={{ duration: 200 }}
			>
				<div class="buttons">
					<button
						class="up"
						style={'visibility: ' + (i > 0 ? '' : 'hidden') + ';'}
						on:click={function (ev) {
							moveDatum(i, i - 1);
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="16px"
							height="16px"
						>
							<path d="M0 0h24v24H0V0z" fill="none" />
							<path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z" />
						</svg>
					</button>
					<button
						class="down"
						style={'visibility: ' + (i < data.length - 1 ? '' : 'hidden') + ';'}
						on:click={function (ev) {
							moveDatum(i, i + 1);
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="16px"
							height="16px"
						>
							<path d="M0 0h24v24H0V0z" fill="none" />
							<path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
						</svg>
					</button>
				</div>

				<div class="content m-0 w-full">
					{#if datum.html}
						{@html datum.html}
					{:else if datum.text}
						<p>{datum.text}</p>
					{:else if datum.check}
						<div class="w-full h-full flex flex-row items-center justify-between px-16">
							<Label
								for={datum.check
									.replace(/[^a-zA-Z]/g, '')
									.replace(/(?:^\w|[A-Z]|\b\w)/g, (match, index) =>
										index === 0 ? match.toLowerCase() : match.toUpperCase()
									)
									.concat('Check')}
							>
								<Text type="h4">
									{datum.check}
								</Text>
							</Label>
							<Checkbox
								on:click={(e) => check(i)}
								class=""
								id={datum.check
									.replace(/[^a-zA-Z]/g, '')
									.replace(/(?:^\w|[A-Z]|\b\w)/g, (match, index) =>
										index === 0 ? match.toLowerCase() : match.toUpperCase()
									)
									.concat('Check')}
								checked={data[i].checked}
							/>
						</div>
					{:else}
						<p>{datum}</p>
					{/if}
				</div>

				<div class="buttons delete">
					{#if removesItems}
						<button
							on:click={function (ev) {
								removeDatum(i);
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="16"
								viewBox="0 0 24 24"
								width="16"
							>
								<path d="M0 0h24v24H0z" fill="none" />
								<path
									d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
								/>
							</svg>
						</button>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</main>

<style>
	main {
		position: relative;
	}

	.list {
		@apply cursor-grab z-[5] flex flex-col shrink;
	}
	.item {
		@apply bg-foreground box-border inline-flex w-full min-h-[3em] border select-none mb-[0.5em] rounded-sm border-solid border-black;
	}
	.item:last-child {
		@apply mb-0;
	}
	.item:not(#grabbed):not(#ghost) {
		@apply z-10;
	}
	.buttons {
		@apply w-8 min-w-[32px] flex flex-col mx-0 my-auto;
	}
	.buttons button {
		@apply cursor-pointer w-[18px] h-[18px] border bg-inherit mx-auto my-0 p-0 border-solid border-[rgba(0,0,0,0)] focus:border focus:border-solid focus:border-[black];
		@apply invert;
	}
	.delete {
		@apply w-8;
	}
	#grabbed {
		@apply opacity-[0.0];
	}
	#ghost {
		@apply pointer-events-none z-[-5] absolute opacity-[0.0] left-0 top-0;
	}
	#ghost * {
		@apply pointer-events-none;
	}
	#ghost.haunting {
		@apply z-20 opacity-[1.0];
	}
</style>
