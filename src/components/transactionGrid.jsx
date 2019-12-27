import { FilteringState, IntegratedFiltering, IntegratedSelection, IntegratedSorting, SelectionState, SortingState } from "@devexpress/dx-react-grid";
import { Template, TemplatePlaceholder, TemplateConnector } from "@devexpress/dx-react-core";
import { Grid, Table, TableFilterRow, TableHeaderRow, TableSelection } from "@devexpress/dx-react-grid-material-ui";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
import CompareArrows from "@material-ui/icons/CompareArrows";
import { TooltipTypeProvider, DateTypeProvider, FlagTypeProvider, CurrencyTypeProvider } from "../utilities/dataTypeProviders";

const styles = () => ({
	tableStriped: {
		"& tbody tr:nth-of-type(odd)": {
			backgroundColor: "rgba(255,255,255,0.08)",
		},
	},
});

const tableComponent = withStyles(styles, {
	name: "TableComponent",
})(({ classes, ...restProps }) => <Table.Table {...restProps} className={classes.tableStriped} />);

const rootComponent = props => <Grid.Root {...props} style={{ height: "100%" }} />;

const FilterIcon = ({ type, ...restProps }) => {
	if (type === "between") return <CompareArrows {...restProps} />;
	return <TableFilterRow.Icon type={type} {...restProps} />;
};

const amountFilter = (value, filter, row) => {
	if (!filter.value.length) return true;
	if (filter && filter.operation === "between") {
		if (!filter.value.includes("-")) return false;
		const parts = filter.value.split("-").map(x => +x.trim());
		return (parts[0] || -Number.MAX_VALUE) <= value && value <= (parts[1] || Number.MAX_VALUE);
	}
	return IntegratedFiltering.defaultPredicate(value, filter, row);
};

const dateFilter = (value, filter, row) => {
	if (!filter.value.length) return true;
	if (filter && filter.operation === "between") {
		if (!filter.value.includes("-")) return false;
		const parts = filter.value.split("-").map(x => Date.parse(x));
		return (parts[0] || -Number.MAX_VALUE) <= +value && +value <= (parts[1] || Number.MAX_VALUE);
	}
	const dateFilter = { ...filter };
	dateFilter.value = new Date(filter.value);
	return IntegratedFiltering.defaultPredicate(value, dateFilter, row);
};

const columns = [
	{ title: "Account", name: "account" },
	{ title: "Description", name: "description" },
	{ title: "Transaction Date", name: "transactionDate" },
	{ title: "Amount", name: "amount" },
	{ title: "Flags", name: "flags" },
];

const tableColumnExtensions = [
	{ columnName: "amount", align: "right" },
	{ columnName: "flags", align: "right" },
	{ columnName: "transactionDate", align: "right" },
];

const filterOperations = ["between", "equal", "notEqual", "greaterThan", "greaterThanOrEqual", "lessThan", "lessThanOrEqual"];

const filteringColumnExtensions = [
	{
		columnName: "amount",
		predicate: amountFilter,
	},
	{
		columnName: "transactionDate",
		predicate: dateFilter,
	},
];

export default props => {
	return (
		<Grid rows={props.data} columns={columns} rootComponent={rootComponent}>
			<CurrencyTypeProvider for={["amount"]} availableFilterOperations={filterOperations} />
			<DateTypeProvider for={["transactionDate"]} availableFilterOperations={filterOperations} />
			<FlagTypeProvider for={["flags"]} availableFilterOperations={["contains", "notContains"]} />
			<TooltipTypeProvider for={["description"]} />

			<SelectionState selection={props.selection} onSelectionChange={props.onSelectionChange} />
			<IntegratedSelection />

			<SortingState sorting={props.sorting} onSortingChange={props.onSortingChange} />
			<IntegratedSorting />

			<FilteringState filters={props.filters} onFiltersChange={props.onFiltersChange} />
			<IntegratedFiltering columnExtensions={filteringColumnExtensions} />

			<Table tableComponent={tableComponent} columnExtensions={tableColumnExtensions} />
			<TableHeaderRow showSortingControls />
			<TableFilterRow showFilterSelector iconComponent={FilterIcon} messages={{ between: "Between" }} />
			<TableSelection showSelectAll />
			<Template name="root">
				<TemplateConnector>
					{({ rows: filteredRows }) => {
						props.onUpdate(filteredRows);
						return <TemplatePlaceholder />;
					}}
				</TemplateConnector>
			</Template>
		</Grid>
	);
};
