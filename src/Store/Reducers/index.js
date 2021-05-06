import allReducers from './reducers';
import { combineReducers } from 'redux';

export default combineReducers({
    root: allReducers
});