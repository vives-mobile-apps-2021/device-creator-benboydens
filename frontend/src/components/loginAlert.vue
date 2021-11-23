<template>
  <v-dialog transition="dialog-bottom-transition" v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on"> Login </v-btn>
    </template>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="login">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Authentication
          </v-card-title>
          <v-card-text>
            <validation-provider
              v-slot="{ errors }"
              name="Email"
              rules="required|email"
            >
              <v-text-field
                label="Email"
                v-model="email"
                type="email"
                :error-messages="errors"
                required
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Password"
              rules="required"
            >
              <v-text-field
                label="Password"
                v-model="password"
                type="password"
                :error-messages="errors"
                required
              ></v-text-field>
            </validation-provider>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="cancel">Cancel</v-btn>
            <v-btn color="primary" text type="submit" :disabled="invalid"
              >Login</v-btn
            >
          </v-card-actions>
        </v-card>
      </form>
    </validation-observer>
  </v-dialog>
</template>

<script>
import { UserAPI } from "@/api/device_api.js";
import { required, email } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});
extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  name: "LoginDialog",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => {
    return {
      dialog: false,
      email: "",
      password: "",
    };
  },
  methods: {
    cancel() {
      this.dialog = false;
      this.email = "";
      this.password = "";
      this.$refs.observer.reset();
    },
    login() {
      // validatie
      this.$refs.observer
        .validate()
        .then((res) => {
          if (res) {
            // send data to backend
            console.log(this.email);
            console.log(this.password);
            UserAPI.login(this.email, this.password)
              .then((res) => {
                console.log("Response: ", res);
              })
              .catch((err) => {
                console.log("Error: ", err.body);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>