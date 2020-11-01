import axios from "axios"

export default {
  namespaced: true,

  state: {
    employees: null
  },
  getters: {
    employees(state) {
      return state.employees
    }
  },
  mutations: {
    SET_EMPLOYEES(state, data) {
      state.employees = data
    }
  },
  actions: {
    async getEmployees({ commit }) {
      try {
        let response = await axios.get("employee")
        commit("SET_EMPLOYEES", response.data.data)
        return response.data.data
      } catch (e) {
        commit("SET_EMPLOYEES", null)
      }
    }
  }
}
