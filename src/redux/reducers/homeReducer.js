import { ActionTypes } from '../actions/actionTypes';
import initialState from './initialState';

export default function homeReducers(state = initialState.home, action) {
    switch (action.type) {
        case ActionTypes.HOME_SEARCH_SUCCESS:
          return {
            payload: action.payload,
            type: action.notificationType
          }; 
        case ActionTypes.HOME_SEARCH_FAIL:
          return {
            payload: "",
            type: action.notificationType
          };    
        default:
          return state
    }
}