import React from 'react'
import {Link} from 'react-router-dom';
import UserDetails from './UserDetails';

const Nav = ({user, onLogout}) => {

    return (
        <>
            {user ? (
                <div className="nav">
                    <Link to="/">Blogs</Link>
                    <Link to="/users">Users</Link>
                    <UserDetails user={user} onLogOut={onLogout} />
                </div>
            ) : (null)} 
        </>
    )
}

export default Nav;