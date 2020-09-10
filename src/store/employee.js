import axios from "axios"

export default {
  namespaced: true,

  state: {
    allRoles: null,
    companyEmployees: null
  },
  getters: {
    allRoles(state) {
      return state.allRoles
    },

    companyEmployees(state) {
      return state.companyEmployees
    }
  },
  mutations: {
    SET_ROLES(state, data) {
      state.allRoles = data
    },
    SET_EMPLOYEES(state, data) {
      state.companyEmployees = data
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
        let response = await axios.get("api/roles/permission/" + data)

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
    },

    async getAllCompanyEmployees({ commit }) {
      try {
        let response = await axios.get("api/employee/all")
        commit("SET_EMPLOYEES", response.data)
        return response.data
      } catch (e) {
        commit("SET_EMPLOYEES", null)
      }
    },

    async getEmployee({ commit }, employeeId) {
      try {
        let response = await axios.get("api/employee/" + employeeId + "/edit")
        if (!response.error) {
          commit("SET_EMPLOYEES", response.data)
          return response.data
        }
      } catch (e) {
        if (e.response.data.errors) {
          commit("SET_EMPLOYEES", null)
          return e.response.data
        }
      }
    },

    async updateEmployee(_, data) {
      try {
        let response = await axios.put("api/employee/update", data)
        if (!response.error) {
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
