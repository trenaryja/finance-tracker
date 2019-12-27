import React, { Fragment } from "react";
import IconButton from "@material-ui/core/IconButton";

export default props => {
	return (
		<Fragment>
			<input disabled={props.disabled} style={{ display: "none" }} accept={props.accept} id={props.id} type="file" />
			<label htmlFor={props.id}>
				<IconButton {...props} component="span">
					{props.children}
				</IconButton>
			</label>
		</Fragment>
	);
};
