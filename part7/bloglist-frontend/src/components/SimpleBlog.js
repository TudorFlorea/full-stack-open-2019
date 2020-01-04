import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className="blog-title">
      {blog.title} {blog.author}
    </div>
    <div>
      blog has <span className="blog-likes">{blog.likes}</span> likes
      <button className="blog-like" onClick={onClick}>
        like
      </button>
    </div>
  </div>
)

export default SimpleBlog
