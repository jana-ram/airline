import { ActionTypes } from '../actions/actionTypes';

export const signIn = (credentials) => {
	return (dispatch, getState, {getFirebase}) => {
		const firebase = getFirebase();
		
		firebase.auth().signInWithEmailAndPassword(
			credentials.email,
			credentials.password
		).then(() => {
			dispatch({ type: ActionTypes.LOGIN_SUCCESS });
		}).catch((err) => {
			dispatch({ type: ActionTypes.LOGIN_ERROR, err });
		});
	}
}

export const signInWithGoogle = () => {
	return (dispatch, getState, {getFirebase}) => {
		const firebase = getFirebase();
		
		firebase.login({
			provider: "google",
			type: "popup",
		})
		.then((response) => {
			dispatch({ type: ActionTypes.GOOGLE_LOGIN_SUCCESS, response });
		}).catch((err) => {
			dispatch({ type: ActionTypes.GOOGLE_LOGIN_ERROR, err });
		});
	}
}

export const signOut = () => {
	return (dispatch, getState, {getFirebase}) => {
		const firebase = getFirebase();
		
		firebase.auth().signOut().then(() => {
			dispatch({ type: ActionTypes.SIGNOUT_SUCCESS})
		})
	}
}