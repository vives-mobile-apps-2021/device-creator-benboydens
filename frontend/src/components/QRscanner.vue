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
              <v-progress-linear
                v-if="!qrcodevalue"
                indeterminate
                color="blue"
              ></v-progress-linear>
            </qrcode-stream>

            <div v-if="!qrcodevalue" class="qr-subtitle pa-3">
              Scanning for QR-codes...
            </div>
            <div v-else class="qr-subtitle pa-3">
              <v-icon color="green darken-2"> mdi-check-bold </v-icon>
              Found
              <a :href="qrcodevalue">
                {{ qrcodevalue }}
              </a>
            </div>
          </v-tab-item>
          <v-tab-item transition="false">
            <h5>Drop file here</h5>
            <qrcode-capture @decode="onDecode"></qrcode-capture>
            <div class="pa-3" v-if="qrcodevalue">
              <v-icon color="green darken-2"> mdi-check-bold </v-icon>
              Found
              <a :href="qrcodevalue">
                {{ qrcodevalue }}
              </a>
            </div>
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
      qrcodevalue: undefined,
      tab: null,
      items: ["Use Camera", "Use File"],
    };
  },
  components: {
    QrcodeStream,
    QrcodeCapture 
  },
  methods: {
    onDecode(decodedString) {
      console.log(decodedString);
      this.qrcodevalue = decodedString;
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