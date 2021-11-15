<template>
  <div>
      <h1>Scan QR-code here</h1>
      <qr-scanner />
  </div>
</template>

<script>
import QrScanner from '@/components/QRscanner.vue'

export default {
  name: "QRScanView",
  components: {
    QrScanner
  },
  methods: {
    onDecode(decodedString) {
      console.log(decodedString)
    }
  }
}
</script>