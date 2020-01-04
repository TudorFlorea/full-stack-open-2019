import { combineReducers } from 'redux'

import blogsReducer from './blogsReducer'
import usersReducer from './usersReducer'
import authReducer from './authReducer'
import notificationReducer from './notificationReducer'

export default combineReducers({
  blogs: blogsReducer,
  users: usersReducer,
  auth: authReducer,
  notification: notificationReducer
})
