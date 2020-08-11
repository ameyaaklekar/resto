import axios from "axios"

export default {
  namespaced: true,

  state: {
    companySuppliers: null
  },
  getters: {
    companySuppliers(state) {
      return state.companySuppliers
    }
  },
  mutations: {
    SET_SUPPLIERS(state, data) {
      state.companySuppliers = data
    }
  },
  actions: {
    async getCompanySupplier({ commit }, data) {
      try {
        let response = await axios.get("api/suppliers/" + data + "/all")
        commit("SET_SUPPLIERS", response.data)
        return response.data
      } catch (e) {
        commit("SET_SUPPLIERS", null)
      }
    },
  }
}
