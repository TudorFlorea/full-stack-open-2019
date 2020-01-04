import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Blog = ({ blog }) => {

  return (
    <Link to={`/blogs/${blog.id}`}>
      <Card bg="info" text="white">
        <Card.Body>{blog.title} {blog.author}</Card.Body>
      </Card>
    </Link>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  onLikeClick: PropTypes.func.isRequired,
  onBlogDelete: PropTypes.func.isRequired
}

export default Blog
