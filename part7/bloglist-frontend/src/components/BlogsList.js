import React from 'react'
import Blog from './Blog'

const BlogsList = ({ blogs, user, onLikeClick, onBlogDelete }) => {
  return (
    <>
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          onLikeClick={onLikeClick}
          onBlogDelete={onBlogDelete}
          user={user}
        />
      ))}
    </>
  )
}

export default BlogsList
