<template>
  <v-sheet class="pa-3">
    <v-container v-if="!error">
      <h2>{{ device.name }}</h2>
      <ul>
        <li><b>id: </b>{{ device.id }}</li>
        <li><b>description: </b>{{ device.description }}</li>
      </ul>
    </v-container>
    <v-container v-else>
      {{ error }}
    </v-container>
  </v-sheet>
</template>

<script>
import { DevicesAPI } from "@/api/device_api.js";

export default {
  name: "Device",
  data: () => {
    return {
      device: {},
      error: undefined
    };
  },
  created() {
    let id = this.$route.params.id
    DevicesAPI.get_one_device(id)
      .then((res) => {
        this.device = {
          name: res.data.name,
          id: id,
          description: "Wow wat een mooie beschrijving!",
        };
      })
      .catch((err) => {
        console.log(err);
        this.error = err;
      });
  },
};
</script>