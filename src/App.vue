<template>

  <!-- provide key to ensure component is refreshed when navigating to a new path -->
  <router-view
    :key="$route.path"
  />

</template>

<script lang="ts">
import Vue from 'vue';
import {bus} from '@/services/base/bus';

let isConnected = true;

export default Vue.extend({
  name: 'App',

  created() {
    if (window && window.localStorage) {
      const dark = window.localStorage.getItem('theme.dark');
      if (dark !== null) {
        this.$vuetify.theme.dark = dark !== 'false';
      }
    }

    isConnected = true;
    setInterval(() => {
      const onLine = navigator.onLine;
      if (onLine && !isConnected) {
        isConnected = true;
        bus.publish('connection', isConnected);
      } else if (!onLine && isConnected) {
        isConnected = false;
        bus.publish('connection', isConnected);
      } else {
        // legacy fallback (should not be needed but just in case)
        const connectionLegacy = 'connection';
        const connectionMozilla = 'mozConnection';
        const connectionWebkit = 'webkitConnection';
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const connection = navigator[connectionLegacy] || navigator[connectionMozilla] || navigator[connectionWebkit];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const downLink = connection.downlink;

        if (isConnected && downLink < 0.1) {
            isConnected = false;
            bus.publish('connection', isConnected);
        } else if (!isConnected && downLink > 0.1) {
            isConnected = true;
            bus.publish('connection', isConnected);
        }
      }
    }, 500);
  }
});
</script>

<style lang="scss">
.fill-width {
  width: 100%;
}
a i.v-icon.v-icon {
  color: inherit;
}
</style>
