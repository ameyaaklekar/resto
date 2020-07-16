<template>
  <div class="preferences-content">
    <b-form @submit.prevent="submit">
      <b-row>
        <b-col md="6">
          <b-form-group id="firstName" label="First Name" label-for="firstName">
            <b-form-input
              id="firstName"
              type="text"
              v-model="form.firstName"
              required
              placeholder="First Name"
            ></b-form-input>
            <b-form-invalid-feedback :state="validate">
              {{ errors.firstName }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group id="lastName" label="Last Name" label-for="lastName">
            <b-form-input
              id="lastName"
              type="text"
              v-model="form.lastName"
              required
              placeholder="First Name"
            ></b-form-input>
            <b-form-invalid-feedback :state="validate">
              {{ errors.lastName }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6">
          <b-form-group
            id="phoneNumber"
            label="Phone Number"
            label-for="phoneNumber"
          >
            <b-input-group prepend="+" class="mb-2">
              <b-form-input
                id="countryCode"
                type="tel"
                v-model="form.countryCode"
                required
                placeholder="Code"
                class="col-md-2"
              ></b-form-input>

              <b-form-input
                id="phoneNumber"
                type="tel"
                v-model="form.phoneNumber"
                required
                placeholder="Phone Number"
              ></b-form-input>
              <b-form-invalid-feedback :state="validate">
                {{ errors.countryCode }}
                {{ errors.phoneNumber }}
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
              required
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
              required
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
              required
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
              required
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
            id="postalAddress"
            label="Postal Address"
            label-for="postalAddress"
          >
            <b-form-input
              id="postalAddress"
              type="text"
              v-model="form.postalAddress"
              required
              placeholder="Postal Address"
            ></b-form-input>
            <b-form-invalid-feedback :state="validate">
              {{ errors.postalAddress }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>

      <b-button type="submit" block variant="primary">Update Details</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "profile",
  components: {
    //
  },

  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        countryCode: "",
        phoneNumber: "",
        email: "", //ameya@gmail.com
        address: "",
        city: "",
        state: "",
        country: "",
        postalCode: ""
      },
      errors: []
    }
  },

  created() {
    this.setData()
  },

  computed: {
    validate() {
      return this.errors.length > 0
    },

    ...mapGetters({
      user: "auth/user"
    })
  },

  methods: {
    setData() {
      console.log(this.user)
      this.form.firstName = this.user.first_name
      this.form.lastName = this.user.last_name
      this.form.countryCode = this.user.country_code
      this.form.phoneNumber = this.user.phone_number
      this.form.email = this.user.email
      this.form.address = this.user.address
      this.form.city = this.user.city
      this.form.state = this.user.state
      this.form.country = this.user.country
      this.form.postalCode = this.user.postal_code
    },

    submit() {
      console.log("here")
    }
  }
}
</script>
