import axios from 'axios'

const baseUrl = BACKEND_URL + '/api/users' // eslint-disable-line no-undef

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const signup = async credentials => {
  const request = await axios.post(baseUrl, credentials);
  return request.data
}

export default {
  getAll,
  signup
}