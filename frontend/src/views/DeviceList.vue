<template>
  <div>
      <h1>Device List</h1>
      <v-row>
          <v-col
            v-for="n in 24"
            :key="n"
            cols="4"
          >
            <v-card height="200"></v-card>
          </v-col>
        </v-row>
  </div>
</template>

<script>
export default {
  name: 'DeviceList'
}
</script>