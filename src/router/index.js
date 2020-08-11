import Vue from "vue"
import VueRouter from "vue-router"
import store from "@/store"
import Home from "../views/Home.vue"
import Register from "../views/Register.vue"
import SignIn from "../views/SignIn.vue"
import Dashboard from "../views/Dashboard.vue"
import Preferences from "../views/Preferences/Preferences.vue"
import Profile from "../views/Preferences/Profile.vue"
import CompanyProfile from "../views/Preferences/CompanyProfile.vue"
import CreateUser from "../views/Preferences/CreateUser.vue"
import AllUser from "../views/Preferences/AllUser.vue"
import Suppliers from "../views/Suppliers/Suppliers.vue"
import AddSupplier from "../views/Suppliers/AddSupplier.vue"
import AllSupplier from "../views/Suppliers/AllSupplier.vue"
import Stock from "../views/Stock.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { guestOnly: true }
  },
  {
    path: "/sign-in",
    name: "Sign In",
    component: SignIn,
    meta: { guestOnly: true }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: "/suppliers",
    name: "Suppliers",
    component: Suppliers,
    meta: { requiresAuth: true },
    children: [
      {
        path: "all",
        name: "All Suppliers",
        component: AllSupplier,
        meta: { requiresAuth: true }
      },
      {
        path: "add",
        name: "Add Supplier",
        component: AddSupplier,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: "/stock",
    name: "Stock",
    component: Stock,
    meta: { requiresAuth: true }
  },
  {
    path: "/preferences",
    name: "Preferences",
    component: Preferences,
    meta: { requiresAuth: true },
    children: [
      {
        path: "profile",
        name: "Profile",
        component: Profile,
        meta: { requiresAuth: true }
      },
      {
        path: "company-profile",
        name: "Company Profile",
        component: CompanyProfile,
        meta: { requiresAuth: true }
      },
      {
        path: "create-employee",
        name: "Create Employee",
        component: CreateUser,
        meta: { requiresAuth: true }
      },
      {
        path: "employees",
        name: "Employees",
        component: AllUser,
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  linkExactActiveClass: "active",
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters["auth/authenticated"]) {
      next({
        path: "/sign-in",
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guestOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters["auth/authenticated"]) {
      next({
        path: "/dashboard",
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
