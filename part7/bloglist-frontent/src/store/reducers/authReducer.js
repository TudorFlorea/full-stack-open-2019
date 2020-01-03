import {LOGIN, SET_AUTH_DATA, LOGOUT} from '../actions/authActions';

const initalState = {
    token: "",
    user: null
};

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
        case LOGOUT:
            return initalState;
        default:
            return state;
    }
}

export default authReducer;