<template>
  <div>
    <h1>Create Device</h1>
    <v-sheet class="pb-5">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field label="Name" v-model="name" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field label="Description" v-model="description" />
          </v-col>
        </v-row>
        <v-btn color="primary" @click="create_device">Create</v-btn>
      </v-container>
    </v-sheet>
  </div>
</template>

<script>
import { DevicesAPI } from "@/api/device_api.js";

export default {
  name: "CreateDevice",
  data: () => {
    return {
      name: "",
      description: "",
    };
  },
  methods: {
    create_device() {
      DevicesAPI.create_device(this.name)
      .then((res) => {
        console.log("RESPONSE", res);
        // todo redirect user + alert
      })
      .catch((err) => {
        console.log("ERROR", err);
      })
    }
  }
};
</script>