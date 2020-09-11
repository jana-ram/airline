import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { addPassenger, updatePassenger , getPassengerById } from '../../redux/actions/passengerActions';

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
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
}));

const getDate = () => {
	let now = new Date();
	let d = now.getDate();
	let m = now.getMonth();
	let y = now.getFullYear();
	
	return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d)
}

const getSeatList = () => {
	let rows = 10;
	let seats = ['A', 'B', 'C', 'D', 'E', 'F'];
	
	let seatList = [];
	for(let i=1; i <= rows; i++) {
		for(let j=0; j < seats.length; j++) {
			let seatNo = i + seats[j];			
			seatList.push(seatNo);
		}
	}
	
	return seatList;
}

const PassengerForm = (props) => {
	const classes = useStyles();	
	const {auth, services, passenger} = props;
	const flightId = props.match.params.flightId;
	const passengerid = props.match.params.id ?? null;
	
	const seatList = getSeatList();
	props.getPassengerById(props.match.params.flightId);
	
	const [formData, updateFormData] = useState({
		flightId: flightId,
		name: passenger ? passenger.name : '',
		dob: passenger ? passenger.dob : getDate(),
		address: passenger ? passenger.address : '',
		passportNo: passenger ? passenger.passportNo : '',
		service: passenger ? passenger.service : '',
		seatNo: passenger ? passenger.seatNo : '',
		wheelChair: passenger ? passenger.wheelChair : false,
		infant: passenger ? passenger.infant : false,		
	});
	
	const [formErrors, updateFormErrors] = useState({
		name: false,
		seatNo: false
	});
	
	if (!auth.uid) return <Redirect to='/login' />
	
	const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: (e.target.type === 'checkbox') ? e.target.checked : e.target.value.trim()
		});
		
		updateFormErrors({
			...formErrors,
			[e.target.name]: (e.target.value.trim() === '') ? true : false
		});
	};
	
	const handleSubmit = (e) => {
		e.preventDefault();
		if (formData.name === '') {			
			updateFormErrors({
				...formErrors,
				name: true
			});
			
			return false;
		}
		
		
		if (formData.seatNo === '') {			
			updateFormErrors({
				...formErrors,
				seatNo: true
			});
			
			return false;
		}		
		
		if (passengerid) {
			props.updatePassenger(passengerid, formData);
		} else {
			props.addPassenger(formData);
		}
	};	
	
	return (
		<Container component="main" maxWidth="xs">		
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Add a passenger
				</Typography>

				<form className={classes.form} autoComplete="off">
					<FormControl fullWidth className={classes.formControl}>
						<TextField
							variant="outlined"
							required
							id="name"
							label="Name"
							name="name"
							onChange= { handleChange }
							value={formData.name}
							error = { formErrors.name }
							helperText={ formErrors.name ? 'Required' : ''}
						/>
					</FormControl>
					<FormControl fullWidth variant="outlined" className={classes.formControl}>
						<TextField
							variant="outlined"
							id="dob"
							label="DOB"
							name="dob"
							type="date"
							onChange= { handleChange }
							value={formData.dob}
							inputProps={{max:getDate()}}
							InputLabelProps={{shrink: true,}}
						/>
					</FormControl>
					<FormControl fullWidth variant="outlined" className={classes.formControl}>
						<TextField
							variant="outlined"
							id="address"
							label="Address"
							name="address"
							onChange= { handleChange }
							value={formData.address}
						/>
					</FormControl>
					
					<FormControl fullWidth variant="outlined" className={classes.formControl}>					
						<TextField
							variant="outlined"
							id="passportNo"
							label="Passport No"
							name="passportNo"
							onChange= { handleChange }
							value={formData.passportNo}
						/>
					</FormControl>
					
					<FormControl fullWidth variant="outlined" className={classes.formControl}>
						<InputLabel id="service-label">Service</InputLabel>
						<Select
							labelId="service-label"
							id="service"
							value={formData.service}
							onChange= { handleChange }
							label="Service"
							name="service"
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{ services && services.map((row) => (
								<MenuItem key={row.id} value={row.serviceName}>{row.serviceName}</MenuItem>
							))}
						</Select>
					</FormControl>
					
					<FormControl fullWidth variant="outlined" className={classes.formControl}
						error = { formErrors.seatNo }
					>
						<InputLabel id="seat-label">Seat No</InputLabel>
						<Select
							labelId="seat-label"
							id="seatNo"
							value={formData.seatNo}
							onChange= { handleChange }
							label="Seat No"
							name="seatNo"
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{ seatList && seatList.map((row, index) => (
								<MenuItem key={index+1} value={row}>{row}</MenuItem>
							))}
						</Select>
						{ formErrors.seatNo ? <FormHelperText>Required</FormHelperText> : ''}						
					</FormControl>
	  
					<FormControlLabel
						control={<Checkbox checked={formData.wheelChair} onChange={handleChange} name="wheelChair" />}
						label="Require Wheelchair"
					/>
					<FormControlLabel
						control={<Checkbox checked={formData.infant} onChange={handleChange} name="infant" />}
						label="Have Infant"
					/>
	
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
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


	console.log(state)	
	const id = ownProps.match.params.id;
	const passengers = state.firestore.data.passengers;
	const passenger = passengers ? passengers[id] : null;
	return {
		auth: state.firebase.auth,
		// role: state.firebase.profile.role,
		passenger: passenger,
		services: state.firestore.ordered.services
	}
}

const mapDispatchToProps = (dispatch) => {
	let fetchId = "HNCBHJUqTgP0FOAxL4Cd";
	return {
		addPassenger: (formData) => dispatch(addPassenger(formData)),
		updatePassenger: (id, formData) => dispatch(updatePassenger(id, formData)),
		getPassengerById: (fetchId) => dispatch(getPassengerById(fetchId)),
	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect(props => [
		{ collection: 'passengers', doc: props.match.params.id },
		{ collection: 'services', where: [['flightId', '==', props.match.params.flightId]] }
	])
)(PassengerForm);