import axios from 'axios'

const baseUrl = BACKEND_URL + '/api/auth' // eslint-disable-line no-undef

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
