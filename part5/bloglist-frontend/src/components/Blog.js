import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, onLikeClick, onBlogDelete }) => {
  const [showInfo, setShowInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikeClick = e => {
    e.stopPropagation()
    onLikeClick({
      ...blog,
      user: blog.user.id,
      likes: ++blog.likes
    })
  }

  const handleRemoveClick = e => {
    e.stopPropagation()
    const shouldDelete = window.confirm(`remove blog ${blog.title}?`)
    if (shouldDelete) {
      onBlogDelete(blog.id)
    }
  }
  return (
    <div style={blogStyle} onClick={() => setShowInfo(!showInfo)}>
      <p>
        {blog.title} {blog.author}
      </p>
      {showInfo ? (
        <div>
          <p>
            <a href={blog.url} />
            {blog.url}
          </p>
          <p>
            {blog.likes} likes <button onClick={handleLikeClick}>like</button>
          </p>
          <p>added by {blog.user && blog.user.name}</p>
          {user.username === (blog.user && blog.user.username) ? (
            <button onClick={handleRemoveClick}>remove</button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  onLikeClick: PropTypes.func.isRequired,
  onBlogDelete: PropTypes.func.isRequired
}

export default Blog
