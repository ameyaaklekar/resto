<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{
              name: 'Home'
            }"
          >
            Home
          </router-link>
        </li>
        <template v-if="authenticated">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{
                name: 'Dashboard'
              }"
            >
              Dashboard
            </router-link>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              Sign Out
            </a>
          </li>
        </template>
        <template v-else>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{
                name: 'Register'
              }"
            >
              Register
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{
                name: 'SignIn'
              }"
            >
              Sign In
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user"
    })
  }
}
</script>
