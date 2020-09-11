import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
import Box from '@material-ui/core/Box';

import FlightSeat from './FlightSeat';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		'& > *': {
			margin: theme.spacing(1),
		},
	 },
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	box: {
		color: theme.palette.text.primary,
	}
}));

const flightRows = () => {
	let rows = 20;
	let flightSeatArray = [];
	for(let i=1; i <= rows; i++) {
		flightSeatArray.push(
			<FlightSeat key={i} row={i}/>
		)		
	}
	
	return flightSeatArray
}

const FlightDetails = (props) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container spacing={1}>
				<Grid item xs={3}>
					<Paper className={classes.paper}>Flight Details</Paper>
				</Grid>
				<Grid item xs={5}>
					<Box>
					{ flightRows() }
					</Box>
				</Grid>
				<Grid item xs={3}>
					<Paper className={classes.paper}>Legend</Paper>
				</Grid>
			</Grid>
		</div>
	);
}

export default FlightDetails;
