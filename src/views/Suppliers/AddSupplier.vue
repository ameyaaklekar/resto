<template>
  <div class="preferences-content">
    <template v-if="checkPermissions(user, $getConst('ADD_SUPPLIER'))">
      <b-alert
        :show="success.dismissCountDown"
        dismissible
        fade
        variant="success"
        @dismiss-count-down="countDownChanged"
      >
        Supplier Added successfully
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
              >Add Supplier</b-button
            >
          </b-col>
        </b-row>
      </b-form>
    </template>
    <b-alert v-else variant="danger" show>User is not Authorized!</b-alert>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import axios from "axios"

export default {
  name: "addSupplier",
  components: {
    //
  },

  created() {
    this.setData()
  },

  computed: {
    validate() {
      return this.errors.length > 0
    },

    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
      roles: "employee/allRoles"
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
        contactPerson: ""
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
    setData() {
      this.form.companyId = this.user.company_id
    },

    countDownChanged(dismissCountDown) {
      this.success.dismissCountDown = dismissCountDown
      this.permissionError.dismissCountDown = dismissCountDown
    },

    async submit() {
      try {
        let response = await axios.post("suppliers/add", this.form)
        if (!response.errors) {
          this.form.name = ""
          this.form.countryCode = ""
          this.form.contact = ""
          this.form.email = "" //ameya@gmail.com
          this.form.address = ""
          this.form.city = ""
          this.form.state = ""
          this.form.country = ""
          this.form.postalCode = ""
          this.form.companyId = ""
          this.form.contactPerson = ""
          this.errors = []

          this.success.dismissCountDown = this.success.dismissSecs
          this.permissionError.show = false
        }
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