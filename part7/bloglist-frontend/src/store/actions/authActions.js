import AuthSevice from '../../services/auth'
import BlogService from '../../services/blogs'
import { getAuthData } from '../../utils/AuthUtil'
import { CREATE_NOTIFICATION, CLEAR_NOTIFICATION } from './notificationActions'

export const LOGIN = 'LOGIN'
export const SET_AUTH_DATA = 'SET_AUTH_DATA'
export const INIT_AUTH = 'INIT_AUTH'
export const LOGOUT = 'LOGOUT'

export const login = credentials => {
  return async dispatch => {
    try {
      const user = await AuthSevice.login(credentials)

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      BlogService.setToken(user.token)
      dispatch({
        type: LOGIN,
        data: user
      })
    } catch (err) {
      dispatch({
        type: CREATE_NOTIFICATION,
        data: {
          success: false,
          content: err.response.data.error
        }
      })
    } finally {
      setTimeout(() => {
        dispatch({
          type: CLEAR_NOTIFICATION
        })
      }, 5000)
    }
  }
}

export const initAuth = () => {
  const authData = getAuthData()
  if(authData) {
    BlogService.setToken(authData.token)
  } else {
    BlogService.setToken('')
  }
  return {
    type: INIT_AUTH,
    data: authData
  }
}

export const setAuthData = data => {
  return {
    type: SET_AUTH_DATA,
    data
  }
}

export const logout = () => {
  window.localStorage.removeItem('loggedBlogUser')
  return {
    type: LOGOUT
  }
}