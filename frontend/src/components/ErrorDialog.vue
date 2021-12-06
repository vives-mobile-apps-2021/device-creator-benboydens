<template>
  <v-dialog v-model="value" width="500">
    <v-card>
      <v-card-title class="text-h5"> Something went wrong </v-card-title>

      <v-card-text>
        {{ message }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="$router.go(-1)"> Go Back </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// TODO FIX v-model="value" not good gives error
export default {
  name: "ErrorDialog",
  props: {
      value: Boolean,
      message: String,
  }
};
</script>
