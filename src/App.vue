<template>
  <div id="app">
    <button @click.prevent="login">Login</button>
  </div>
</template>

<script>
import axios from "axios"

export default {
  methods: {
    async login() {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie")

      await axios.post("http://localhost:8000/login", {
        email: "ameya@gmail.com",
        password: "Ameya1993"
      })

      let response = await axios.get("http://localhost:8000/api/user")

      console.log(response.data)
    }
  }
}
</script>
