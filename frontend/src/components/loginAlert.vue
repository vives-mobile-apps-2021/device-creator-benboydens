<template>
  <v-dialog transition="dialog-bottom-transition" v-model="showDialog" width="500">
    <validation-observer ref="observer">
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

          <v-alert
            v-if="error && error.response"
            dense
            outlined
            type="error"
            class="pa-3 mx-3"
          >
          <!-- TODO fix dit zodat het altijd werkt -->
            {{ error.response.data.message }}
          </v-alert>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text type="submit">Login</v-btn>
            <v-btn color="primary" text @click="cancel">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </validation-observer>
  </v-dialog>
</template>

<script>
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
      email: "",
      password: "",
    };
  },
  methods: {
    cancel() {
      this.showDialog = false;
      this.email = "";
      this.password = "";
      this.clear_error();
      this.$refs.observer.reset();
    },
    login() {
      // validatie
      this.$refs.observer
        .validate()
        .then((res) => {
          if (res) {
            // validation succes so login user
            const credentials = {
              email: this.email,
              password: this.password,
            };
            this.$store.dispatch("login", credentials);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    clear_error() {
      this.$store.commit('set_error', undefined)
    }
  },
  computed: {
    showDialog: {
      get() {
        return this.$store.state.showLogin;
      },
      set(newValue) {
        this.$store.commit("set_show_login", newValue)
      }
    },
    error() {
      return this.$store.state.error;
    },
  },
};
</script>