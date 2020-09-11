import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import SignedInLinks from './SignedInLinks';
// import SignedOutLinks from './SignedOutLinks';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = (props) => {
	const classes = useStyles();
	const { auth, profile } = props;
	const links = auth.uid ? <SignedInLinks profile={profile}/> : null;

	return (
		<AppBar position="relative">
			<Toolbar>
				<Typography variant="h6" className={classes.title}>
					<NavLink to="/">Airline Management</NavLink>
				</Typography>
				{ links }
			</Toolbar>
		</AppBar>
	);
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile
	}
}

export default connect(mapStateToProps)(Navbar)
