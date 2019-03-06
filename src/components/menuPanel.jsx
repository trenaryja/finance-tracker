import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import UploadButton from './uploadButton';
import * as Icons from '@material-ui/icons';
import * as utils from '../utils';

const calculateOwed = (displayData) => {
	const onlyRachelSum = displayData
		.filter((x) => x.flags.length === 1 && x.flags[0] === 'Rachel')
		.map((x) => x.amount)
		.reduce((a, b) => a + b, 0);
	const sharedSum =
		displayData
			.filter((x) => !x.flags.length)
			.map((x) => x.amount)
			.reduce((a, b) => a + b, 0) / 2;
	return onlyRachelSum + sharedSum;
};

const calculateOnHold = (displayData) => {
	return displayData
		.filter((x) => x.flags.includes('Hold'))
		.map((x) => x.amount)
		.reduce((a, b) => a + b, 0);
};

export default class MenuPanel extends Component {
	render() {
		const { props } = this;
		const { state } = props;
		return (
			<Paper>
				<div>Owed: {utils.formatAsCurrency(calculateOwed(state.displayData))}</div>
				<div>On Hold: {utils.formatAsCurrency(calculateOnHold(state.displayData))}</div>

				<Button
					variant="contained"
					style={{ background: utils.colors.discoverOrange }}
					onClick={() => props.onAccountFilterClick('Discover')}>
					Discover
				</Button>
				<Button variant="contained" style={{ background: utils.colors.chaseBlue }} onClick={() => props.onAccountFilterClick('Chase')}>
					Chase
				</Button>
				<Button variant="contained" style={{ background: utils.colors.bbtRed }} onClick={() => props.onAccountFilterClick('BBT')}>
					BB&T
				</Button>
				<Button variant="contained" onClick={props.onFilterResetClick}>
					Reset
				</Button>
				<Button variant="contained" onClick={props.onFlagSelectedClick}>
					<Icons.Flag />
					Flag Selected
				</Button>
				<Button variant="contained" onClick={props.onDownloadClick}>
					<Icons.CloudDownload />
					Download
				</Button>
				<UploadButton variant="contained" accept=".xlsx, .csv" id="excel-upload">
					<Icons.CloudUpload />
					Upload
				</UploadButton>
			</Paper>
		);
	}
}
