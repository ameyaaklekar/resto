<template>
  <section class="section">
    <b-container fluid>
      <b-row>
        <SupplierNav />
        <b-col md="9" lg="10">
          <Header/>
          <hr>
          <router-view />
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import Header from "@/components/Header"
import SupplierNav from "@/components/Suppliers/Navigation"

export default {
  name: "suppliers",
  components: {
    Header,
    SupplierNav
  },

  methods: {
    //
  },

  mounted() {
    //
  },

  computed: {
    //
  }
}
</script>