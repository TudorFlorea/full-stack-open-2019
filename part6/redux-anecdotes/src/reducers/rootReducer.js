import {combineReducers} from 'redux';

import notificationReducer from './notificationReducer';
import anecdoteReducer from './anecdoteReducer';

const rootReducer =  combineReducers({
    anecdotes: anecdoteReducer,
    notifications: notificationReducer
});

export default rootReducer;