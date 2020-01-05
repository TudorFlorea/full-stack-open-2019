import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Heading from './Heading'

const BlogDetails = props => {

  const { blog, user, onLike, onDelete } = props

  const handleLikeClick = () => {
    onLike({
      ...blog,
      user: blog.user.id,
      likes: ++blog.likes
    })
  }

  const handleDeleteClick = () => {
    onDelete(blog.id)
  }

  if(!blog) return null

  return (
    <div>
      <Heading text={blog.title} />
      <a className="blog-url" href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes <Button variant="primary" onClick={handleLikeClick}>like</Button></p>
      {blog.user && <p>added by <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link></p>}
      {user && user.username === (blog.user && blog.user.username) ? (
        <Button variant="danger" onClick={handleDeleteClick}>remove</Button>
      ) : null}

    </div>
  )
}

export default BlogDetails