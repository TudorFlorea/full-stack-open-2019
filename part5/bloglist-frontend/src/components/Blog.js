import React, { useState } from "react";
const Blog = ({ blog, onLikeClick, onBlogDelete }) => {
  const [showInfo, setShowInfo] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  const handleLikeClick = e => {
    e.stopPropagation();
    onLikeClick({
      ...blog,
      user: blog.user.id,
      likes: ++blog.likes
    });
  };

  const handleRemoveClick = e => {
    e.stopPropagation();
    const shouldDelete = window.confirm(`remove blog ${blog.title}?`);
    if (shouldDelete) {
      onBlogDelete(blog.id);
    }
  };

  return (
    <div style={blogStyle} onClick={e => setShowInfo(!showInfo)}>
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
          <p>added by {blog.user.name}</p>
          <button onClick={handleRemoveClick}>remove</button>
        </div>
      ) : null}
    </div>
  );
};

export default Blog;
