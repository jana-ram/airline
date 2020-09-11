import { ActionTypes } from '../actions/actionTypes';
import initialState from './initialState';

const authReducer = (state = initialState.auth, action) => {
	
	switch(action.type) {
		case ActionTypes.LOGIN_ERROR:
			console.log('Login Failed');
			return {
				...state,
				authError: 'Login Failed'
			}
		case ActionTypes.LOGIN_SUCCESS:
			console.log(action);
			return {
				...state,
				authError: null
			}
		case ActionTypes.SIGNOUT_SUCCESS:
			console.log('Signout Success');
			return state;
		case ActionTypes.GOOGLE_LOGIN_SUCCESS:
			console.log('Google login success');
			return {
				...state,
				authError: null
			}
		case ActionTypes.GOOGLE_LOGIN_ERROR:
			console.log('Google Login Failed');
			return {
				...state,
				authError: action.err.message
			}
		default:
			return state;
	}
}

export default authReducer;