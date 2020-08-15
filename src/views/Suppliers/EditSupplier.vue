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
        Supplier Updated successfully
      </b-alert>
      <b-alert v-model="permissionError.show" fade variant="danger">
        {{ errors.permission }}
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
                {{ errors.name }}
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
                {{ errors.contactPerson }}
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
                  {{ errors.countryCode }}
                  {{ errors.contact }}
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
                {{ errors.email }}
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
                {{ errors.address }}
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
                {{ errors.city }}
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
                {{ errors.state }}
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
                {{ errors.country }}
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
                {{ errors.postalCode }}
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
  name: "addSupplier",
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
      return this.errors.length > 0
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
        dismissCountDown: 0
      },
      permissionError: {
        show: false
      },
      errors: []
    }
  },

  methods: {
    ...mapActions({
      getSupplier: "suppliers/getSupplier",
      updateSupplier: "suppliers/updateSupplier"
    }),

    setData() {
      this.form.name = this.supplier.name
      this.form.countryCode = this.supplier.country_code
      this.form.contact = this.supplier.contact
      this.form.email = this.supplier.email
      this.form.address = this.supplier.address
      this.form.city = this.supplier.city
      this.form.state = this.supplier.state
      this.form.country = this.supplier.country
      this.form.postalCode = this.supplier.postal_code
      this.form.contactPerson = this.supplier.contact_person
      this.form.supplierId = this.supplier.id
    },

    countDownChanged(dismissCountDown) {
      this.success.dismissCountDown = dismissCountDown
      this.permissionError.dismissCountDown = dismissCountDown
    },

    async submit() {
      try {
        let response = this.updateSupplier(this.form).then(() => {
          if (!response.errors) {
            this.getSupplier(this.supplierId).then(() => {
              this.setData()

              this.success.dismissCountDown = this.success.dismissSecs
              this.permissionError.show = false
            })
          }
        })
      } catch (e) {
        if (e.response.data.errors) {
          this.errors = e.response.data.errors

          if (this.errors.permission.length > 0) {
            this.permissionError.show = true
          }
        }
      }
    }
  },

  mounted() {
    //
  }
}
</script>