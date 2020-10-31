<template>
  <div class="preferences-content">
    <template>
      <b-alert
        :show="success.dismissCountDown"
        dismissible
        fade
        variant="success"
        @dismiss-count-down="countDownChanged"
      >
        {{ success.message }}
      </b-alert>
      <b-alert v-model="error.show" fade variant="danger">
        {{ error.message }}
      </b-alert>
      <b-form @submit.prevent="submit">
        <b-row>
          <b-col md="6">
            <b-form-group label="Name" label-for="name">
              <b-form-input
                id="name"
                type="text"
                v-model="form.name"
                required
                placeholder="First Name"
                disabled
              ></b-form-input>
              <b-form-invalid-feedback :state="validate">
                {{ error.data.name }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group label="Contact Person" label-for="contactPerson">
              <b-form-input
                id="contactPerson"
                type="text"
                v-model="form.contactPerson"
                placeholder="Contact Person"
              ></b-form-input>
              <b-form-invalid-feedback :state="validate">
                {{ error.data.contactPerson }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6">
            <b-form-group id="contact" label="Phone Number" label-for="contact">
              <b-input-group prepend="+" class="mb-2">
                <b-form-input
                  id="countryCode"
                  type="tel"
                  v-model="form.countryCode"
                  required
                  placeholder="Code"
                  class="col-2"
                ></b-form-input>

                <b-form-input
                  id="contact"
                  type="tel"
                  v-model="form.contact"
                  required
                  placeholder="Phone Number"
                ></b-form-input>
                <b-form-invalid-feedback :state="validate">
                  {{ error.data.countryCode }}
                  {{ error.data.contact }}
                </b-form-invalid-feedback>
              </b-input-group>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group id="email" label="Email" label-for="email">
              <b-form-input
                id="email"
                type="email"
                v-model="form.email"
                required
                placeholder="Email"
              ></b-form-input>
              <b-form-invalid-feedback :state="validate">
                {{ error.data.email }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6">
            <b-form-group id="address" label="Address" label-for="address">
              <b-form-input
                id="address"
                type="text"
                v-model="form.address"
                placeholder="Address"
              ></b-form-input>
              <b-form-invalid-feedback :state="validate">
                {{ error.data.address }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group id="city" label="City" label-for="city">
              <b-form-input
                id="city"
                type="text"
                v-model="form.city"
                placeholder="City"
              ></b-form-input>
              <b-form-invalid-feedback :state="validate">
                {{ error.data.city }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6">
            <b-form-group id="state" label="State" label-for="state">
              <b-form-input
                id="state"
                type="text"
                v-model="form.state"
                placeholder="State"
              ></b-form-input>
              <b-form-invalid-feedback :state="validate">
                {{ error.data.state }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group id="country" label="Country" label-for="country">
              <b-form-input
                id="country"
                type="text"
                v-model="form.country"
                placeholder="Country"
              ></b-form-input>
              <b-form-invalid-feedback :state="validate">
                {{ error.data.country }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6">
            <b-form-group
              id="postalCode"
              label="Postal Address"
              label-for="postalCode"
            >
              <b-form-input
                id="postalCode"
                type="text"
                v-model="form.postalCode"
                placeholder="Postal Address"
              ></b-form-input>
              <b-form-invalid-feedback :state="validate">
                {{ error.data.postalCode }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <b-button type="submit" block variant="primary"
              >Update Supplier</b-button
            >
          </b-col>
        </b-row>
      </b-form>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
// import axios from "axios"

export default {
  name: "editSupplier",
  components: {
    //
  },

  props: ["supplierId"],

  created() {
    this.getSupplier(this.supplierId).then(() => {
      this.setData()
    })
  },

  computed: {
    validate() {
      return this.error.data.length > 0
    },

    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
      roles: "employee/allRoles",
      supplier: "suppliers/getSupplier"
    })
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
        contactPerson: "",
        supplierId: ""
      },
      success: {
        dismissSecs: 5,
        dismissCountDown: 0,
        message: ""
      },
      error: {
        message: "",
        data: [],
        show: false
      }
    }
  },

  methods: {
    ...mapActions({
      getSupplier: "suppliers/getSupplier",
      updateSupplier: "suppliers/updateSupplier"
    }),

    setData() {
      this.form.name = this.supplier.data.name
      this.form.countryCode = this.supplier.data.country_code
      this.form.contact = this.supplier.data.contact
      this.form.email = this.supplier.data.email
      this.form.address = this.supplier.data.address
      this.form.city = this.supplier.data.city
      this.form.state = this.supplier.data.state
      this.form.country = this.supplier.data.country
      this.form.postalCode = this.supplier.data.postal_code
      this.form.contactPerson = this.supplier.data.contact_person
      this.form.supplierId = this.supplier.data.id
    },

    countDownChanged(dismissCountDown) {
      this.success.dismissCountDown = dismissCountDown
    },

    async submit() {
      let response = await this.updateSupplier(this.form)
      if (response.success) {
        this.getSupplier(this.supplierId).then(() => {
          this.setData()
          this.success.dismissCountDown = this.success.dismissSecs
          this.success.message = response.message
          this.error.show = false
        })
      } else {
        if (!response.success) {
          this.error.data = response.data.errors
          this.error.show = true
          this.error.message = response.data.message
        }
      }
    }
  },

  mounted() {
    //
  }
}
</script>