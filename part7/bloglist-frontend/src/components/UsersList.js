import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UsersList = ({ users }) => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Blogs created</th>
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
      </Table>
    </>
  )
}

export default UsersList