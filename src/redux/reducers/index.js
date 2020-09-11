import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import authReducer from './authReducer';
import flightReducer from './flightReducer';
import passengerReducer from './passengerReducer';
import serviceReducer from './serviceReducer';

export default combineReducers({
	auth: authReducer,
	flight: flightReducer,
	firestore: firestoreReducer,
	firebase: firebaseReducer,
	passenger: passengerReducer,
	service: serviceReducer,
});