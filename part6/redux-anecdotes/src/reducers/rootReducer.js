import {combineReducers} from 'redux';

import notificationReducer from './notificationReducer';
import anecdoteReducer from './anecdoteReducer';
import filterReducer from './filterReducer';

const rootReducer =  combineReducers({
    anecdotes: anecdoteReducer,
    notifications: notificationReducer,
    filter: filterReducer
});

export default rootReducer;