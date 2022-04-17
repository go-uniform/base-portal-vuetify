<template>

  <v-layout
    v-if="!connected"
    class="connection-lost"
    :class="{dark:this.$vuetify.theme.dark}"
    justify-center
    align-center
    fill-height
  >

    <div>

      <p
        class="display-2"
      >
        You are offline.
      </p>
      <p>
        Try:
      </p>
      <ul>

        <li>
          Turning off airplane mode
        </li>
        <li>
          Turning on mobile data or Wi-Fi
        </li>
        <li>
          Checking the signal in your area
        </li>

      </ul>
      <br>
      <p>
        This message will automatically close once your connection is restored.
      </p>

    </div>

  </v-layout>

</template>

<style lang="scss" scoped>
.connection-lost {
  background: white;
  color: black;
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  z-index: 999999 !important;
}
.connection-lost.dark {
  background: black;
  color: white;
}
</style>

<script>
import {bus} from '@/services/base/bus';

export default {
  name: 'connection-lost',

  data: () => ({
    connected: true,
  }),

  created() {
    bus.subscribe('connection', (state) => {
      this.connected = state;
    })
  }
}
</script>
