<template>
  <b-col md="3" lg="2">
    <b-list-group>
      <b-list-group-item :to="{ name: 'Suppliers' }"
        >Overview</b-list-group-item
      >
      <b-list-group-item
        :to="{ name: 'All Suppliers' }"
        v-if="checkPermissions(user, $getConst('VIEW_SUPPLIER'))"
        >All Suppliers</b-list-group-item
      >
      <b-list-group-item
        :to="{ name: 'Add Supplier' }"
        v-if="checkPermissions(user, $getConst('ADD_SUPPLIER'))"
        >Add Supplier</b-list-group-item
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