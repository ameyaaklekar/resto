import axios from "axios"

export default {
  namespaced: true,

  state: {
    companySuppliers: null,
    supplier: null
  },
  getters: {
    companySuppliers(state) {
      return state.companySuppliers
    },

    getSupplier(state) {
      return state.supplier
    }
  },
  mutations: {
    SET_SUPPLIERS(state, data) {
      state.companySuppliers = data
    },

    SET_SUPPLIER(state, data) {
      state.supplier = data
    }
  },
  actions: {
    async getCompanySuppliers({ commit }) {
      try {
        let response = await axios.get("suppliers")
        commit("SET_SUPPLIERS", response.data)
        return response.data
      } catch (e) {
        commit("SET_SUPPLIERS", null)
      }
    },

    async updateSupplierStatus(_, data) {
      try {
        let response = await axios.patch("suppliers/change-status", data)
        return response
      } catch (e) {
        return e.response.data
      }
    },

    async getSupplier({ commit }, supplierId) {
      try {
        let response = await axios.get("suppliers/" + supplierId)
        if (!response.error) {
          commit("SET_SUPPLIER", response.data)
          return response.data
        }
      } catch (e) {
        if (e.response.data.errors) {
          commit("SET_SUPPLIER", null)
          return e.response.data
        }
      }
    },

    async updateSupplier(_, data) {
      try {
        let response = await axios.put("suppliers", data)
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
