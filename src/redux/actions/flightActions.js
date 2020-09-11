export const createFlight = (flight) => {
	return (dispatch, getState) => {
		dispatch({ type: 'CREATE_FLIGHT', flight});
	}
}