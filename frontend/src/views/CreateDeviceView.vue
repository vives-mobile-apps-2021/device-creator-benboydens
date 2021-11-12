<template>
  <div>
    <h1>Create Device</h1>
    <create-device />
  </div>
</template>

<script>
import CreateDevice from '@/components/CreateDevice.vue';

export default {
  name: "CreateDeviceView",
  components: {
    CreateDevice
  }
};
</script>