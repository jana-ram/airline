import initialState from './initialState';
import { ActionTypes } from '../actions/actionTypes';

const passengerReducer = (state = initialState.passengers, action) => {
	switch(action.type) {
		case ActionTypes.ADD_PASSENGER_SUCCESS:
			console.log('ADD_PASSENGER_SUCCESS', action.passenger);
			return state;
		case ActionTypes.ADD_PASSENGER_ERROR:
			console.log('ADD_PASSENGER_ERROR', action.err);
			return state;
		case ActionTypes.UPDATE_PASSENGER_SUCCESS:
			console.log('UPDATE_PASSENGER_SUCCESS', action.passenger);
			return state;
		case ActionTypes.UPDATE_PASSENGER_ERROR:
			console.log('UPDATE_PASSENGER_ERROR', action.err);
			return state;

		case ActionTypes.GET_PASSENGER_SUCCESS:
			console.log('GET_PASSENGER_SUCCESS', action.passenger);
			return state;
		case ActionTypes.GET_PASSENGER_ERROR:
			console.log('GET_PASSENGER_ERROR', action.err);
			return state;
		default:
			return state;
	}
}

export default passengerReducer;