import userReducer from './reducers/user';
import {combineReducers, createStore} from "redux";
//createStore deprecated, have a look at combineStore

const allReducers = combineReducers({
    user: userReducer,
});

const store = createStore(allReducers);


export default store;