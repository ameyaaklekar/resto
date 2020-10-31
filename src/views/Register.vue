<template>
  <section class="section">
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-md-5">
          <h1 class="text-center">Register</h1>
          <b-alert v-model="error.show" fade variant="danger">
            {{ error.message }}
          </b-alert>
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
              <b-form-invalid-feedback :state="validate">
                {{ error.data.company }}
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
              <b-form-invalid-feedback :state="validate">
                {{ error.data.firstName }}
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
              <b-form-invalid-feedback :state="validate">
                {{ error.data.lastName }}
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

                <b-form-input
                  id="phoneNumber"
                  type="tel"
                  v-model="form.phoneNumber"
                  required
                  placeholder="Phone Number"
                ></b-form-input>
                <b-form-invalid-feedback :state="validate">
                  {{ error.data.countryCode }}
                  {{ error.data.phoneNumber }}
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
              <b-form-invalid-feedback :state="validate">
                {{ error.data.email }}
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
              <b-form-invalid-feedback :state="validate">
                {{ error.data.password }}
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
              <b-form-invalid-feedback :state="validate">
                {{ error.data.password_confirmation }}
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group id="recaptcha">
              <vue-recaptcha
                ref="recaptcha"
                @verify="onVerify"
                sitekey="6LfreLQZAAAAAI7rloxhlVtP5j3fN_vKaP76ymSQ"
                :loadRecaptchaScript="true"
              >
              </vue-recaptcha>
              <b-form-invalid-feedback :state="validate">
                {{ error.data.recaptcha }}
              </b-form-invalid-feedback>
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
import VueRecaptcha from "vue-recaptcha"

export default {
  name: "register",
  components: {
    VueRecaptcha
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
        password_confirmation: "",
        robot: false
      },
      error: {
        message: "",
        data: [],
        show: false
      }
    }
  },

  computed: {
    validate() {
      return this.error.data.length > 0
    }
  },

  methods: {
    ...mapActions({
      register: "auth/register",
      getUser: "auth/getUser"
    }),

    submit() {
      if (this.form.robot) {
        this.register(this.form).then(response => {
          if (!response.errors) {
            this.error.data = []
            this.error.message = ""
            this.error.show = false
            this.getUser().then(() => {
              this.$router.replace({
                name: "Dashboard"
              })
            })
          } else {
            let errors = response.errors
            let errorArr = []
            for (let i = 0; i < errors.length; i++) {
              let key = errors[i].path[0]
              errorArr[key] = errors[i].message
            }
            this.error.data = errorArr
            this.error.message = response.message
            this.error.show = true
          }
        })
      } else {
        this.error.data = {
          recaptcha: "Please verify the recaptcha"
        }
      }
    },

    onVerify(response) {
      if (response) this.form.robot = response
    }
  }
}
</script>
