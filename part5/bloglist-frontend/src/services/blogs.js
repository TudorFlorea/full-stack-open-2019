import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const addBlog = async newBlog => {
  const config = {
    headers: { Authorization: token }
  };

  const createdBlog = await axios.post(baseUrl, newBlog, config);
  return createdBlog.data;
};

const updateBlog = async blog => {
  const config = {
    headers: { Authorization: token }
  };

  const updatedBlog = await axios.put(`${baseUrl}/${blog.id}`, blog, config);
  return updatedBlog.data;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

export default { getAll, addBlog, updateBlog, setToken };
