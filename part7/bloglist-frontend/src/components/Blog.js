import React from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };
  return (
    <Link to={`/blogs/${blog.id}`}>
        <div style={blogStyle}>
        <p className="blog-title">
          {blog.title} {blog.author}
        </p>
      </div>
    </Link>

  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  onLikeClick: PropTypes.func.isRequired,
  onBlogDelete: PropTypes.func.isRequired
};

export default Blog;
