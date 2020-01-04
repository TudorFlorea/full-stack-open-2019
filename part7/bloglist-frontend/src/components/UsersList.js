import React from 'react'
import {Link} from 'react-router-dom'

const UsersList = ({users}) => {
    return (
        <>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user => {
                        return (
                            <tr key={user.id}>
                                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
};

export default UsersList;