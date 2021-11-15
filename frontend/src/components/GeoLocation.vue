<template>
  <v-input prepend-icon="mdi-map-marker">
    <v-btn text @click="get_location" class="px-0 mr-3">Location</v-btn>
    <span v-if="lat || long" class="location-text">
      {{ lat }}° Lat | {{ long }}° Long
    </span>
  </v-input>
</template>

<script>
export default {
  name: "GeoLocation",
  data: () => {
      return {
          lat: undefined,
          long: undefined
      }
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
  },
};
</script>

<style scoped>
.location-text {
  font-size: 12px;
  color: gray;
}
</style>