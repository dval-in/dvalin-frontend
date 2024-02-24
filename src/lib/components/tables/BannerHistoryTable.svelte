<script lang="ts">
	import Text from '$lib/components/typography/Text.svelte';
	import {
		Body as TableBody,
		Cell as TableCell,
		Head as TableHead,
		Header as TableHeader,
		Root as TableRoot,
		Row as TableRow
	} from '$lib/components/ui/table';
	import {
		Root as PaginationRoot,
		Content as PaginationContent,
		Item as PaginationItem,
		NextButton as PaginationNextButton,
		PrevButton as PaginationPrevButton,
		Link as PaginationLink,
		Ellipsis as PaginationEllipsis
	} from '$lib/components/ui/pagination';
	import { readable } from 'svelte/store';
	import { createTable, Subscribe, Render, createRender } from 'svelte-headless-table';
	import {
		mdiAccount,
		mdiChevronDown,
		mdiChevronLeft,
		mdiChevronRight,
		mdiChevronUp,
		mdiStar,
		mdiSwordCross
	} from '@mdi/js';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import {
		addColumnFilters,
		addPagination,
		addSortBy,
		matchFilter
	} from 'svelte-headless-table/plugins';
	import { Button } from '$lib/components/ui/button';
	import type { Wish } from '$lib/structs/wish';
	import SelectFilter from './SelectFilter.svelte';

	const PAGE_SIZE = 50;

	export let data: Wish[];

	const table = createTable(readable(data), {
		page: addPagination({ initialPageSize: PAGE_SIZE }),
		filter: addColumnFilters(),
		sort: addSortBy({
			initialSortKeys: [{ id: 'date', order: 'desc' }],
			toggleOrder: ['asc', 'desc']
		})
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'date',
			header: 'Date',
			cell: ({ value }) => {
				return new Date(value).toDateString();
			}
		}),
		table.column({
			accessor: 'type',
			header: 'Type',
			cell: ({ value }) => {
				return createRender(Icon, { path: value === 'character' ? mdiAccount : mdiSwordCross });
			},
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					fn: matchFilter,
					render: ({ filterValue, preFilteredValues }) =>
						createRender(SelectFilter, { filterValue, title: 'Type', preFilteredValues })
				}
			}
		}),
		table.column({
			accessor: 'name',
			header: 'Name'
		}),
		table.column({
			accessor: 'rarity',
			header: createRender(Icon, { path: mdiStar }),
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					fn: matchFilter,
					render: ({ filterValue, preFilteredValues }) =>
						createRender(SelectFilter, {
							filterValue,
							title: 'Rarity',
							preFilteredValues
						})
				}
			}
		}),
		table.column({
			accessor: 'pity',
			header: 'Pity'
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);

	const { pageIndex } = pluginStates.page;
	const { sortKeys } = pluginStates.sort;
	$: $sortKeys;
</script>

<TableRoot {...$tableAttrs}>
	<TableHeader>
		{#each $headerRows as headerRow (headerRow.id)}
			<Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
				<TableRow {...rowAttrs}>
					{#each headerRow.cells as cell (cell.id)}
						<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
							<TableHead {...attrs}>
								{#if !props.sort.disabled}
									<Button variant="ghost" on:click={props.sort.toggle}>
										<Render of={cell.render()} />
										{#if props.sort.order === 'asc'}
											<Icon path={mdiChevronDown} />
										{:else if props.sort.order === 'desc'}
											<Icon path={mdiChevronUp} />
										{/if}
									</Button>
								{:else if props.filter?.render}
									<div>
										<Render of={props.filter.render} />
									</div>
								{:else}
									<Render of={cell.render()} />
								{/if}
							</TableHead>
						</Subscribe>
					{/each}
				</TableRow>
			</Subscribe>
		{/each}
	</TableHeader>
	<TableBody {...$tableBodyAttrs}>
		{#each $pageRows as row (row.id)}
			<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
				<TableRow {...rowAttrs}>
					{#each row.cells as cell (cell.id)}
						<Subscribe attrs={cell.attrs()} let:attrs>
							<TableCell {...attrs}>
								<Render of={cell.render()} />
							</TableCell>
						</Subscribe>
					{/each}
				</TableRow>
			</Subscribe>
		{/each}
	</TableBody>
</TableRoot>
<PaginationRoot count={data.length} let:currentPage let:pages perPage={PAGE_SIZE}>
	<PaginationContent>
		<PaginationItem>
			<PaginationPrevButton on:click={() => ($pageIndex = $pageIndex - 1)}>
				<Icon path={mdiChevronLeft} />
				<Text type="p">Previous</Text>
			</PaginationPrevButton>
		</PaginationItem>
		{#each pages as page (page.key)}
			{#if page.type === 'ellipsis'}
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
			{:else}
				<PaginationItem>
					<PaginationLink
						{page}
						isActive={currentPage === page.value}
						on:click={() => ($pageIndex = page.value - 1)}
					>
						<Text type="p">{page.value}</Text>
					</PaginationLink>
				</PaginationItem>
			{/if}
		{/each}
		<PaginationItem>
			<PaginationNextButton on:click={() => ($pageIndex = $pageIndex + 1)}>
				<Text type="p">Next</Text>
				<Icon path={mdiChevronRight} />
			</PaginationNextButton>
		</PaginationItem>
	</PaginationContent>
</PaginationRoot>
