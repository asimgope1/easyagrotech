import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import dashboardReducer from '../dashboard/reducer';
import authenticationReducer from '../authentication/reducer';


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const reducer = combineReducers({
    dashboardReducer,
    authenticationReducer
});

const configureStore = (initialState) => createStoreWithMiddleware(reducer, initialState);

export default configureStore;
