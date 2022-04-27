<template>

  <v-dialog
    fullscreen
    persistent
    v-model="loading"
  >
    <v-card
      class="fill-height"
    >
      <v-layout
        fill-height
        justify-center
        align-center
        column
      >
        <p>
          {{ translate(loadingText) }}
        </p>
      </v-layout>
    </v-card>
  </v-dialog>


</template>

<script>
import {bus} from '@/services/base/bus';
import {toastError} from '../../plugins/base/vuetify';

export default {
  name: 'loading-indicator',

  data: () => ({
    loading: false,
    loadingText: '$vuetify.app.loading',
    timeoutHandler: null,
  }),

  methods: {
  },

  created() {
    bus.subscribe('loading.start', (options) => {
      if (options.text) {
        this.loadingText = options.text;
      }
      let timeout = options.timeout;
      if (!timeout) {
        timeout = 5000;
      } else if (timeout < 5000) {
        console.log('loading.start timeout must be at least 5 seconds long at a minimum');
        timeout = 5000;
      }
      this.loading = true;
      if (this.timeoutHandler) {
        clearTimeout(this.timeoutHandler);
      }
      this.timeoutHandler = setTimeout(() => {
        if (this.loading) {
          toastError('$vuetify.app.loadingTimeout');
          this.loading = false;
        }
      }, timeout);
    });
    bus.subscribe('loading.stop', () => {
      if (this.timeoutHandler) {
        clearTimeout(this.timeoutHandler);
      }
      this.loading = false;
      this.loadingText = '$vuetify.app.loading';
    });
  }
}
</script>
