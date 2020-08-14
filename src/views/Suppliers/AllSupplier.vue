<template>
  <div class="preferences-content">
    <b-alert
      :show="success.dismissCountDown"
      dismissible
      fade
      variant="success"
      @dismiss-count-down="countDownChanged"
    >
      Supplier's status changed successfully
    </b-alert>
    <b-alert v-model="permissionError.show" fade variant="danger">
      {{ errors.permission }}
    </b-alert>
    <template v-if="suppliers.length > 0">
      <div class="table-responsive">
        <table class="table table-sm">
          <thead class="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Contact Person</th>
              <th scope="col">Email</th>
              <th scope="col">Contact</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="supplier in suppliers" :key="supplier.id">
              <th scope="row">{{ supplier.id }}</th>
              <td>{{ supplier.name }}</td>
              <td>{{ supplier.contact_person }}</td>
              <td>{{ supplier.email }}</td>
              <td>+{{ supplier.country_code }} {{ supplier.contact }}</td>
              <td>
                <b-form-checkbox
                  switch
                  size="lg"
                  :checked="supplier.status == 'A'"
                  @change="updateStatus($event, supplier.id)"
                ></b-form-checkbox>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <b-alert v-else variant="danger" show>No Suppliers Added!</b-alert>
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
      success: {
        dismissSecs: 5,
        dismissCountDown: 0
      },
      permissionError: {
        show: false
      },
      errors: [],
      suppliers: []
    }
  },

  created() {
    this.getCompanySuppliers().then(() => {
      this.setData()
    })
  },

  methods: {
    setData() {
      this.suppliers = this.companySuppliers
    },

    countDownChanged(dismissCountDown) {
      this.success.dismissCountDown = dismissCountDown
    },

    async updateStatus(event, supplierId) {
      let data = []

      if (event === true) {
        data = {
          companyId: this.user.company_id,
          supplierId: supplierId,
          status: "A"
        }
      } else {
        data = {
          companyId: this.user.company_id,
          supplierId: supplierId,
          status: "I"
        }
      }

      let response = await this.updateSupplierStatus(data)

      if (!response.errors) {
        this.success.dismissCountDown = this.success.dismissSecs
        this.permissionError.show = false
      } else {
        this.errors = response.errors

        if (this.errors.permission.length > 0) {
          this.permissionError.show = true
        }
      }
    },

    ...mapActions({
      getCompanySuppliers: "suppliers/getCompanySupplier",
      updateSupplierStatus: "suppliers/updateSupplierStatus"
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
