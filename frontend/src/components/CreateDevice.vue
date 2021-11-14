<template>
  <v-sheet class="pa-3">
    <v-form action="http://localhost:5000/images/upload" enctype="multipart/form-data" method="post">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field label="Name" v-model="name" required />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field label="Description" v-model="description" required />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field label="GUID" v-model="guid" disabled />
          </v-col>
          <v-col cols="12" md="6">
            <v-file-input
              accept="image/*"
              prepend-icon="mdi-camera"
              label="Image"
              truncate-length="50"
              v-model="image"
              name="image"
              required
            ></v-file-input>
          </v-col>
          <v-col cols="12" class="pb-0">
            <v-input prepend-icon="mdi-map-marker">
              <v-btn text @click="get_location" class="px-0 mr-3"
                >Location</v-btn
              >
              <span v-if="lat || long" class="location-text">
                {{ lat }}° Lat | {{ long }}° Long
              </span>
            </v-input>
          </v-col>
          <v-col cols="12" v-if="error">
            <v-alert dense outlined type="error" class="mb-0">
              {{ error }}
            </v-alert>
          </v-col>
          <v-col cols="2">
            <v-btn color="primary" type="submit">Create</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-sheet>
</template>

<script>
import { DevicesAPI, ImageAPI } from "@/api/device_api.js";

export default {
  name: "CreateDevice",
  data: () => {
    return {
      name: "",
      description: "",
      guid: "3F2504E04F8911D39A0C0305E82C3301",
      image: undefined,
      lat: undefined,
      long: undefined,
      error: undefined,
    };
  },
  methods: {
    get_location() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude;
          this.long = position.coords.longitude;
        });
      }
    },
    create_device() {
      // TODO maka actual form with validation
      let device = {
        name: this.name,
        description: this.description,
        guid: this.guid,
        image: this.image,
        location: {
          lat: parseFloat(this.lat),
          long: parseFloat(this.long),
        },
      };
      DevicesAPI.create_device(device)
        .then((res) => {
          if (res.status < 300) {
            // redirect user to device list page
            alert("Device was made successfully!");
            // this.$router.push("/devices");
            console.log(res);
          } else {
            // hangle error message
            this.error = res;
          }
        })
        .catch((err) => {
          console.log(err);
          this.error = err;
        });
    },
    upload_image() {
      // upload image to backend
      // first upload image to backend.
      // backend returns unique name of image. We use that as name of image
      console.log("Type ", typeof this.image);
      console.log("Image ", this.image);
      ImageAPI.upload_image(this.image)
        .then((res) => {
          console.log("RES", res);
        })
        .catch((err) => {
          console.log("ERR", err);
        });
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