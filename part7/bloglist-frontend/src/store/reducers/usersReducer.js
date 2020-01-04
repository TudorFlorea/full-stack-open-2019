import { INIT_USERS } from '../actions/usersActions'

const initialState = []

const usersReducer = (state = initialState, action) => {

  switch(action.type) {
  case INIT_USERS:
    return action.data

  default:
    return state
  }
}

export default usersReducer