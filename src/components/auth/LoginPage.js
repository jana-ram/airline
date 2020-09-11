import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { signIn, signInWithGoogle } from '../../redux/actions/authActions';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));



const LoginPage = (props) => {
	const classes = useStyles;
	const { authError, auth } = props;
	const initialFormData = Object.freeze({
		email: '',
		password: ''
	});

	const [formData, updateFormData] = useState(initialFormData);
	
	if (auth.uid) return <Redirect to='/' />
	
	const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim()
		});
	};
	
	const loginClick = (e) => {
		e.preventDefault();
		props.signIn(formData);
	}
	
	const googleLoginClick = (e) => {		
		e.preventDefault();
		props.googleSignIn();
	}
	
	return (		
		<Container component="main" maxWidth="xs" className={classes.paper}>
			<div>
				<Typography component="h1" variant="h5">
				Sign in
				</Typography>
				<br/>
				<Typography variant="h6">
				{ authError ? authError : null }
				</Typography>
				<form className={classes.form}>
					<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id="email"
					label="Email Address"
					name="email"
					autoComplete="email"
					onChange={ handleChange }
					autoFocus
					/>
					<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					name="password"
					label="Password"
					type="password"
					id="password"
					onChange={ handleChange }
					autoComplete="current-password"
					/>
					<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
					onClick = { loginClick }
					>
					Sign In
					</Button>
					<br/>
					<br/>
					<Button
					type="submit"
					fullWidth
					variant="outlined"
					color="secondary"
					className={classes.submit}
					onClick = { googleLoginClick }
					>
					Sign In With Google
					</Button>
				</form>
			</div>
		</Container>
	);
}

const mapStateToProps = (state) => {
	return {
		authError: state.auth.authError,
		auth: state.firebase.auth
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		signIn: (creds) => dispatch(signIn(creds)),
		googleSignIn: () => dispatch(signInWithGoogle())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);