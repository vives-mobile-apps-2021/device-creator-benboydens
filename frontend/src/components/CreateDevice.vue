<template>
  <v-sheet class="pa-3">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field label="Name" v-model="name" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="Description" v-model="description" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="GUID" v-model="guid" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="Image" v-model="image" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field type="number" label="Latitude" v-model="lat"/>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field type="number" label="Latitude" v-model="long"/>
        </v-col>
      </v-row>
      <v-btn color="primary" @click="create_device">Create</v-btn>
    </v-container>
  </v-sheet>
</template>

<script>
import { DevicesAPI } from "@/api/device_api.js";

export default {
  name: "CreateDevice",
  data: () => {
    return {
      name: "",
      description: "",
      guid: "3F2504E04F8911D39A0C0305E82C3301",
      image: undefined,
      lat: "5",
      long: "120"
    };
  },
  methods: {
    create_device() {
      let device = {
        name: this.name,
        description: this.description,
        guid: this.guid,
        image: this.image,
        location: {
          lat: parseInt(this.lat),
          long: parseInt(this.long)
        }
      }
      DevicesAPI.create_device(device)
        .then((res) => {
          console.log("RESPONSE", res);
          // todo redirect user + alert
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>