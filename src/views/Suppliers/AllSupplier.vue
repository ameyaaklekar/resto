<template>
  <div class="preferences-content">
    <template v-if="suppliers">
      <b-list-group>
        <b-list-group-item
          href="#"
          class="flex-column align-items-start"
          v-for="supplier in suppliers"
          :key="supplier.id"
        >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ supplier.name }}</h5>
            <b-form-checkbox
              switch
              size="lg"
              :checked="supplier.status == 'A'"
            ></b-form-checkbox>
          </div>
          <p class="mb-1">{{ supplier.contact_person }}</p>

          <small
            >{{ supplier.email }}, +{{ supplier.country_code }}
            {{ supplier.contact }}</small
          >
        </b-list-group-item>
      </b-list-group>
    </template>
    <h1 v-else>No Suppliers Added!</h1>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  name: "allSuppliers",
  components: {
    //
  },

  data() {
    return {
      form: {
        name: "",
        countryCode: "",
        contact: "",
        email: "", //ameya@gmail.com
        address: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        companyId: "",
      },
      success: {
        dismissSecs: 5,
        dismissCountDown: 0
      },
      errors: [],
      suppliers: []
    }
  },

  created() {
    this.getCompanySuppliers(this.user.company_id).then(() => {
      this.setData()
    })
  },

  methods: {
    setData() {
      this.suppliers = this.companySuppliers
    },

    ...mapActions({
      getCompanySuppliers: "suppliers/getCompanySupplier"
    })
  },

  mounted() {
    //
  },

  computed: {
    ...mapGetters({
      companySuppliers: "suppliers/companySuppliers",
      authenticated: "auth/authenticated",
      user: "auth/user"
    })
  }
}
</script>