import Vue from "vue"
import { BootstrapVue, IconsPlugin } from "bootstrap-vue"

import App from "./App.vue"
import router from "./router"
import store from "./store"
import axios from "axios"

if (process.env.VUE_APP_PRODUCTION_MODE) {
  axios.defaults.baseURL = process.env.VUE_APP_LIVE_API
} else {
  axios.defaults.baseURL = "http://localhost:8000"
}

import "./assets/scss/main.scss"

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

axios.defaults.withCredentials = true

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
