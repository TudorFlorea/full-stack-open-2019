import React, { useState, useEffect } from "react";
import blogService from "./services/blogs";
import authService from "./services/auth";
import BlogsList from "./components/BlogsList";
import LoginForm from "./components/LoginForm";
import Heading from "./components/Heading";
import UserDetails from "./components/UserDetails";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const handleSubmit = async credentials => {
    try {
      const user = await authService.login(credentials);
      console.log(user);
      console.log("here");
      setUser(user);
    } catch (err) {
      console.log(err, err.message);
      console.log("not");
      console.log(err.response);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const blogsResult = await blogService.getAll();
        console.log(blogsResult);
        setBlogs(blogsResult);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <div className="App">
      {user ? (
        <Heading text="blogs" />
      ) : (
        <Heading text="log in to application" />
      )}
      {user ? (
        <>
          <UserDetails user={user} /> <BlogsList blogs={blogs} />
        </>
      ) : (
        <LoginForm onSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default App;
