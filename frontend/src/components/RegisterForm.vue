<template>
  <v-sheet class="pa-3">
    <validation-observer ref="observer">
      <v-form @submit.prevent="submit">
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ errors }"
                name="Firstname"
                rules="required|max:64"
              >
                <v-text-field
                  label="Firstname"
                  v-model="firstname"
                  required
                  :counter="64"
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ errors }"
                name="Lastname"
                rules="required|max:64"
              >
                <v-text-field
                  label="Lastname"
                  v-model="lastname"
                  required
                  :counter="64"
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ errors }"
                name="Email"
                rules="required|email"
              >
                <v-text-field
                  label="Email"
                  v-model="email"
                  required
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ errors }"
                name="password"
                rules="required"
              >
                <v-text-field
                  label="password"
                  type="password"
                  v-model="password"
                  required
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>
            <v-btn color="primary" type="submit">Register</v-btn>
          </v-row>
        </v-container>
      </v-form>
    </validation-observer>
  </v-sheet>
</template>

<script>
import { UserAPI } from "@/api/device_api.js";
import { required, max, email } from "vee-validate/dist/rules";
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

extend("max", {
  ...max,
  message: "{_field_} may not have more than {length} characters",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  name: "RegisterForm",
  data: () => {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  methods: {
    submit() {
      console.log("SUBMIT");
      this.$refs.observer
        .validate()
        .then((res) => {
          // res is true if validation is successfull
          if (res) {
            const user = {
              firstname: this.firstname,
              lastname: this.lastname,
              email: this.email,
              password: this.password,
            };
            
            // create user in backend
            UserAPI.register(user)
              .then((res) => {
                console.log("SUCCESS!", res);
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
