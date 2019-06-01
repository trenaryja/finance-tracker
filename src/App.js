import React, { useState } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { grey, blue } from '@material-ui/core/colors';
import TransactionGrid from './components/transactionGrid';
import MenuPanel from './components/menuPanel';
import Transaction from './models/transaction';
import TransactionPopup from './components/transactionPopup';

const theme = {
	palette: { type: 'dark', primary: grey, secondary: blue },
	typography: { useNextVariants: true }
};

const defaultSorting = [{ columnName: 'transactionDate', direction: 'desc' }, { columnName: 'amount', direction: 'desc' }];

export default () => {
	const [data, setData] = useState(Transaction.generateDummyData(50));
	const [selection, setSelection] = useState([]);
	const [filters, setFilters] = useState([]);
	const [sorting, setSorting] = useState(defaultSorting);
	const [transactionPopupVisible, setTransactionPopupVisible] = useState(false);

	const handleSelectionChange = selection => setSelection(selection);

	const handleSortingChange = sorting => setSorting(sorting);

	const handleFiltersChange = filters => {
		setFilters(filters);
		setSelection([]);
	};

	const handleFilterReset = () => {
		setSelection([]);
		setFilters([]);
		setSorting(defaultSorting);
	};

	const handleShowPopup = () => setTransactionPopupVisible(true);

	const handleClosePopup = () => setTransactionPopupVisible(false);

	const handleSaveFlags = flags => {
		const updatedData = [...data];
		selection.map(i => updatedData[i]).forEach(x => (x.flags = flags));
		setData(updatedData);
		setTransactionPopupVisible(false);
	};

	const handleDownload = () => {}; //TODO: Export displayData to csv/excel using filefy

	const handleUpload = () => {}; //TODO: Parse csv and create transactions from each row. Diff with current transactions and new values

	return (
		<MuiThemeProvider theme={createMuiTheme(theme)}>
			<MenuPanel
				data={data}
				selection={selection}
				filters={filters}
				onFilterReset={handleFilterReset}
				onFlagSelected={handleShowPopup}
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
			{transactionPopupVisible ? (
				<TransactionPopup onClose={handleClosePopup} data={selection.map(i => data[i])} onSave={handleSaveFlags} />
			) : null}
		</MuiThemeProvider>
	);
};

//TODO: Increase Font Size of Column Headers
//TODO: Add Filter options to Flags Column
//TODO: Highlight potential duplicate Rows
//TODO: Add Tooltip to Description column for full Description
