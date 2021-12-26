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
                name="Password"
                :rules="{
                  required: true,
                  regex: '^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9 ]).{8,}$',
                }"
              >
                <v-text-field
                  label="Password"
                  type="password"
                  v-model="password"
                  required
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>
            <v-col cols="12">
              <validation-provider
                v-slot="{ errors }"
                name="Image"
                rules="required"
              >
                <v-file-input
                  accept="image/*"
                  prepend-icon="mdi-camera"
                  label="Image"
                  truncate-length="50"
                  v-model="avatar"
                  name="Image"
                  required
                  dense
                  :error-messages="errors"
                ></v-file-input>
              </validation-provider>
            </v-col>
            <v-btn color="primary" type="submit">Register</v-btn>
          </v-row>
        </v-container>
      </v-form>
    </validation-observer>
    <simple-dialog
      :show.sync="dialog"
      title="Success"
      text="User registration was succesfull!"
      @action="close_dialog"
    />
    <error-dialog :error="error" />
  </v-sheet>
</template>

<script>
import SimpleDialog from "@/components/SimpleDialog.vue";
import ErrorDialog from "@/components/ErrorDialog.vue";
import { UserAPI, AvatarAPI } from "@/api/device_api.js";
import { required, max, email, regex } from "vee-validate/dist/rules";
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

extend("regex", {
  ...regex,
  message:
    "Minimum eight characters, at least one letter, one number and one special character",
});

export default {
  name: "RegisterForm",
  data: () => {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      avatar: undefined,
      dialog: false,
      error: undefined,
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    SimpleDialog,
    ErrorDialog,
  },
  methods: {
    submit() {
      this.$refs.observer
        .validate()
        .then((res) => {
          // res is true if validation is successfull
          if (res) {
            AvatarAPI.upload_avatar(this.avatar)
              .then((res) => {
                const filename = res.data.filename;
                const user = {
                  firstname: this.firstname,
                  lastname: this.lastname,
                  email: this.email,
                  password: this.password,
                  avatar: filename,
                };
                return UserAPI.register(user);
              })
              .then(() => (this.dialog = true))
              .catch((err) => {
                this.error = err;
              });
          }
        })
        .catch((err) => console.log(err));
    },
    close_dialog() {
      this.$router.push("/");
    },
  },
};
</script>
