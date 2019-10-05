import axios from 'axios'

const API_URL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}/api/`
const LOGIN_URL = API_URL + 'signin'
const SIGNUP_URL = API_URL + 'signup'

export default {
  login (creds) {
    return axios.post(LOGIN_URL, creds)
  },

  signup (creds) {
    return axios.post(SIGNUP_URL, creds)
  }
}