import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import UploadButton from './uploadButton';
import { CloudUpload, CloudDownload, Flag } from '@material-ui/icons';
import * as utils from '../utils';

const calculateOwed = (data) => {
	const onlyRachelSum = data
		.filter((x) => x.flags.length === 1 && x.flags[0] === 'Rachel')
		.map((x) => x.amount)
		.reduce((a, b) => a + b, 0);
	const sharedSum =
		data
			.filter((x) => !x.flags.length)
			.map((x) => x.amount)
			.reduce((a, b) => a + b, 0) / 2;
	return onlyRachelSum + sharedSum;
};

const calculateOnHold = (data) => {
	return data
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
				<div>Owed: {utils.formatAsCurrency(calculateOwed(state.data))}</div>
				<div>On Hold: {utils.formatAsCurrency(calculateOnHold(state.data))}</div>
				<Button variant="contained" onClick={props.onFilterResetClick}>
					Reset
				</Button>
				<Button variant="contained" onClick={props.onFlagSelectedClick}>
					<Flag />
					Flag Selected
				</Button>
				<Button variant="contained" onClick={props.onDownloadClick}>
					<CloudDownload />
					Download
				</Button>
				<UploadButton variant="contained" accept=".xlsx, .csv" id="excel-upload">
					<CloudUpload />
					Upload
				</UploadButton>
			</Paper>
		);
	}
}
