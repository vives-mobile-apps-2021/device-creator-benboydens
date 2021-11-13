<template>
  <div v-if="!error">
    <v-card v-if="device" outlined>
      <v-card-title>
        {{ device.name }}
      </v-card-title>
      <v-card-subtitle>
        {{ device.description }}
      </v-card-subtitle>
      <v-card-text>
        <ul>
          <li><b>Guid: </b>{{ device.guid }}</li>
          <li><b>Latitude: </b>{{ device.location.lat }}</li>
          <li><b>Longitude: </b>{{ device.location.long }}</li>
        </ul>
      </v-card-text>
    </v-card>
  </div>
  <v-container v-else>
    {{ error }}
  </v-container>
</template>

<script>
import { DevicesAPI } from "@/api/device_api.js";

export default {
  name: "Device",
  data: () => {
    return {
      device: undefined,
      error: undefined,
    };
  },
  created() {
    let id = this.$route.params.id;
    DevicesAPI.get_one_device(id)
      .then((res) => {
        this.device = res.data;
      })
      .catch((err) => {
        console.log(err);
        this.error = err;
      });
  },
};
</script>