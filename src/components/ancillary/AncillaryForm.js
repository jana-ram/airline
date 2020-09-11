import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createService, updateService } from '../../redux/actions/serviceActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
	},
	submit: {
		margin: theme.spacing(2, 0, 2),
	},
}));

const AncillaryForm = (props) => {
	const classes = useStyles();
	
	const { auth, service } = props;
	const flightId = props.match.params.flightId;
	const serviceId = props.match.params.id ?? null;
	
	const [formData, updateFormData] = useState({
		flightId: flightId,
		serviceName: service ? service.serviceName : '',		
	});
	
	const [formErrors, updateFormErrors] = useState({
		serviceName: false,
	});
	
	if (!auth.uid) return <Redirect to='/login' />
	
	const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim()
		});
		
		updateFormErrors({
			...formErrors,
			[e.target.name]: (e.target.value.trim() === '') ? true : false
		});
	};
	
	const handleSubmit = (e) => {
		e.preventDefault();
		
		if (formData.serviceName === '') {
			updateFormErrors({
				...formErrors,
				showError: true
			});
			
			return false;
		}
		
		if (serviceId) {
			props.updateService({...formData, id:serviceId});
		} else {
			props.createService(formData);
		}
	};
	
	return (
		<Container component="main" maxWidth="xs">		
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Add a Service
				</Typography>
				<form className={classes.form} autoComplete="off">
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="serviceName"
						label="Service Name"
						name="serviceName"
						onChange= { handleChange }
						value = { formData.serviceName }
						autoFocus
						error = { formErrors.serviceName }
						helperText={ formErrors.serviceName ? 'Required' : ''}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className= { classes.submit }
						onClick = { handleSubmit }
					>
						Submit
					</Button>					
				</form>
			</div>		
		</Container>
	)
}

const mapStateToProps = (state, ownProps) => {	
	const id = ownProps.match.params.id;
	const services = state.firestore.data.services;
	const service = services ? services[id] : null;
	
	return {
		auth: state.firebase.auth,
		service: service,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		createService: (formData) => dispatch(createService(formData)),
		updateService: (formData) => dispatch(updateService(formData)),
	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect(props => [
		{ collection: 'services', doc: props.match.params.id }
	])
)(AncillaryForm);