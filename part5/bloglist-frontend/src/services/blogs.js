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

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

export default { getAll, addBlog, setToken };
