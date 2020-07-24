<template>
  <b-col md="3">
    <b-list-group>
      <b-list-group-item :to="{ name: 'Profile' }">Profile</b-list-group-item>
      <b-list-group-item :to="{ name: 'CompanyProfile' }"
        >Company Details</b-list-group-item
      >
      <b-list-group-item
        :to="{ name: 'CreateUser' }"
        v-if="checkPermissions(user, $getConst('ADD_EMPLOYEE'))"
        >Create Employee</b-list-group-item
      >
      <b-list-group-item :to="{ name: 'Users' }">Employees</b-list-group-item>
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