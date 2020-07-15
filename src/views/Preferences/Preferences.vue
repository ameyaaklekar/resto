<template>
  <section class="section">
    <Header/>
    <hr>
    <b-container>
      <b-row no-gutters>
        <PreferencesNav/>
        <b-col md="9">
          <router-view/>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import Header from "@/components/Preferences/Header"
import PreferencesNav from "@/components/Preferences/Navigation"

export default {
  name: "profile",
  components: {
    Header,
    PreferencesNav
  }
}
</script>
