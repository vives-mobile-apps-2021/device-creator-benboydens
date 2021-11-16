<template>
  <div>
      <h1>Map</h1>
      <leaflet-map />
  </div>
</template>

<script>
import LeafletMap from '@/components/Map.vue'

export default {
    name: "MapView",
    components: {
        LeafletMap
    }
}
</script>