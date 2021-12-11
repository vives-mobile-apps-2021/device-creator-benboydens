<template>
  <div class="home">
    <v-sheet>
      <v-container class="px-5">
        <v-row>
          <v-col cols="12" class="pb-0">
            <h1>Device creator</h1>
          </v-col>
          <v-col cols="12" sm="7" md="8">
            <p>
              Welcome to the device creator website. This is a website where you
              can register your devices using a QR-code. Devices are then saved
              in our database.
            </p>
            <p>
              To create a device you will need to be logged in. Also to view the
              details of a device you wil need to be logged in. We track the GPS
              location of every device so we can overview them on a map.
            </p>
            <p>
              Created by Ben Boydens of Vives Hogeschool. Located in Brugge
              Belgium.
            </p>
          </v-col>
          <v-col cols="12" sm="5" md="4">
            <v-sheet rounded color="grey lighten-3" class="pa-1">
              <v-img
                src="https://www.techspring.nl/wp-content/uploads/2020/08/Jtf-rfU-harrison-broadbent-c3YpscwJb04-unsplash-scaled.jpg"
                class="left-img"
              />
            </v-sheet>
          </v-col>
        </v-row>
        <br />

        <h1>Map</h1>
        <v-sheet rounded color="grey lighten-3" class="pa-1">
          <leaflet-map />
        </v-sheet>
      </v-container>
    </v-sheet>
  </div>
</template>

<script>
import LeafletMap from "@/components/Map.vue";

export default {
  name: "Home",
  components: {
    LeafletMap,
  },
};
</script>