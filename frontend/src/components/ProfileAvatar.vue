<template>
  <v-tooltip bottom v-if="user">
    <template v-slot:activator="{ on, attrs }">
      <v-avatar
        v-bind="attrs"
        v-on="on"
        class="hidden-sm-and-down"
        color="grey darken-1 shrink"
        size="32"
        ><span v-if="user" class="white--text">{{ credentials }}</span>
      </v-avatar>
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
