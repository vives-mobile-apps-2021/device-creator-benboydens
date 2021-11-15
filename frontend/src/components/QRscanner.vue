<template>
  <div>
    <v-sheet>
      <v-container>
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
      </v-container>
    </v-sheet>
  </div>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";

export default {
  name: "QrScanner",
  data: () => {
    return {
      qrcodevalue: undefined,
    };
  },
  components: {
    QrcodeStream,
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