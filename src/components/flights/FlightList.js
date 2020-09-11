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
		marginTop: theme.spacing(6)
	},
	table: {
		minWidth: 700,
	},
}));

const FlightList = ({flights, role}) => {
	const classes = useStyles();
  
	const actionColumn = (id) => {
		if (role === 'staff') {
			return <Button color="secondary"><Link to={"/flight/" + id }>Check-in</Link></Button>
		} else if (role === 'admin') {
			return (
				<>
					<Button color="primary">
						<Link to={"/flights/" + id + "/passengers/list"}>Manage Passengers</Link>
					</Button>
					<Button color="secondary">
						<Link to={ "/flights/" + id + "/services/list" }>Ancillary services</Link>
					</Button>
				</>
			);
		} 
		
		return '';		
	}
	
	return (
		<Container component="main" maxWidth="lg">		
			<div className={classes.paper}>
				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label="customized table">
						<TableHead>
						  <TableRow>
							<StyledTableCell align="center">Flight Name</StyledTableCell>
							<StyledTableCell align="center">Departure</StyledTableCell>
							<StyledTableCell align="center">Arrival</StyledTableCell>
							<StyledTableCell align="center">Duration</StyledTableCell>
							<StyledTableCell align="center">Action</StyledTableCell>
						  </TableRow>
						</TableHead>
						<TableBody>
						  { flights && flights.map((row) => (
							<StyledTableRow key={row.id}>
								<StyledTableCell align="center">{row.flightName}</StyledTableCell>
								<StyledTableCell align="center">{row.departure}</StyledTableCell>
								<StyledTableCell align="center">{row.arrival}</StyledTableCell>
								<StyledTableCell align="center">{row.duration}</StyledTableCell>
								<StyledTableCell align="center">{actionColumn(row.id)}</StyledTableCell>		  
							</StyledTableRow>
						  ))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>		
		</Container>
	);
}

export default FlightList;

