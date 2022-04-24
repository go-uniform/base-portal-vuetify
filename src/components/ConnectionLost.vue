<template>

  <v-layout
    v-if="!connected"
    class="connection-lost pa-2 pa-sm-4 pa-lg-8"
    :class="{dark:this.$vuetify.theme.dark}"
    justify-center
    align-center
    fill-height
  >

    <div
      v-html="translate('base.connection.pageHtml')"
    >
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
