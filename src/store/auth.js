import axios from "axios"

export default {
  namespaced: true,

  state: {
    user: null
  },
  mutations: {
    SET_USER(state, data) {
      state.user = data
    }
  },
  actions: {
    async signIn({ dispatch }, credentials) {
      await axios.get("sanctum/csrf-cookie")

      await axios.post("login", credentials)

      let response = await axios.get("api/user")

      dispatch('attempt', response.data)
    },

    async attempt({ commit }, data) {
      console.log(data)
      commit('SET_USER', data);
    }
  },
};
