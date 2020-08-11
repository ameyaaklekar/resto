<template>
  <b-navbar toggleable="sm" type="dark" variant="dark">
    <b-navbar-brand href="/">NavBar</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <template v-if="authenticated">
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'Dashboard' }">Dashboard</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'Stock' }">Stock</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'Suppliers' }">Suppliers</b-nav-item>
        </b-navbar-nav>
      </template>
      <template v-else>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'Register' }">Register</b-nav-item>
        </b-navbar-nav>
      </template>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto" v-if="authenticated">
        <b-nav-item-dropdown right class="profile-dropdown">
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <b-avatar variant="info" class="profile-dropdown__img"></b-avatar>
            {{ user.company.display_name }}
          </template>
          <b-dropdown-text style="min-width: 240px;">
            <strong>{{ user.first_name }} {{ user.last_name }}</strong>
            <br>
            <i>{{ user.email }}</i>
          </b-dropdown-text>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item :to="{ name: 'Profile' }"
            >Preferences</b-dropdown-item
          >
          <b-dropdown-item href="#" @click.prevent="signOut"
            >Sign Out</b-dropdown-item
          >
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <div class="ml-auto" v-else>
        <b-link
          :to="{ name: 'Sign In' }"
          class="btn btn-outline-success rounded-0"
          >Sign In</b-link
        >
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
