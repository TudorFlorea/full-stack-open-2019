import React, {useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';

import Heading from '../components/Heading';
import UserDetails from '../components/UserDetails';
import UsersList from '../components/UsersList';
import {logout} from "../store/actions/authActions";
import {initUsers} from '../store/actions/usersActions';

const Users = props => {

    console.log(props);

    useEffect(() => {
        props.initUsers()
    }, []);

    if(!props.auth.user) return <Redirect to="/login" />

    return (
        <>
            <Heading text="blogs" />
            <UserDetails user={props.auth.user} onLogOut={() => {props.logout()}} />
            <UsersList users={props.users} />
        </>
    )

};

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
)(Users);