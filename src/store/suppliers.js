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
    async getCompanySupplier({ commit }) {
      try {
        let response = await axios.get("api/suppliers/all")
        commit("SET_SUPPLIERS", response.data)
        return response.data
      } catch (e) {
        commit("SET_SUPPLIERS", null)
      }
    },

    async updateSupplierStatus(_, data) {
      try {
        let response = await axios.put(
          "api/suppliers/update/change-status",
          data
        )
        return response
      } catch (e) {
        return e.response.data
      }
    }
  }
}
