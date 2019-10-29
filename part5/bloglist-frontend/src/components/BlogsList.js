import React from "react";
import Blog from "./Blog";

const BlogsList = ({ blogs, onLikeClick }) => {
  console.log(blogs);
  return (
    <>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} onLikeClick={onLikeClick} />
      ))}
    </>
  );
};

export default BlogsList;
