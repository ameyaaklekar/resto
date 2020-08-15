import Vue from "vue"
import Vuex from "vuex"
import auth from "./auth"
import employee from "./employee"
import suppliers from "./suppliers"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    employee,
    suppliers
  }
})
