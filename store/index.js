export const strict = false

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('auth/SET_USER', req.session.authUser)
      commit('auth/SET_TOKEN', req.session.authToken)
    }
  }
}
