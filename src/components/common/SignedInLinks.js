import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../redux/actions/authActions';

import Typography from '@material-ui/core/Typography';


import Avatar from '@material-ui/core/Avatar';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const SignedInLinks = (props) => {
	const [anchorEl, setAnchorEl] = useState(null);
	
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	
	return (
		<>
			<Typography variant="h6" > {props.profile.displayName} </Typography>
			<Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
				<Avatar alt={props.profile.displayName} src={props.profile.avatarUrl}/>
			</Button>			
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={props.signOut}>Logout</MenuItem>
			</Menu>
        </>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(signOut())
	}
}

export default connect(null, mapDispatchToProps)(SignedInLinks);
