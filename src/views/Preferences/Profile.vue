<template>
  <div class="preferences-content">
    <h3 class="d-block d-sm-none">Profile</h3>
    <template v-if="checkPermissions(user, $getConst('UPDATE_PROFILE'))">
      <b-alert
        :show="success.dismissCountDown"
        dismissible
        fade
        variant="success"
        @dismiss-count-down="countDownChanged"
      >
        Profile updated successfully
      </b-alert>
      <b-form @submit.prevent="submit">
        <b-row>
          <b-col md="6">
            <b-form-group
              id="firstName"
              label="First Name"
              label-for="firstName"
            >
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
                  class="col-2"
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
              id="postalCode"
              label="Postal Address"
              label-for="postalCode"
            >
              <b-form-input
                id="postalCode"
                type="text"
                v-model="form.postalCode"
                required
                placeholder="Postal Address"
              ></b-form-input>
              <b-form-invalid-feedback :state="validate">
                {{ errors.postalCode }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-button type="submit" block variant="primary"
          >Update Details</b-button
        >
      </b-form>
    </template>
    <template v-else-if="user">
      <p>
        <strong>
          *Note: Please contact your manager to update your details
        </strong>
      </p>
      <p><strong>Name:</strong> {{ user.first_name }} {{ user.last_name }}</p>
      <p>
        <strong>Phone Number:</strong> +{{ user.country_code }}
        {{ user.phone_number }}
      </p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Address:</strong> {{ user.address }}</p>
      <p><strong>City:</strong> {{ user.city }}</p>
      <p><strong>State:</strong> {{ user.state }}</p>
      <p><strong>Country:</strong> {{ user.country }}</p>
      <p><strong>Postal Code:</strong> {{ user.postal_code }}</p>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

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
        postalCode: "",
        companyId: "",
        userId: ""
      },
      success: {
        dismissSecs: 5,
        dismissCountDown: 0
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
      if (this.user) {
        this.form = this.user
      }
    },

    ...mapActions({
      updateUser: "auth/updateUser"
    }),

    submit() {
      this.updateUser(this.form).then(response => {
        if (!response.errors) {
          this.success.dismissCountDown = this.success.dismissSecs
        } else {
          this.errors = response.errors
        }
      })
    },

    countDownChanged(dismissCountDown) {
      this.success.dismissCountDown = dismissCountDown
    }
  }
}
</script>
