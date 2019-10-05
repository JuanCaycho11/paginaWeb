import axios from 'axios'

export const state = () => ({
  user: null,
  token: null
})

// getters
export const getters = {
  getUser: (state) => {
    return state.user
  },
  isAuthenticated (state) {
    return !!state.user
  },
  loggedUser (state) {
    return state.user
  },
  getToken: (state) => {
    return state.token
  },
  isToken (state) {
    return !!state.token
  },
  getAuthHeader: (state) => {
    return {
      'Authorization': 'Bearer ' + state.token
    }
  }
}

// actions
export const actions = {
  fetchUser (context) {
    console.log(context.getters.isAuthenticated)
    if (!context.getters.isAuthenticated && context.getters.isAuthenticated) {
      axios.get('https://zappyntest.herokuapp.com/api/userToken', { headers: context.getters.getAuthHeader })
        .then((res) => {
          console.log(res)
          context.commit('SET_USER', res.data.user)
        }).catch((error) => {
          console.log(error)
        })
    }
  },
  async changePassword ({ commit, getters }, user) {
    try {
      await axios.post('/api/changePasword', user, { headers: getters.getAuthHeader })
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Ocurrio un error al actualizar la contraseña')
      }
      throw error
    }
  },
  async login ({ commit }, creds) {
    try {
      const { data } = await axios.post('/api/signin', creds)
      commit('SET_USER', data.user)
      commit('SET_TOKEN', data.token)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },
  async logout ({ commit }) {
    await axios.post('/api/logout')
    commit('SET_USER', null)
    commit('SET_TOKEN', null)
  }
}

// mutations
export const mutations = {
  SET_USER (state, user) {
    state.user = user || null
  },
  SET_TOKEN (state, token) {
    state.token = token || null
  }
}
