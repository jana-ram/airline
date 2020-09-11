import React from 'react';
import { Switch , withRouter , Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './common/Navbar';
import PageNotFound from './PageNotFound';
import Dashboard from './dashboard/Dashboard';
import FlightDetails from './flights/FlightDetails';
import PassengerList from './passengers/PassengerList';
import PassengerForm from './passengers/PassengerForm';
import AncillaryList from './ancillary/AncillaryList';
import AncillaryForm from './ancillary/AncillaryForm';
import LoginPage from './auth/LoginPage';
import './App.css';

class App extends React.Component{
	render(){
        return(
			<>
				<CssBaseline />
				<Navbar/>
				<main>
					<Switch>
						<Route path='/' component={Dashboard} exact/>
						<Route path='/flight/:flightId' component={FlightDetails} exact/>
						<Route path='/flights/:flightId/passengers/list' component={PassengerList} exact/>
						<Route path='/flights/:flightId/passengers/:id' component={PassengerForm} exact/>
						<Route path='/flights/:flightId/passengers' component={PassengerForm} exact/>
						<Route path='/flights/:flightId/services/list' component={AncillaryList} exact/>
						<Route path='/flights/:flightId/services' component={AncillaryForm} exact/>
						<Route path='/flights/:flightId/services/:id' component={AncillaryForm} exact/>
						<Route path='/login' component={LoginPage} exact/>
						<Route component={PageNotFound} />
					</Switch>
				</main>
			</>
        )
    }
}

export default withRouter(App);