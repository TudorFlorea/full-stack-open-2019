import { CREATE_NOTIFICATION, CLEAR_NOTIFICATION } from '../actions/notificationActions'

const initState = null

const notificationReducer = (state = initState, action) => {
  switch(action.type) {
  case CREATE_NOTIFICATION:
    return action.data
  case CLEAR_NOTIFICATION:
    return null
  default:
    return state
  }
}

export default notificationReducer