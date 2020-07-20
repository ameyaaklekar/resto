<template>
  <b-col md="3">
    <b-list-group>
      <b-list-group-item :to="{ name: 'Profile' }">Profile</b-list-group-item>
      <b-list-group-item :to="{ name: 'CompanyProfile' }"
        >Company Details</b-list-group-item
      >
      <b-list-group-item :to="{ name: 'CreateUser' }"
        >Create Employee</b-list-group-item
      >
      <b-list-group-item :to="{ name: 'Users' }">Employees</b-list-group-item>
    </b-list-group>
  </b-col>
</template>

<script>
export default {
  //
}
</script>