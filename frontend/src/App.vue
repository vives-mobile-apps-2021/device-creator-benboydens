<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-tabs centered class="ml-n9" color="grey darken-1">
        <v-tab to="/"> Home </v-tab>
          <v-tab to="/devices"> Devices </v-tab>
          <v-tab v-if="is_logged_in" to="/map"> Map </v-tab>
          <v-tab v-if="is_logged_in" to="/scan"> Scan </v-tab>
          <v-tab v-if="!is_logged_in" to="/register">Register</v-tab>
      </v-tabs>

      <v-btn v-if="is_logged_in" text @click="logout">Logout</v-btn>
      <login-alert v-else />
      <v-avatar
        class="hidden-sm-and-down"
        color="grey darken-1 shrink"
        size="32"
      ><span class="white--text">CJ</span></v-avatar>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import LoginAlert from "@/components/LoginAlert.vue";

export default {
  name: "App",
  components: {
    LoginAlert,
  },
  methods: {
    logout() {
      console.log("LOGOUT");
      this.$store.dispatch("logout");
    },
  },
  computed: {
    is_logged_in() {
      return this.$store.state.user;
    },
  },
};
</script>