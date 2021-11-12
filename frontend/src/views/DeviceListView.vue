<template>
  <div>
    <h1>Device List</h1>
    <device-list />
  </div>
</template>

<script>
import DeviceList from "@/components/DeviceList.vue"

export default {
  name: "DeviceListView",
  components: {
    DeviceList
  }
};
</script>