<template>
  <v-tooltip bottom v-if="user">
    <template v-slot:activator="{ on, attrs }">
      <router-link style="text-decoration: none; color: inherit" to="/profile">
        <v-avatar
          v-bind="attrs"
          v-on="on"
          class="hidden-sm-and-down"
          color="grey darken-1 shrink"
          size="40"
        >
          <img :src="avatar_url + '/images/' + user.avatar " />
        </v-avatar>
      </router-link>
    </template>
    <div>{{ user.firstname }} {{ user.lastname }}</div>
    <div>{{ user.email }}</div>
  </v-tooltip>
  <v-avatar
    v-else
    class="hidden-sm-and-down"
    color="grey darken-1 shrink"
    size="32"
  >
  </v-avatar>
</template>

<script>
export default {
  name: "ProfileAvatar",
  data: () => {
    return {
      avatar_url: process.env.VUE_APP_API_URL + ':' + process.env.VUE_APP_API_PORT
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    credentials() {
      return this.$store.getters.get_credentials;
    },
  },
};
</script>
