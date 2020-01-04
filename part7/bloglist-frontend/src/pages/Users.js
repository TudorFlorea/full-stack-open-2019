import React, {useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';

import UsersList from '../components/UsersList';
import {initUsers} from '../store/actions/usersActions';

const Users = props => {

    useEffect(() => {
        props.initUsers()
    }, []);

    if(!props.auth.user) return <Redirect to="/login" />

    return (
        <>
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
        initUsers: () => dispatch(initUsers())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Users);