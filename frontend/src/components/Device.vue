<template>
  <div>
    <v-card v-if="device" outlined class="pr-3">
      <v-row>
        <v-col cols="12" sm="8" md="9" lg="10">
          <div>
            <v-card-title>
              {{ device.name }}
            </v-card-title>
            <v-card-subtitle>
              {{ device.description }}
            </v-card-subtitle>
            <v-card-text>
              <ul>
                <li><b>GUID: </b>{{ device.guid }}</li>
                <li><b>Latitude: </b>{{ device.location.lat }}</li>
                <li><b>Longitude: </b>{{ device.location.long }}</li>
                <li><b>Image: </b>{{ device.image }}</li>
              </ul>
            </v-card-text>
          </div>
        </v-col>

        <v-col cols="12" sm="4" md="3" lg="2" class="hidden-xs-only">
          <v-img
            :src="image_url + '/images/' + device.image"
            class="ml-auto my-3"
            style="width: 170px; height: 170px"
          ></v-img>
        </v-col>
      </v-row>

      <v-img
        :src="image_url + '/images/' + device.image"
        class="ml-auto my-3 hidden-sm-and-up small-image"
      ></v-img>
    </v-card>
    <error-dialog :show.sync="dialog" :message="error_msg" />
  </div>
</template>

<script>
import { DevicesAPI } from "@/api/device_api.js";
import ErrorDialog from "@/components/ErrorDialog.vue";
//import LoginAlert from "@/components/LoginAlert.vue";

export default {
  name: "Device",
  components: {
    //LoginAlert,
    ErrorDialog,
  },
  data: () => {
    return {
      device: undefined,
      error_msg: undefined,
      dialog: false,
      image_url:
        process.env.VUE_APP_API_URL + ":" + process.env.VUE_APP_API_PORT,
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
        const res = err.response;
        if (res.status === 401) {
          // show login modal
          console.log("LOGIN");
        } else {
          // show nice error message
          console.log("ERROR");
        }
        this.error_msg = res.data.message;
        this.dialog = true;
      });
  },
};
</script>

<style scoped>
  .small-image {
    position: absolute;
    top: 0px;
    right: 10px;
    width: 50px;
    height: 50px;
  }
</style>