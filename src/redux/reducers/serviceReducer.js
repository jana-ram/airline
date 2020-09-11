import { ActionTypes } from '../actions/actionTypes';
import initialState from './initialState';

const serviceReducer = (state = initialState.services, action) => {
	switch(action.type) {
		case ActionTypes.CREATE_SERVICE_SUCCESS:
			console.log('CREATE_SERVICE_SUCCESS', action.service);
			return state;
		case ActionTypes.CREATE_SERVICE_ERROR:
			console.log('CREATE_SERVICE_ERROR', action.err);
			return state;
		case ActionTypes.UPDATE_SERVICE_SUCCESS:
			console.log('UPDATE_SERVICE_SUCCESS');
			return state;
		case ActionTypes.UPDATE_SERVICE_ERROR:
			console.log('UPDATE_SERVICE_ERROR', action.err);
			return state;
		case ActionTypes.DELETE_SERVICE_SUCCESS:
			console.log('Document successfully deleted!');
			return state;
		case ActionTypes.DELETE_SERVICE_ERROR:
			console.log('Error removing document:', action.err);
			return state;		
		default:
			return state;
	}
}

export default serviceReducer;