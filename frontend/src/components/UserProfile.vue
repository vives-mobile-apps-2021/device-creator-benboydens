<template>
  <div>
    <v-card v-if="user" outlined class="pr-3">
      <v-row>
        <v-col cols="12" sm="8" md="9" lg="10">
          <v-card-title>{{ user.firstname }} {{ user.lastname }}</v-card-title>
          <v-card-text>
            <ul>
              <li><b>ID: </b>{{ user.id }}</li>
              <li><b>Email: </b>{{ user.email }}</li>
              <li><b>Firstname: </b>{{ user.firstname }}</li>
              <li><b>Lastname: </b>{{ user.lastname }}</li>
              <li><b>Avatar: </b>{{ user.avatar }}</li>
            </ul>
          </v-card-text>
        </v-col>
        <v-col cols="12" sm="4" md="3" lg="2">
          <v-img
            :src="image_url + '/images/' + user.avatar"
            class="ml-auto my-3"
            style="width: 170px; height: 170px"
          ></v-img>
        </v-col>
      </v-row>
    </v-card>
    <error-dialog v-model="dialog" :message="error"></error-dialog>
  </div>
</template>

<script>
import { UserAPI } from "@/api/device_api.js";
import ErrorDialog from "@/components/ErrorDialog.vue";

export default {
  name: "UserProfile",
  components: {
    ErrorDialog,
  },
  data() {
    return {
      user: undefined,
      dialog: false,
      error: undefined,
      image_url:
        process.env.VUE_APP_API_URL + ":" + process.env.VUE_APP_API_PORT,
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
