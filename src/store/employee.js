import axios from "axios"

export default {
  namespaced: true,

  state: {
    allRoles: null
  },
  getters: {
    allRoles(state) {
      return state.allRoles
    }
  },
  mutations: {
    SET_ROLES(state, data) {
      state.allRoles = data
    }
  },
  actions: {
    async getAllRoles({ commit }) {
      try {
        let response = await axios.get("api/roles")
        commit("SET_ROLES", response.data)
        return response.data
      } catch (e) {
        commit("SET_ROLES", null)
      }
    },

    async getRolePermission(_, data) {
      try {
        let response = await axios.get("api/roles/permission", {
          params: {
            role: data
          }
        })

        if (!response.error) {
          return response.data
        }
      } catch (e) {
        if (e.response.data.errors) {
          return e.response.data
        }
      }
    },

    async getAllPermissions() {
      try {
        let response = await axios.get("api/permissions")
        if (!response.errors) {
          return response.data
        }
      } catch (e) {
        if (e.response.data.errors) {
          return e.response.data
        }
      }
    }
  }
}
