import {
	DataTypeProvider,
	FilteringState,
	IntegratedFiltering,
	IntegratedSelection,
	IntegratedSorting,
	SelectionState,
	SortingState,
	EditingState
} from '@devexpress/dx-react-grid';
import {
	Grid,
	Table,
	TableFilterRow,
	TableHeaderRow,
	TableSelection,
	TableEditRow,
	TableEditColumn,
	VirtualTable
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import React, { Component } from 'react';
import { formatAsCurrency } from '../utils';
import CompareArrows from '@material-ui/icons/CompareArrows';
import Transaction from '../models/transaction';

const styles = () => ({ tableStriped: { '& tbody tr:nth-of-type(odd)': { backgroundColor: 'rgba(255,255,255,0.08)' } } });
const TableComponent = withStyles(styles, { name: 'TableComponent' })(({ classes, ...restProps }) => (
	<Table.Table {...restProps} className={classes.tableStriped} />
));

const CurrencyTypeProvider = (props) => <DataTypeProvider formatterComponent={({ value }) => formatAsCurrency(value)} {...props} />;
const DateTypeProvider = (props) => <DataTypeProvider formatterComponent={({ value }) => moment(value).format('YYYY.MM.DD')} {...props} />;
const FlagTypeProvider = (props) => (
	<DataTypeProvider
		formatterComponent={({ value: flags }) => {
			return (
				<div>
					{Transaction.flagOptions().map((flag) => (
						<Chip
							// style={{ color: 'white' }}
							key={flag}
							label={flag}
							color="secondary"
							variant={flags.includes(flag) ? 'default' : 'outlined'}
						/>
					))}
				</div>
			);
		}}
		{...props}
	/>
);

const FilterIcon = ({ type, ...restProps }) => {
	if (type === 'between') return <CompareArrows {...restProps} />;
	return <TableFilterRow.Icon type={type} {...restProps} />;
};

const amountFilter = (value, filter, row) => {
	if (!filter.value.length) return true;
	if (filter && filter.operation === 'between') {
		if (!filter.value.includes('-')) return false;
		const parts = filter.value.split('-').map((x) => +x.trim());
		return (parts[0] || -Number.MAX_VALUE) <= value && value <= (parts[1] || Number.MAX_VALUE);
	}
	return IntegratedFiltering.defaultPredicate(value, filter, row);
};

const dateFilter = (value, filter, row) => {
	if (!filter.value.length) return true;
	if (filter && filter.operation === 'between') {
		if (!filter.value.includes('-')) return false;
		const parts = filter.value.split('-').map((x) => new Date(x).getTime());
		return (parts[0] || -Number.MAX_VALUE) <= value && value <= (parts[1] || Number.MAX_VALUE);
	}
	const dateFilter = { ...filter };
	dateFilter.value = new Date(filter.value).getTime();
	return IntegratedFiltering.defaultPredicate(value, dateFilter, row);
};

const columns = [
	{ title: 'Account', name: 'account' },
	{ title: 'Description', name: 'description' },
	{ title: 'Transaction Date', name: 'transactionDate' },
	{ title: 'Amount', name: 'amount' },
	{ title: 'Flags', name: 'flags' }
];
const tableColumnExtensions = [
	{ columnName: 'amount', align: 'right' },
	{ columnName: 'flags', align: 'right' },
	{ columnName: 'transactionDate', align: 'right' }
];
const filterOperations = ['between', 'equal', 'notEqual', 'greaterThan', 'greaterThanOrEqual', 'lessThan', 'lessThanOrEqual'];
const filteringColumnExtensions = [{ columnName: 'amount', predicate: amountFilter }, { columnName: 'transactionDate', predicate: dateFilter }];

export default class TransactionGrid extends Component {
	render() {
		const { props } = this;
		const { state } = props;
		return (
			<Paper>
				<Grid rows={state.data} columns={columns}>
					<SelectionState selection={state.selection} onSelectionChange={props.onSelectionChange} />
					<IntegratedSelection />
					<SortingState sorting={state.sorting} onSortingChange={props.onSortingChange} />
					<IntegratedSorting />
					<FilteringState filters={state.filters} onFiltersChange={props.onFiltersChange} />
					<IntegratedFiltering columnExtensions={filteringColumnExtensions} />
					<EditingState
						editingRowIds={state.editingRowIds}
						onEditingRowIdsChange={props.onEditingRowIdsChange}
						rowChanges={state.rowChanges}
						onRowChangesChange={props.onRowChangesChange}
						addedRows={state.addedRows}
						onAddedRowsChange={props.onAddedRowsChange}
						onCommitChanges={props.onCommitChanges}
					/>
					<CurrencyTypeProvider for={['amount']} availableFilterOperations={filterOperations} />
					<DateTypeProvider for={['transactionDate']} availableFilterOperations={filterOperations} />
					<FlagTypeProvider for={['flags']} />
					<VirtualTable height="auto" tableComponent={TableComponent} columnExtensions={tableColumnExtensions} />
					<TableHeaderRow showSortingControls />
					<TableFilterRow showFilterSelector iconComponent={FilterIcon} messages={{ between: 'Between' }} />
					<TableEditRow />
					<TableEditColumn showAddCommand showEditCommand showDeleteCommand />
					<TableSelection showSelectAll />
				</Grid>
			</Paper>
		);
	}
}
