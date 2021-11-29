<template>
  <div>
      <h1>Profile</h1>
      <user-profile />
  </div>
</template>

<script>
import UserProfile from '@/components/UserProfile.vue'

export default {
    name: "UserView",
    components: {
        UserProfile
    }
}
</script>
