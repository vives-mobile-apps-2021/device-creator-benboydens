<template>
  <v-dialog v-model="showDialog" width="500">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>{{ text }}</v-card-text>
      <v-card-actions
        ><v-spacer></v-spacer>
        <v-btn color="primary" text @click="action">
          Close
        </v-btn></v-card-actions
      >
    </v-card>
  </v-dialog>
</template>

<script>
export default {
    name: "SimpleDialog",
    data: () => {
        return {
            dialog: false
        }
    },
    props: ['title', 'text', 'show'],
    methods: {
        action() {
            this.$emit("action")
        }
    },
    computed: {
      showDialog: {
        get: function() {
          return this.show;
        },
        set: function(newValue) {
          this.$emit("update:show", newValue);
        }
      }
    }
};
</script>
