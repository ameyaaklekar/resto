import axios from "axios"

export default {
  namespaced: true,

  state: {
    authenticated: null,
    user: null
  },
  getters: {
    authenticated(state) {
      return state.authenticated
    },

    user(state) {
      return state.user
    }
  },
  mutations: {
    SET_AUTHENTICATION(state, data) {
      state.authenticated = data
    },
    SET_USER(state, data) {
      state.user = data
    }
  },
  actions: {
    async signIn({ commit, dispatch }, credentials) {
      await axios.get("sanctum/csrf-cookie")

      try {
        let response = await axios.post("login", credentials)
        if (!response.errors) {
          await dispatch("getUser")
        }
        return response
      } catch (e) {
        commit("SET_AUTHENTICATION", null)
        if (e.response.data.errors) {
          return e.response.data
        }
      }
    },

    async signOut({ commit }) {
      await axios.post("logout")
      commit("SET_AUTHENTICATION", null)
      commit("SET_USER", null)
      localStorage.removeItem("auth")
    },

    async getUser({ commit }) {
      try {
        let response = await axios.get("api/user")
        commit("SET_AUTHENTICATION", true)
        commit("SET_USER", response.data)
      } catch (e) {
        commit("SET_AUTHENTICATION", null)
        commit("SET_USER", null)
      }
    },

    async register(_, data) {
      try {
        await axios.get("sanctum/csrf-cookie")
        let response = await axios.post("register", data)
        if (!response.errors) {
          localStorage.setItem("auth", true)
        }
        return response
      } catch (e) {
        if (e.response.data.errors) {
          return e.response.data
        }
      }
    }
  }
}
