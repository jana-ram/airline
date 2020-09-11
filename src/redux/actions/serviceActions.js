import { ActionTypes } from '../actions/actionTypes';

export const createService = (service) => {
	return (dispatch, getState, {getFirestore}) => {
		const firestore = getFirestore();		
		firestore.collection('services').add({
			flightId: service.flightId,
			serviceName: service.serviceName
		}).then(() => {
			dispatch({ type: ActionTypes.CREATE_SERVICE_SUCCESS, service});			
		}).catch((err) => {
			dispatch({ type: ActionTypes.CREATE_SERVICE_ERROR, err });
		});		
	}
}

export const updateService = (service) => {
	return (dispatch, getState, {getFirestore}) => {
		const firestore = getFirestore();
		
		firestore.collection('services').doc(service.id).update({
			serviceName: service.serviceName
		}).then(()=> {
			dispatch({ type: ActionTypes.UPDATE_SERVICE_SUCCESS});
		}).catch((err) => {
			dispatch({ type: ActionTypes.UPDATE_SERVICE_ERROR, err});
		});
	}
}

export const deleteService = (serviceId) => {
	return (dispatch, getState, {getFirestore}) => {
		const firestore = getFirestore();
		
		firestore.collection('services').doc(serviceId).delete()
		.then(()=> {
			dispatch({ type: ActionTypes.DELETE_SERVICE_SUCCESS});
		}).catch((err) => {
			dispatch({ type: ActionTypes.DELETE_SERVICE_ERROR, err});
		});
	}
}