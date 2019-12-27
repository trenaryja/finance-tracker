import React, { Fragment } from "react";
import { DataTypeProvider } from "@devexpress/dx-react-grid";
import { formatAsCurrency } from "./utils";
import moment from "moment";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";
import Transaction from "../models/transaction";

export const CurrencyTypeProvider = props => <DataTypeProvider formatterComponent={({ value }) => formatAsCurrency(value)} {...props} />;

export const DateTypeProvider = props => <DataTypeProvider formatterComponent={({ value }) => moment(value).format("YYYY.MM.DD")} {...props} />;

export const FlagTypeProvider = props => (
	<DataTypeProvider
		formatterComponent={({ value: flags }) => {
			return (
				<Fragment>
					{Transaction.flagOptions().map(flag => (
						<Chip key={flag} label={flag.charAt(0)} color="secondary" variant={flags.includes(flag) ? "default" : "outlined"} />
					))}
				</Fragment>
			);
		}}
		{...props}
	/>
);

export const TooltipTypeProvider = props => (
	<DataTypeProvider
		formatterComponent={({ value }) => {
			return (
				<Tooltip title={value} interactive enterDelay={500} leaveDelay={200}>
					<span>{value}</span>
				</Tooltip>
			);
		}}
		{...props}
	/>
);
