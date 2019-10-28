import React from "react";
import Blog from "./Blog";

const BlogsList = ({ blogs, user }) => {
  return (
    <>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </>
  );
};

export default BlogsList;
