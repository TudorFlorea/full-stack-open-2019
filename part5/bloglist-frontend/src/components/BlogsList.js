import React from "react";
import Blog from "./Blog";

const BlogsList = ({ blogs, onLikeClick, onBlogDelete }) => {
  return (
    <>
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          onLikeClick={onLikeClick}
          onBlogDelete={onBlogDelete}
        />
      ))}
    </>
  );
};

export default BlogsList;
