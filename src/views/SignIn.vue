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
                placeholder="Email"
                required
                class="rounded-0"
              ></b-form-input>
              <b-form-invalid-feedback :state="validate">
                {{ errors.email }}
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id="password" label="Password" label-for="password">
              <b-form-input
                type="password"
                id="password"
                v-model="form.password"
                placeholder="Password"
                required
                class="rounded-0"
              ></b-form-input>
              <b-form-invalid-feedback :state="validate">
                {{ errors.password }}
              </b-form-invalid-feedback>
            </b-form-group>
            <b-button type="submit" block variant="primary" squared>Sign In</b-button>
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

  computed: {
    validate() {
      return this.errors.length > 0
    }
  },

  methods: {
    ...mapActions({
      signIn: "auth/signIn"
    }),

    submit() {
      this.signIn(this.form).then(response => {
        console.log()
        if (!response.errors) {
          if (this.$route.query.redirect) {
            this.$router.push(this.$route.query.redirect)
          } else {
            this.$router.push({
              name: "Dashboard"
            })
          }
        } else {
          this.errors = response.errors
        }
      })
    }
  }
}
</script>
