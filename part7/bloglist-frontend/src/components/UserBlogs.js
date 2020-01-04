import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const UserBlogs = ({ user }) => {

  if(!user) return null

  return (
    <>
      <h2>{user.name}</h2>
      <p>added blogs</p>
      <ListGroup>
        {user.blogs && user.blogs.map(blog => {
          return <ListGroup.Item key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></ListGroup.Item >
        })}
      </ListGroup>
    </>
  )
}

export default UserBlogs