<template>
  <v-app id="inspire">
    <v-app-bar app dark>
      <v-tabs centered class="ml-n9">
        <v-tab to="/"> Home </v-tab>
        <v-tab v-if="is_logged_in" to="/profile"> Profile </v-tab>
        <v-tab to="/devices"> Devices </v-tab>
        <v-tab v-if="is_logged_in" to="/scan"> Scan </v-tab>
        <v-tab v-if="!is_logged_in" to="/register">Register</v-tab>
      </v-tabs>

      <v-btn v-if="is_logged_in" text @click="logout">Logout</v-btn>
      <v-btn v-else text @click="show_login">Login</v-btn>
      <login-alert />
      <profile-avatar />
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer padless dark>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import LoginAlert from "@/components/LoginAlert.vue";
import ProfileAvatar from "@/components/ProfileAvatar.vue";

export default {
  name: "App",
  components: {
    LoginAlert,
    ProfileAvatar,
  },
  data: () => {
    return {
      login_dialog: false
    }
  },
  methods: {
    show_login() {
      this.$store.commit("set_show_login", true)
    },
    logout() {
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