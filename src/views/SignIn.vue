<template>
  <section class="section">
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-md-4">
          <h1 class="text-center">Sign In</h1>
          <b-form @submit.prevent="submit">
            <b-form-group id="email" label="Email" label-for="email">
              <b-form-input
                type="email"
                id="email"
                aria-describedby="emailHelp"
                v-model="form.email"
                required
                placeholder="Email"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="password" label="Password" label-for="password">
              <b-form-input
                type="password"
                id="password"
                v-model="form.password"
                required
                placeholder="Password"
              ></b-form-input>
              <b-form-invalid-feedback v-if="errors.email">
                {{ errors.email[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
            <b-button type="submit" block variant="primary">Sign In</b-button>
          </b-form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex"

export default {
  name: "signin",
  components: {
    //
  },

  data() {
    return {
      form: {
        email: "", //ameya@gmail.com
        password: ""
      },
      errors: []
    }
  },

  methods: {
    ...mapActions({
      signIn: "auth/signIn"
    }),

    submit() {
      this.signIn(this.form).then(response => {
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
