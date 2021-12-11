<template>
  <l-map style="height: 500px" :zoom="zoom" :center="center">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-marker
      v-for="device in devices"
      :key="device.id"
      :lat-lng="[device.location.lat, device.location.long]"
    >
      <l-popup>
        <v-card elevation="0" style="width: 180px">
          <v-card-title class="map-marker-title">
            {{
              device.name.length > 20
                ? device.name.substring(0, 20) + "..."
                : device.name
            }}
          </v-card-title>
          <v-card-subtitle class="map-marker-subtitle">
            {{
              device.description.length > 70
                ? device.description.substring(0, 70) + "..."
                : device.description
            }}
          </v-card-subtitle>
          <v-card-actions>
            <router-link :to="'/devices/' + device.id">Details </router-link>
          </v-card-actions>
        </v-card>
      </l-popup>
    </l-marker>
  </l-map>
</template>

<script>
import { Icon } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";
import { DevicesAPI } from "@/api/device_api.js";

// needed to fix the missing marker icons
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default {
  name: "LeafletMap",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  data: () => {
    return {
      devices: [],
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 7,
      center: [50.5, 4.34878],
      markerLatLng: [51.504, -0.159],
    };
  },
  created() {
    DevicesAPI.get_all_devices()
      .then((res) => {
        this.devices = res.data;
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  },
};
</script>

<style>
.leaflet-popup-content {
  margin: 5px !important;
  margin-right: 5px !important;
  width: fit-content;
}
.map-marker-title {
  font-size: 1rem;
  line-height: 1rem;
}
.map-marker-subtitle {
  font-size: 0.7rem;
  line-height: 1rem;
  padding-top: 3px;
  padding-bottom: 0;
}
</style>