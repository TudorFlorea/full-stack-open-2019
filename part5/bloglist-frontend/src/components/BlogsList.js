import React from "react";
import Blog from "./Blog";

const BlogsList = ({ blogs }) => {
  return (
    <>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default BlogsList;
