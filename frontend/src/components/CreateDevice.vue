<template>
  <v-sheet class="pa-3">
    <validation-observer ref="observer">
      <v-form @submit.prevent="upload_image">
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <validation-provider
                v-slot="{ errors }"
                name="Name"
                rules="required|max:64"
              >
                <v-text-field
                  label="Name"
                  v-model="name"
                  required
                  :counter="64"
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>
            <v-col cols="12" md="6">
              <validation-provider
                v-slot="{ errors }"
                name="Description"
                rules="required|max:128"
              >
                <v-text-field
                  label="Description"
                  v-model="description"
                  required
                  :counter="128"
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>
            <v-col cols="12" md="6">
              <validation-provider
                v-slot="{ errors }"
                name="GUID"
                rules="required|length:32"
              >
                <v-text-field
                  label="GUID"
                  v-model="guid"
                  disabled
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>
            <v-col cols="12" md="6">
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
                  v-model="image"
                  name="image"
                  required
                  :error-messages="errors"
                ></v-file-input>
              </validation-provider>
            </v-col>
            <v-col cols="12" class="pb-0">
              <validation-provider
                v-slot="{ errors }"
                name="Location"
                rules="required"
              >
                <v-input
                  prepend-icon="mdi-map-marker"
                  :error-messages="errors"
                  :value="lat && long"
                >
                  <v-btn text @click="get_location" class="px-0 mr-3"
                    >Location</v-btn
                  >
                  <span v-if="lat || long" class="location-text">
                    {{ lat }}° Lat | {{ long }}° Long
                  </span>
                </v-input>
              </validation-provider>
            </v-col>
            <v-col cols="12" v-if="error">
              <v-alert dense outlined type="error" class="mb-0">
                {{ error }}
              </v-alert>
            </v-col>
            <v-btn color="primary" type="submit">Create</v-btn>
          </v-row>
        </v-container>
      </v-form>
    </validation-observer>
    <simple-dialog
      v-model="dialog"
      title="Message"
      text="Device was made succesfully!"
      @action="close_dialog"
    />
  </v-sheet>
</template>

<script>
import SimpleDialog from "@/components/SimpleDialog.vue";
import { DevicesAPI, ImageAPI } from "@/api/device_api.js";
import { required, max, length } from "vee-validate/dist/rules";
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

extend("length", {
  ...length,
  message: "{_field_} must have {length} characters",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

export default {
  name: "CreateDevice",
  data: () => {
    return {
      name: "",
      description: "",
      guid: undefined,
      image: undefined,
      lat: undefined,
      long: undefined,
      dialog: false,
      error: undefined,
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    SimpleDialog,
  },
  created() {
    this.guid = this.$route.query.guid;
  },
  methods: {
    validate() {
      this.$refs.observer.validate();
    },
    get_location() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude;
          this.long = position.coords.longitude;
        });
      }
    },
    create_device(response) {
      // response is the response from the backend when we upload an image
      // TODO maka actual form with validation
      let device = {
        name: this.name,
        description: this.description,
        guid: this.guid,
        image: response.filename,
        location: {
          lat: parseFloat(this.lat),
          long: parseFloat(this.long),
        },
      };
      DevicesAPI.create_device(device)
        .then((res) => {
          if (res.status < 300) {
            //show dialog
            this.dialog = true;
          } else {
            // handle error message
            this.error = res;
          }
        })
        .catch((err) => {
          console.log(err);
          this.error = err;
        });
    },
    upload_image() {
      // validate
      this.$refs.observer
        .validate()
        .then((res) => {
          if (res) {
            // validation successfull so upload image to backend
            // backend returns unique name of image. We use that as name of image
            ImageAPI.upload_image(this.image)
              .then((res) => {
                // res.data contains response from serve. Here we can find the image name
                this.create_device(res.data);
              })
              .catch((err) => {
                this.error = err;
                console.log("ERR", err);
              });
          }
        })
        .catch((err) => console.log("ERROR", err));
    },
    close_dialog() {
      // closed dialog and redirect user to device list page
      this.dialog = false;
      this.$router.push("/devices");
    },
  },
};
</script>

<style scoped>
.location-text {
  font-size: 12px;
  color: gray;
}
</style>