import {
	DataTypeProvider,
	FilteringState,
	IntegratedFiltering,
	IntegratedSelection,
	IntegratedSorting,
	SelectionState,
	SortingState
} from '@devexpress/dx-react-grid';
import { Grid, Table, TableFilterRow, TableHeaderRow, TableSelection } from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import React, { Component } from 'react';
import { formatAsCurrency } from '../utils';
import CompareArrows from '@material-ui/icons/CompareArrows';

const styles = () => ({ tableStriped: { '& tbody tr:nth-of-type(odd)': { backgroundColor: 'rgba(255,255,255,0.08)' } } });
const TableComponent = withStyles(styles, { name: 'TableComponent' })(({ classes, ...restProps }) => (
	<Table.Table {...restProps} className={classes.tableStriped} />
));

const CurrencyTypeProvider = (props) => <DataTypeProvider formatterComponent={({ value }) => formatAsCurrency(value)} {...props} />;
const DateTypeProvider = (props) => <DataTypeProvider formatterComponent={({ value }) => moment(value).format('YYYY.MM.DD')} {...props} />;

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
	{ title: 'Transaction Date', name: 'transactionDate' },
	{ title: 'Post Date', name: 'postDate' },
	{ title: 'Description', name: 'description' },
	{ title: 'Amount', name: 'amount' },
	{ title: 'Flags', name: 'flags' }
];
const tableColumnExtensions = [{ columnName: 'amount', align: 'right' }, { columnName: 'flags', align: 'right' }];
const dateColumns = ['transactionDate', 'postDate'];
const currencyColumns = ['amount'];
const filterOperations = ['between', 'equal', 'notEqual', 'greaterThan', 'greaterThanOrEqual', 'lessThan', 'lessThanOrEqual'];
const filteringColumnExtensions = [
	{ columnName: 'amount', predicate: amountFilter },
	{ columnName: 'transactionDate', predicate: dateFilter },
	{ columnName: 'postDate', predicate: dateFilter }
];

// TODO: Add Column Resizing
// const defaultColumnWidths = [
// 	{ columnName: 'account', width: 100 },
// 	{ columnName: 'transactionDate', width: 100 },
// 	{ columnName: 'postDate', width: 100 },
// 	{ columnName: 'description', width: 700 },
// 	{ columnName: 'amount', width: 200 },
// 	{ columnName: 'flags', width: 300 }
// ];

export default class TransactionGrid extends Component {
	render() {
		const { props } = this;
		const { state } = props;
		return (
			<Paper>
				<Grid rows={state.displayData} columns={columns}>
					<SelectionState selection={state.selection} onSelectionChange={props.onSelectionChange} />
					<IntegratedSelection />
					<SortingState sorting={state.sorting} onSortingChange={props.onSortingChange} />
					<IntegratedSorting />
					<FilteringState filters={state.filters} onFiltersChange={props.onFiltersChange} />
					<IntegratedFiltering columnExtensions={filteringColumnExtensions} />
					<CurrencyTypeProvider for={currencyColumns} availableFilterOperations={filterOperations} />
					<DateTypeProvider for={dateColumns} availableFilterOperations={filterOperations} />
					<Table tableComponent={TableComponent} columnExtensions={tableColumnExtensions} />
					{/* <TableColumnResizing defaultColumnWidths={defaultColumnWidths} /> */}
					<TableHeaderRow showSortingControls />
					<TableFilterRow showFilterSelector iconComponent={FilterIcon} messages={{ between: 'Between' }} />
					<TableSelection showSelectAll />
				</Grid>
			</Paper>
		);
	}
}
