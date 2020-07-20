import Vue from "vue"
import { BootstrapVue, IconsPlugin } from "bootstrap-vue"

import App from "./App.vue"
import router from "./router"
import store from "./store"
import axios from "axios"
import permissionConstants from "./constants/permissions"

if (process.env.VUE_APP_PRODUCTION_MODE === "true") {
  axios.defaults.baseURL = process.env.VUE_APP_LIVE_API
} else {
  axios.defaults.baseURL = "http://localhost:8000"
}

import "./assets/scss/main.scss"

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(permissionConstants)

axios.defaults.withCredentials = true

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    checkPermissions(user, permission) {
      if (user.permissions.length > 0) {
        var hasPermisisons = user.permissions.filter(function(el) {
          return el.name == permission
        })

        return hasPermisisons.length > 0 ? true : false
      }
    }
  }
})

store.dispatch("auth/getUser").then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app")
})