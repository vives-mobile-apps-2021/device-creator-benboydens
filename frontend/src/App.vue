<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-tabs centered class="ml-n9" color="grey darken-1">
        <v-tab to="/"> Home </v-tab>
        <v-tab to="/devices"> Devices </v-tab>
        <v-tab to="/map"> Map </v-tab>
        <v-tab to="/scan"> Scan </v-tab>
      </v-tabs>

      <login-alert />
      
      <v-avatar
        class="hidden-sm-and-down"
        color="grey darken-1 shrink"
        size="32"
      ></v-avatar>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import LoginAlert from "@/components/loginAlert.vue";

export default {
  name: "App",
  components: {
    LoginAlert,
  },
};
</script>