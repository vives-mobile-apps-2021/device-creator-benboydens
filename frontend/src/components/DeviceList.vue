<template>
  <v-row>
      <v-col v-for="device in devices" :key="device.id" cols="12" sm="6" md="4">
        <v-card outlined>
          <v-card-title>
            {{ device.name }}
          </v-card-title>
          <v-card-text>
             {{ device.description }}
          </v-card-text>
          <v-card-actions>
            <v-btn text color="blue" :to="'/devices/' + (device.id || 0)" >Details</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
</template>

<script>
import { DevicesAPI } from "@/api/device_api.js";

export default {
  name: "DeviceList",
  data: () => {
    return {
      devices: [],
    };
  },
  created() {
    DevicesAPI.get_all_devices()
      .then((res) => {
        this.devices = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
}
</script>