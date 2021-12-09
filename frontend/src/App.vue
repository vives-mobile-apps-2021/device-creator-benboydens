<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-tabs centered class="ml-n9" color="grey darken-1">
        <v-tab to="/"> Home </v-tab>
        <v-tab v-if="is_logged_in" to="/profile"> Profile </v-tab>
        <v-tab to="/devices"> Devices </v-tab>
        <v-tab v-if="is_logged_in" to="/map"> Map </v-tab>
        <v-tab v-if="is_logged_in" to="/scan"> Scan </v-tab>
        <v-tab v-if="!is_logged_in" to="/register">Register</v-tab>
      </v-tabs>
      <v-btn v-if="updateAvailable" @click="update">Update</v-btn>
      <v-btn v-if="is_logged_in" text @click="logout">Logout</v-btn>
      <login-alert v-else />
      <profile-avatar />
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
import ProfileAvatar from "@/components/ProfileAvatar.vue";

export default {
  name: "App",
  components: {
    LoginAlert,
    ProfileAvatar,
  },
  data: () => {
    return {
      registration: null,
      updateAvailable: false,
      isRefreshing: false,
    };
  },
  created() {
    document.addEventListener("swupdatefound", this.updateTheApp, {
      once: true,
    });

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.isRefreshing) return;
      this.isRefreshing = true;
      window.location.reload();
    });
  },
  methods: {
    updateTheApp(e) {
      this.registration = e.detail;
      this.updateAvailable = true;
    },
    update() {
      this.updateAvailable = false;
      if (this.registration || this.registration.waiting) {
        this.registration.waiting.postMessage({ type: "SKIP_WAITING" });
      }
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