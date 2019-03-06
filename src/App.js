import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';
import './App.css';
import TransactionGrid from './components/transactionGrid';
import MenuPanel from './components/menuPanel';
import Transaction from './models/transaction';

const theme = {
	palette: { type: 'dark', primary: colors.grey, secondary: colors.deepPurple },
	typography: { useNextVariants: true }
};

const data = Transaction.generateDummyData(10);

export default class App extends Component {
	state = {
		data: data,
		displayData: data,
		selection: [],
		filters: [],
		sorting: [{ columnName: 'transactionDate', direction: 'desc' }, { columnName: 'amount', direction: 'desc' }]
	};

	handleSelectionChange = (selection) => {
		console.log(selection);
		this.setState({ selection });
	};

	handleSortingChange = (sorting) => {
		this.setState({ sorting });
	};

	handleFiltersChange = (filters) => {
		this.setState({ filters });
	};

	handleDisplayDataChange = (displayData) => {
		this.setState(displayData);
	};

	handleAccountFilterClick = (account) => {
		const displayData = this.state.data.filter((x) => x.account === account);
		this.setState({ displayData });
	};

	handleFilterResetClick = () => {
		this.setState({
			displayData: this.state.data,
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
				/>
			</MuiThemeProvider>
		);
	}
}

//TODO: Update state Display Data when filtering
//TODO: Update state Display Data when sorting
//TODO: Add Scrolling/Virtualization
//TODO: Format Flags column as buttons with actions
