import React, { useState } from "react";
const Blog = ({ blog, user }) => {
  const [showInfo, setShowInfo] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
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
            {blog.likes} likes <button>like</button>
          </p>
          <p>added by {user.name}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Blog;
