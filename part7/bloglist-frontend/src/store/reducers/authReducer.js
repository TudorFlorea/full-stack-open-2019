import { LOGIN, SET_AUTH_DATA, INIT_AUTH, LOGOUT } from '../actions/authActions'

const initalState = {
  token: '',
  user: null,
  isReady: false
}

const authReducer = (state = initalState, action) => {

  switch(action.type) {
  case LOGIN:
    return {
      ...state,
      token: action.data.token,
      user: {
        username: action.data.username,
        name: action.data.name
      }
    }
  case SET_AUTH_DATA:
    return {
      ...state,
      token: action.data.token,
      user: {
        username: action.data.username,
        name: action.data.name
      }
    }
  case INIT_AUTH: {
    if(action.data) {
      return {
        ...state,
        isReady: true,
        token: action.data.token,
        user: {
          username: action.data.username,
          name: action.data.name
        }
      }
    } else {
      return {
        ...state,
        isReady: true,
      }
    }
  }

  case LOGOUT:
    return {
      ...initalState,
      isReady: true
    }
  default:
    return state
  }
}

export default authReducer