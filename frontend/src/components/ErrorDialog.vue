<template>
  <v-dialog v-model="show" width="500">
    <v-card>
      <v-card-title class="text-h5"> Something went wrong </v-card-title>

      <v-card-text>
        {{ error_msg }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="close_dialog">
          <span v-if="back">Go Back</span>
          <span v-else>Close</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ErrorDialog",
  props: {
    error: Error,
    back: Boolean,
  },
  data: () => {
    return {
      show: false,
      error_msg: undefined,
    };
  },
  methods: {
    close_dialog() {
      if (this.back) {
        this.$router.go(-1);
      } else {
        this.show = false;
      }
    }
  },
  watch: {
    error(newValue) {
      if (newValue) {
        if (newValue.response.status === 401) {
          // user is unauthorized so needs to login
          this.$store.commit("set_show_login", true);
        } else {
          // something went wrong show error to user
          this.error_msg = newValue.response
            ? newValue.response.data.message
            : "Oh no!";
          this.show = true;
        }
      }
    },
  },
};
</script>
