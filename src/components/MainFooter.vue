<template>

  <v-footer
    padless
    class="text-center"
    fixed
  >
    <v-btn
      v-if="showScrollTopBtn"
      class="scroll-top"
      fab
      icon
      @click.stop="scrollTop"
    >
      <v-icon>
        mdi-arrow-up
      </v-icon>
    </v-btn>

    <v-card
      flat
      tile
      width="100%"
      color="primary"
    >
      <v-card-text
        class="white--text py-2"
      >
        <div>
          <strong>Uniform</strong> - {{ new Date().getFullYear() }}
        </div>
        <div>
          <small>v1.0.2</small>
        </div>
      </v-card-text>
    </v-card>
  </v-footer>

</template>

<style lang="scss" scoped>
.v-footer {
  z-index: 4; // we need to put footer above most other floating sections but not over alerts so level 4 should work
}

.scroll-top {
  z-index: 5;
  position: fixed;
  right: 15px;
  bottom: 0px;
}
</style>

<script>
import goTo from 'vuetify/lib/services/goto'
import {bus} from '@/services/bus';

export default {
  name: 'main-footer',

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
