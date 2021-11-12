<template>
  <div>
    <h1>Device details</h1>
    <device />
  </div>
</template>

<script>
import Device from "@/components/Device.vue"

export default {
  name: "DeviceView",
  components: {
    Device
  }
};
</script>