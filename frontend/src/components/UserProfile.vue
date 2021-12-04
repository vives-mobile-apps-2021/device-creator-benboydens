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
    <error-dialog v-model="dialog" :message="error"></error-dialog>
  </div>
</template>

<script>
import { UserAPI } from "@/api/device_api.js";
import ErrorDialog from "@/components/ErrorDialog.vue"

export default {
  name: "UserProfile",
  components: {
    ErrorDialog
  },
  data() {
    return {
      user: undefined,
      dialog: false,
      error: undefined
    };
  },
  created() {
    UserAPI.get_profile()
      .then((res) => {
        this.user = res.data;
      })
      .catch((err) => {
        console.log("Error: ", err);
        this.dialog = true;
        this.error = err.response.data.message;
      });
  },
};
</script>
