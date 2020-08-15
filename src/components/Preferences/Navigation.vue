<template>
  <b-col md="3" lg="2">
    <b-list-group>
      <b-list-group-item :to="{ name: 'Profile' }">Profile</b-list-group-item>
      <b-list-group-item :to="{ name: 'Company Profile' }"
        >Company Details</b-list-group-item
      >
      <b-list-group-item
        :to="{ name: 'Create Employee' }"
        v-if="checkPermissions(user, $getConst('ADD_EMPLOYEE'))"
        >Create Employee</b-list-group-item
      >
      <b-list-group-item :to="{ name: 'Employees' }"
        >Employees</b-list-group-item
      >
    </b-list-group>
  </b-col>
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