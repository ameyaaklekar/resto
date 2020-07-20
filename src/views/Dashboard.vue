<template>
  <div>
    Dashboard
    <div v-if="user">{{ user.name }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "dashboard",
  components: {
    //
  },

  methods: {
    //
  },

  mounted() {
    //
  },

  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user"
    })
  }
}
</script>
