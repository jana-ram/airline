import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#2196f3',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(4)
	},
	table: {
		minWidth: 700,
	},
}));

const PassengerList = (props) => {
	const classes = useStyles();
	
	const {auth, role, passengers} = props;
	const flightId = props.match.params.flightId;	
	if (!auth.uid) return <Redirect to='/login' />
	
	return (
		<Container component="main" maxWidth="lg">
			<Grid container alignItems="flex-start" justify="flex-end" direction="row" className={classes.paper}>
				<Button variant="outlined" color="primary">
					<Link to={"/flights/" + flightId + "/passengers"}>
						Add Passenger
					</Link>
				</Button>
			</Grid>
			
			<div className={classes.paper}>
				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label="customized table">
						<TableHead>
						  <TableRow>
							<StyledTableCell align="center">S.No</StyledTableCell>
							<StyledTableCell align="center">Passenger Name</StyledTableCell>
							<StyledTableCell align="center">Ancillary Service</StyledTableCell>
							<StyledTableCell align="center">Seat Number</StyledTableCell>
							<StyledTableCell align="center">Action</StyledTableCell>
						  </TableRow>
						</TableHead>
						<TableBody>
						  { passengers && passengers.map((row, index) => (
							<StyledTableRow key={row.id}>
								<StyledTableCell align="center">{index+1}.</StyledTableCell>
								<StyledTableCell align="center">{row.name}</StyledTableCell>
								<StyledTableCell align="center">{row.service}</StyledTableCell>
								<StyledTableCell align="center">{row.seatNo}</StyledTableCell>
								<StyledTableCell align="center">
									<Link to={ "/flights/" + flightId + "/passengers/" + row.id }>
										<Button variant="outlined">Edit</Button>
									</Link>	
								</StyledTableCell>
							</StyledTableRow>
						  ))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>		
		</Container>
	)
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		role: state.firebase.profile.role,
		passengers: state.firestore.ordered.passengers,
	}
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect(props => [
		{ collection: 'passengers', where: [['flightId', '==', props.match.params.flightId]] }
	])
)(PassengerList);