<template>
  <div>
    <v-sheet>
      <v-container>
        <v-tabs v-model="tab">
          <v-tab v-for="item in items" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab" vertical>
          <v-tab-item transition="false">
            <qrcode-stream @decode="onDecode" class="qr-stream mt-3">
              <v-progress-linear indeterminate color="blue"></v-progress-linear>
            </qrcode-stream>

            <div class="qr-subtitle pa-3">Scanning for QR-codes...</div>
          </v-tab-item>
          <v-tab-item transition="false">
            <h5>Drop file here</h5>
            <qrcode-capture
              class="mb-5"
              @decode="onDecode"
              @detect="onDetect"
            ></qrcode-capture>
            <v-alert
              v-if="showAlert"
              dense
              outlined
              type="error"
              class="pa-3 mx-3"
            >
              Could not find a qr-code in image
            </v-alert>
          </v-tab-item>
        </v-tabs-items>
      </v-container>
    </v-sheet>
  </div>
</template>

<script>
import { QrcodeStream, QrcodeCapture } from "vue-qrcode-reader";

export default {
  name: "QrScanner",
  data: () => {
    return {
      tab: null,
      items: ["Use Camera", "Use File"],
      showAlert: false,
    };
  },
  components: {
    QrcodeStream,
    QrcodeCapture,
  },
  methods: {
    onDecode(decodedString) {
      this.$router.push("/devices/create?guid=" + decodedString);
    },
    onDetect(promise) {
      promise
        .then((obj) => {
          if (obj.content === null) {
            // decoded nothing
            this.showAlert = true;
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.qr-stream {
  width: 250px;
  height: 250px;
  margin: auto;
}
.qr-subtitle {
  margin: auto;
  color: gray;
  text-align: center;
}
</style>