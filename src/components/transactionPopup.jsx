import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Transaction from '../models/transaction';
import Chip from '@material-ui/core/Chip';
import * as utils from '../utils';

export default props => {
	const [flags, setFlags] = useState(utils.intersection(props.data.map(x => x.flags)));

	const handleSelectFlag = flag => {
		if (flags.includes(flag)) setFlags(flags.filter(x => x !== flag));
		else setFlags([...flags, flag]);
	};

	return (
		<Dialog open={true} onClose={props.onClose} aria-labelledby="form-dialog-title">
			<DialogTitle>Flag Selected Transactions</DialogTitle>
			<DialogContent>
				{Transaction.flagOptions().map(flag => (
					<Chip
						key={flag}
						label={flag}
						color="secondary"
						variant={flags.includes(flag) ? 'default' : 'outlined'}
						onClick={() => handleSelectFlag(flag)}
					/>
				))}
			</DialogContent>
			<DialogActions>
				<Button onClick={props.onClose} color="primary">
					Cancel
				</Button>
				<Button onClick={() => props.onSave(flags)} color="primary">
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
};
