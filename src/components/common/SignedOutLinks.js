import React from 'react';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => {
	return (
		<>
			<Button><NavLink to="/login">Login</NavLink></Button>
		</>
	);
}

export default SignedOutLinks;
