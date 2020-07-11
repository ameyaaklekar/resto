<template>
  <section class="section">
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-md-5">
          <h1 class="text-center">Register</h1>
          <b-form @submit.prevent="submit">
            <b-form-group
              id="companyName"
              label="Company Name"
              label-for="companyName"
            >
              <b-form-input
                id="companyName"
                type="text"
                v-model="form.company.name"
                required
                placeholder="Company Name"
              ></b-form-input>
              <b-form-invalid-feedback v-if="errors.companyName">
                {{ errors.companyName[0] }}
              </b-form-invalid-feedback>
            </b-form-group>

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
              <b-form-invalid-feedback v-if="errors.firstName">
                {{ errors.firstName[0] }}
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id="lastName" label="Last Name" label-for="lastName">
              <b-form-input
                id="lastName"
                type="text"
                v-model="form.lastName"
                required
                placeholder="First Name"
              ></b-form-input>
              <b-form-invalid-feedback v-if="errors.lastName">
                {{ errors.lastName[0] }}
              </b-form-invalid-feedback>
            </b-form-group>

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
                <b-form-invalid-feedback v-if="errors.countryCode">
                  {{ errors.countryCode[0] }}
                </b-form-invalid-feedback>

                <b-form-input
                  id="phoneNumber"
                  type="tel"
                  v-model="form.phoneNumber"
                  required
                  placeholder="Phone Number"
                ></b-form-input>
                <b-form-invalid-feedback v-if="errors.phoneNumber">
                  {{ errors.phoneNumber[0] }}
                </b-form-invalid-feedback>
              </b-input-group>
            </b-form-group>

            <b-form-group id="email" label="Email" label-for="email">
              <b-form-input
                id="email"
                type="email"
                v-model="form.email"
                required
                placeholder="Email"
              ></b-form-input>
              <b-form-invalid-feedback v-if="errors.email">
                {{ errors.email[0] }}
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id="password" label="Password" label-for="password">
              <b-form-input
                id="password"
                type="password"
                v-model="form.password"
                required
                placeholder="Password"
              ></b-form-input>
              <b-form-invalid-feedback v-if="errors.password">
                {{ errors.password[0] }}
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              id="password_confirmation"
              label="Confirm Password"
              label-for="password_confirmation"
            >
              <b-form-input
                id="password_confirmation"
                type="password"
                v-model="form.password_confirmation"
                required
                placeholder="Confirm Password"
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" block variant="primary">Register</b-button>
          </b-form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex"

export default {
  name: "register",
  components: {
    //
  },

  data() {
    return {
      form: {
        company: {
          name: ""
        },
        firstName: "",
        lastName: "",
        countryCode: "",
        phoneNumber: "",
        email: "", //ameya@gmail.com
        password: "",
        password_confirmation: ""
      },
      errors: []
    }
  },

  methods: {
    ...mapActions({
      register: "auth/register"
    }),

    submit() {
      this.register(this.form).then(response => {
        if (!response.errors) {
          this.$router.replace({
            name: "Dashboard"
          })
        } else {
          this.errors = response.errors
        }
      })
    }
  }
}
</script>
