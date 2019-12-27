import React, { useState } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { grey, blue } from "@material-ui/core/colors";
import TransactionGrid from "./components/transactionGrid";
import Paper from "@material-ui/core/Paper";
import MenuPanel from "./components/menuPanel";
import Transaction from "./models/transaction";
import TransactionPopup from "./components/transactionPopup";
import * as utils from "./utilities/utils";

const theme = {
	palette: { type: "dark", primary: grey, secondary: blue },
	typography: { useNextVariants: true },
};

const defaultSorting = [
	{ columnName: "transactionDate", direction: "desc" },
	{ columnName: "amount", direction: "desc" },
];

export default () => {
	const [data, setData] = useState(Transaction.generateDummyData(50));
	const [exportData, setExportData] = useState(data);
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

	const handleUpdate = rows => setExportData(rows);

	const handleShowPopup = () => setTransactionPopupVisible(true);

	const handleClosePopup = () => setTransactionPopupVisible(false);

	const handleSaveFlags = flags => {
		const updatedData = [...data];
		selection.map(i => updatedData[i]).forEach(x => (x.flags = flags));
		setData(updatedData);
		setTransactionPopupVisible(false);
	};

	const handleDownload = () => utils.convertToCsv(exportData); //TODO: Fix export

	const handleUpload = () => {}; //TODO: Parse csv and create transactions from each row. Diff with current transactions and new values

	return (
		<MuiThemeProvider theme={createMuiTheme(theme)}>
			<Paper>
				<MenuPanel data={data} selection={selection} filters={filters} onFilterReset={handleFilterReset} onFlagSelected={handleShowPopup} onDownload={handleDownload} onUpload={handleUpload} />
			</Paper>
			<Paper>
				<TransactionGrid
					data={data}
					selection={selection}
					filters={filters}
					sorting={sorting}
					onSelectionChange={handleSelectionChange}
					onSortingChange={handleSortingChange}
					onFiltersChange={handleFiltersChange}
					onUpdate={handleUpdate}
				/>
			</Paper>
			{transactionPopupVisible ? <TransactionPopup onClose={handleClosePopup} data={selection.map(i => data[i])} onSave={handleSaveFlags} /> : null}
		</MuiThemeProvider>
	);
};

//TODO: Add Filter options to Flags Column
//TODO: Highlight potential duplicate Rows
//TODO: Click Hold to filter to those transactions
//TODO: Add badge to Hold
//TODO: Click Owed to filter to those transactions
//TODO: Add badge to Owed
