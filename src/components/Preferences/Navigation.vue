<template>
  <b-col md="2">
    <b-nav vertical>
      <b-nav-item :to="{ name: 'Profile' }">Profile</b-nav-item>
      <b-nav-item :to="{ name: 'CompanyProfile' }">Company Details</b-nav-item>
      <b-nav-item :to="{ name: 'CreateUser' }">Create Employee</b-nav-item>
      <b-nav-item :to="{ name: 'Users' }">Employees</b-nav-item>
    </b-nav>
  </b-col>
</template>

<script>
export default {
  //
}
</script>