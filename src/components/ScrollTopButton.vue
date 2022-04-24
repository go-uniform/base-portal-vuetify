<template>

  <v-btn
    v-if="showScrollTopBtn"
    color="secondary"
    class="scroll-top-button"
    @click.stop="scrollTop"
  >
    <v-icon>
      mdi-arrow-up-thick
    </v-icon>
    <span
      class="ml-2 hidden-xs-only"
    >
      {{ translate('base.app.scrollTop') }}
    </span>
  </v-btn>

</template>

<style lang="scss" scoped>
.scroll-top-button {
  position: fixed;
  right: 10px;
  bottom: 10px;
  z-index: 5;
}
</style>

<script>
import goTo from 'vuetify/lib/services/goto'
import {bus} from '@/services/base/bus';

export default {
  name: 'scroll-top-button',

  data: () => ({
    showScrollTopBtn: false,
  }),

  methods: {
    scrollTop() {
      goTo(0)
    }
  },

  created() {

    bus.subscribe('window.scrollTopBtn', (state) => {
      this.showScrollTopBtn = state;
    });

  },
}
</script>
