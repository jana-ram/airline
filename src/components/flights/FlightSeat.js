import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
// import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const FlightSeat = (props) => {
	return (
		<>
			<Grid container spacing={1}>
				<Grid item xs={1}>{props.row}</Grid>
				<Grid item xs={3}>
					<ButtonGroup color="secondary" aria-label="outlined secondary button group">
						<Button>A</Button>
						<Button>B</Button>
						<Button>C</Button>
					</ButtonGroup>
				</Grid>
				<Grid item xs={3}>
					<ButtonGroup color="secondary" aria-label="outlined secondary button group">
						<Button>D</Button>
						<Button>E</Button>
						<Button>F</Button>
					</ButtonGroup>
				</Grid>
			</Grid>
		</>
	)
};

export default FlightSeat;