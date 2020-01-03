import AuthSevice from '../../services/auth';
import BlogService from '../../services/blogs';
import {CREATE_NOTIFICATION, CLEAR_NOTIFICATION} from './notificationActions';

export const LOGIN = "LOGIN";
export const SET_AUTH_DATA = "SET_AUTH_DATA";
export const LOGOUT = "LOGOUT";

export const login = credentials => {
    return async dispatch => {
        try {
            const user = await AuthSevice.login(credentials);
        
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
};

export const setAuthData = data => {
    return {
        type: SET_AUTH_DATA,
        data
    };
};

export const logout = () => {
    window.localStorage.removeItem('loggedBlogUser');
    return {
        type: LOGOUT
    }
};