import axios from 'axios'
const baseUrl = BACKEND_URL + '/api/blogs' // eslint-disable-line no-undef

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getConfig = config => {
  const defaultConfig = {
    headers: { Authorization: token }
  }

  return {
    ...defaultConfig,
    ...config
  }
}

const addBlog = async newBlog => {
  const createdBlog = await axios.post(baseUrl, newBlog, getConfig())
  return createdBlog.data
}

const updateBlog = async blog => {
  const updatedBlog = await axios.put(
    `${baseUrl}/${blog.id}`,
    blog,
    getConfig()
  )
  return updatedBlog.data
}

const deleteBlog = async id => {
  const deletedBlog = await axios.delete(`${baseUrl}/${id}`, getConfig())
  return deletedBlog.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlogComment = async (blogId, data) => {
  const request = await axios.post(`${baseUrl}/${blogId}/comments`, data)
  return request.data
}

export default { getAll, addBlog, updateBlog, deleteBlog, addBlogComment, setToken }
