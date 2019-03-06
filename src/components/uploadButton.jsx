import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';

export default class UploadButton extends Button {
	render() {
		return (
			<Fragment>
				<input disabled={this.props.disabled} style={{ display: 'none' }} accept={this.props.accept} id={this.props.id} type="file" />
				<label htmlFor={this.props.id}>
					<Button {...this.props} component="span">
						{this.props.children}
					</Button>
				</label>
			</Fragment>
		);
	}
}
