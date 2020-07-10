<template>
  <div>
    Dashboard
    <div v-if="user">{{ user.name }}</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

export default {
  name: "dashboard",
  components: {
    //
  },

  methods: {
    ...mapActions({
      getUser: "auth/getUser"
    })
  },

  mounted() {
    this.getUser()
      .then(() => {
        if (!this.user) {
          this.$router.replace({
            name: "SignIn"
          })
        }
        
      })
      .catch(() => {
        console.log("Failed to get user")
      })
  },

  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user"
    })
  }
}
</script>
