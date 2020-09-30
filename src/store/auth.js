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
      try {
        let response = await axios.post("login", credentials)
        if (!response.errors) {
          localStorage.setItem("Auth", response.data)
          await dispatch("getUser")
        }
        return response
      } catch (e) {
        commit("SET_AUTHENTICATION", null)
        localStorage.removeItem("Auth")
        if (e.response.data.errors) {
          return e.response.data
        }
      }
    },

    async signOut({ commit }) {
      await axios.post("logout")
      commit("SET_AUTHENTICATION", null)
      commit("SET_USER", null)
      localStorage.removeItem("Auth")
    },

    async getUser({ commit }) {
      try {
        let token = localStorage.getItem("Auth")

        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        }
        let response = await axios.get("user")
        commit("SET_AUTHENTICATION", true)
        commit("SET_USER", response.data)
      } catch (e) {
        commit("SET_AUTHENTICATION", null)
        commit("SET_USER", null)
      }
    },

    async register(_, data) {
      try {
        let response = await axios.post("register", data)
        if (!response.errors) {
          localStorage.setItem("Auth", true)
        }
        return response
      } catch (e) {
        if (e.response.data.errors) {
          return e.response.data
        }
      }
    },

    async updateUser({ commit }, data) {
      try {
        let response = await axios.put("user", data)
        if (!response.errors) {
          commit("SET_USER", response.data)
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
