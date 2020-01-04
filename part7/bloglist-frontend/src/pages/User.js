import React from 'react'
import {connect} from 'react-redux'

import Heading from '../components/Heading';
import UserDetails from '../components/UserDetails';
import UserBlogs from '../components/UserBlogs';
import {logout} from "../store/actions/authActions";
import {initUsers} from '../store/actions/usersActions';

const User = props => {

    const userId = props.match.params.id;
    const user = props.users.find(u => u.id === userId);

    if(!props.auth.user) return <Redirect to="/login" />

    return (
        <>
            <Heading text="blogs" />
            <UserDetails user={props.auth.user} onLogOut={() => {props.logout()}} />
            <UserBlogs user={user} />
        </>
    )

}

const mapStateToProps = state => {
    return {
        users: state.users,
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
        initUsers: () => dispatch(initUsers())
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User);

