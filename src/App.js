import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';
import './App.css';
import TransactionGrid from './components/transactionGrid';
import MenuPanel from './components/menuPanel';
import Transaction from './models/transaction';

const theme = {
	palette: { type: 'dark', primary: colors.grey, secondary: colors.blue },
	typography: { useNextVariants: true }
};

const data = Transaction.generateDummyData(50);

export default class App extends Component {
	state = {
		data: data,
		selection: [],
		filters: [],
		sorting: [{ columnName: 'transactionDate', direction: 'desc' }, { columnName: 'amount', direction: 'desc' }],
		editingRowIds: [],
		addedRows: [],
		rowChanges: {}
	};

	handleSelectionChange = (selection) => {
		this.setState({ selection });
	};

	handleSortingChange = (sorting) => {
		this.setState({ sorting });
	};

	handleFiltersChange = (filters) => {
		this.setState({ filters });
	};

	handleAccountFilterClick = (account) => {
		this.setState({ filters: [{ columnName: 'account', value: account, operation: 'equals' }] });
	};

	handleFilterResetClick = () => {
		this.setState({
			data: data,
			filters: [],
			selection: [],
			sorting: []
		});
	};

	handleDownloadCLick = () => {
		//TODO: Export displayData to csv/excel using filefy
	};

	handleFlagSelected = () => {
		//TODO: Display Modal for applying flags to all selected transactions
	};

	handleUpload = () => {
		//TODO: Parse csv and create transactions from each row. Diff with current transactions and new values
	};

	handleEditingRowIdsChange = (editingRowIds) => {
		this.setState({ editingRowIds });
	};

	handleRowChangesChange = (rowChanges) => {
		this.setState({ rowChanges });
	};

	handleAddedRowsChange = (addedRows) => {
		this.setState({ addedRows });
	};

	handleCommitChanges = ({ added, changed, deleted }) => {
		let { data } = this.state;
		if (added) {
			data = [...data, ...added.map((row) => ({ ...Transaction.generateRandomTransaction(), ...row }))];
		}
		if (changed) {
			data = data.map((row, index) => (changed[index] ? { ...row, ...changed[index] } : row));
		}
		if (deleted) {
			const deletedSet = new Set(deleted);
			data = data.filter((row, index) => !deletedSet.has(index));
		}
		this.setState({ data });
	};

	render() {
		const { state } = this;

		return (
			<MuiThemeProvider theme={createMuiTheme(theme)}>
				<MenuPanel
					state={state}
					onAccountFilterClick={this.handleAccountFilterClick}
					onFilterResetClick={this.handleFilterResetClick}
					onFlagSelectedClick={this.handleFlagSelected}
				/>
				<br />
				<TransactionGrid
					state={state}
					onSelectionChange={this.handleSelectionChange}
					onSortingChange={this.handleSortingChange}
					onFiltersChange={this.handleFiltersChange}
					onDisplayDataChange={this.handleDisplayDataChange}
					onEditingRowIdsChange={this.handleEditingRowIdsChange}
					onRowChangesChange={this.handleRowChangesChange}
					onAddedRowsChange={this.handleAddedRowsChange}
					onCommitChanges={this.handleCommitChanges}
				/>
			</MuiThemeProvider>
		);
	}
}

//TODO: Add Scrolling/Virtualization
//TODO: Format Edit forms for every column
//TODO: Move filter icon to right side for Account and Description columns
//TODO: Add Reporting Modal Popup for selected Transactions
//TODO: Increase Font Size of Column Headers
//TODO: Add Filter options to Flags Column
//TODO: Highlight potential duplicate Rows
//TODO: Add Tooltip to Description column for full Description
//TODO: Convert buttons to icons
//TODO: Select All only applies to visible
