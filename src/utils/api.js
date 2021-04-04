import axios from 'axios'

axios.defaults.baseURL = 'url'

const api = (method, url, data, token) => {
  axios.defaults.headers.common = { 'Authorization': `bearer ${token}` }

  if (method, url) {
    return axios({
      method,
      url,
      data: data || {},
    })
  } else {
    return alert('Axios Error!')
  }
}

export default api