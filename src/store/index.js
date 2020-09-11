import Vue from "vue"
import Vuex from "vuex"
import auth from "./auth"
import employee from "./employee"
import suppliers from "./suppliers"
import company from "./company"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    employee,
    suppliers,
    company
  }
})
