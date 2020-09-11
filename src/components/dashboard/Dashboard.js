import React from 'react';
import FlightList from '../flights/FlightList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class Dashboard extends React.Component{	
	render(){
		const {flights, auth, role } = this.props;
		if (!auth.uid) return <Redirect to='/login' />
		
		return <FlightList flights={flights} auth={auth} role={role}/>
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		role: state.firebase.profile.role,
		flights: state.firestore.ordered.flights,
	}
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection: 'flights' }
	])
)(Dashboard);