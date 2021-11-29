<template>
  <div>
    <v-card v-if="user">
      <v-card-title>{{ user.firstname }} {{ user.lastname }}</v-card-title>
      <v-card-text>
        <ul>
          <li><b>ID: </b>{{ user.id }}</li>
          <li><b>Email: </b>{{ user.email }}</li>
          <li><b>Firstname: </b>{{ user.firstname }}</li>
          <li><b>Lastname: </b>{{ user.lastname }}</li>
        </ul>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { UserAPI } from "@/api/device_api.js";

export default {
  name: "UserProfile",
  data() {
    return {
      user: undefined,
    };
  },
  created() {
    let id = this.$route.params.id;
    UserAPI.get_user(id)
      .then((res) => {
        console.log("Response: ", res);
        this.user = res.data;
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  },
};
</script>
