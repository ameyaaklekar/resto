<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="/">NavBar</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <template v-if="authenticated">
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'Dashboard' }">Dashboard</b-nav-item>
        </b-navbar-nav>
      </template>
      <template v-else>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'Register' }">Register</b-nav-item>
        </b-navbar-nav>
      </template>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto" v-if="user && authenticated">
        <b-nav-item-dropdown right class="profile-dropdown">
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <b-avatar variant="info" class="profile-dropdown__img"></b-avatar> {{ user.name }}
          </template>
          <b-dropdown-item :to="{ name: 'Profile' }">Profile</b-dropdown-item>
          <b-dropdown-item href="#" @click.prevent="signOut">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <div class="ml-auto" v-else>
        <b-link :to="{ name: 'SignIn' }" class="btn btn-outline-success">Sign In</b-link>
      </div>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user"
    })
  },

  methods: {
    ...mapActions({
      signOutAction: "auth/signOut"
    }),

    signOut() {
      this.signOutAction().then(() => {
        this.$router.replace({
          name: "Home"
        })
      })
    }
  }
}
</script>
