import React, { useState } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';
import TransactionGrid from './components/transactionGrid';
import MenuPanel from './components/menuPanel';
import Transaction from './models/transaction';

const theme = {
	palette: { type: 'dark', primary: colors.grey, secondary: colors.blue },
	typography: { useNextVariants: true }
};

const defaultSorting = [{ columnName: 'transactionDate', direction: 'desc' }, { columnName: 'amount', direction: 'desc' }];

export default () => {
	const [data, setData] = useState(Transaction.generateDummyData(100));
	const [selection, setSelection] = useState([]);
	const [filters, setFilters] = useState([]);
	const [sorting, setSorting] = useState(defaultSorting);

	const handleSelectionChange = selection => setSelection(selection);

	const handleFiltersChange = filters => {
		setFilters(filters);
		setSelection([]);
	};
	const handleSortingChange = sorting => setSorting(sorting);

	const handleFilterReset = () => {
		setSelection([]);
		setFilters([]);
		setSorting(defaultSorting);
	};

	const handleDownload = () => {}; //TODO: Export displayData to csv/excel using filefy

	const handleFlagSelected = () => {}; //TODO: Display Modal for applying flags to all selected transactions

	const handleUpload = () => {}; //TODO: Parse csv and create transactions from each row. Diff with current transactions and new values

	return (
		<MuiThemeProvider theme={createMuiTheme(theme)}>
			<div
				style={{
					display: 'grid',
					gridTemplateRows: '1fr 10fr',
					gridGap: '10px',
					height: '98vh'
				}}
			>
				<MenuPanel
					data={data}
					onFilterReset={handleFilterReset}
					onFlagSelected={handleFlagSelected}
					onDownload={handleDownload}
					onUpload={handleUpload}
				/>
				<TransactionGrid
					data={data}
					selection={selection}
					filters={filters}
					sorting={sorting}
					onSelectionChange={handleSelectionChange}
					onSortingChange={handleSortingChange}
					onFiltersChange={handleFiltersChange}
				/>
			</div>
		</MuiThemeProvider>
	);
};

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
