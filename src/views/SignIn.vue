<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <form @submit.prevent="submit">
          <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="form.email">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" v-model="form.password">
          </div>
          <button type="submit" class="btn btn-primary">Sign In</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "signin",
  components: {
    //
  },

  data () {
    return {
      form: {
        email: '', //ameya@gmail.com
        password: '',
      }
    }
  },

  methods: {
    ...mapActions({
      signIn: 'auth/signIn'
    }),

    submit() {
      this.signIn(this.form)
    }
  }
};
</script>
