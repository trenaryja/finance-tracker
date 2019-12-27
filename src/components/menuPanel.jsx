import React from "react";
import { IconButton, Button } from "@material-ui/core";
import UploadButton from "./uploadButton";
import { CloudUpload, CloudDownload, Flag, Clear } from "@material-ui/icons";
import * as utils from "../utilities/utils";

const calculateOwed = data => {
	const onlyRachelSum = data
		.filter(x => x.flags.length === 1 && x.flags[0] === "Rachel")
		.map(x => x.amount)
		.reduce((a, b) => a + b, 0);
	const sharedSum =
		data
			.filter(x => !x.flags.length)
			.map(x => x.amount)
			.reduce((a, b) => a + b, 0) / 2;
	return onlyRachelSum + sharedSum;
};

const calculateOnHold = data => {
	return data
		.filter(x => x.flags.includes("Hold"))
		.map(x => x.amount)
		.reduce((a, b) => a + b, 0);
};

export default props => {
	return (
		<div>
			<Button>Owed: {utils.formatAsCurrency(calculateOwed(props.data))}</Button>
			<Button>On Hold: {utils.formatAsCurrency(calculateOnHold(props.data))}</Button>

			<IconButton variant="contained" onClick={props.onDownload}>
				<CloudDownload />
			</IconButton>
			<UploadButton variant="contained" accept=".xlsx, .csv" id="excel-upload">
				<CloudUpload />
			</UploadButton>
			<IconButton
				onClick={props.onFlagSelected}
				style={{
					display: props.selection.length === 0 ? "none" : "inline",
				}}
			>
				<Flag />
			</IconButton>
			<IconButton
				variant="contained"
				onClick={props.onFilterReset}
				style={{
					display: props.filters.length === 0 ? "none" : "inline",
				}}
			>
				<Clear />
			</IconButton>
		</div>
	);
};
