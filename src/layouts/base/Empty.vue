<template>

  <v-app>

    <v-main
      class="fill-height"
      v-scroll="onScroll"
    >

      <v-layout
        fill-height
        justify-start
        align-center
        column
      >

        <div
          class="fill-width"
        >
          <slot name="header">
          </slot>
        </div>
        <div
          class="fill-content"
          :class="{'pa-2 pa-sm-4 pa-lg-8 flex-grow-1': !noPadding}"
        >
          <v-layout
            :fill-height="fillHeight"
            :align-start="alignStart"
            :align-center="alignCenter"
            :align-end="alignEnd"
            :align-baseline="alignBaseline"
            :align-content-start="alignContentStart"
            :align-content-center="alignContentCenter"
            :align-content-end="alignContentEnd"
            :align-content-space-around="alignContentSpaceAround"
            :align-content-space-between="alignContentSpaceBetween"
            :justify-start="justifyStart"
            :justify-center="justifyCenter"
            :justify-end="justifyEnd"
            :justify-space-around="justifySpaceAround"
            :justify-space-between="justifySpaceBetween"
            :row="row"
            :column="column"
          >
            <slot></slot>
          </v-layout>
        </div>
        <div
          class="footer-placeholder fill-width"
          v-if="!disableFooterPlaceholder"
        >
        </div>

      </v-layout>

    </v-main>
    <main-footer/>
    <toast-bar/>
    <cookie-consent/>
    <connection-lost/>
    <confirm-box/>
    <theme-selector/>

  </v-app>

</template>

<style lang="scss">
form.mw-320 {
  max-width: 320px;
}
</style>

<script lang="ts">
import Vue from 'vue';
import MainFooter from '@/components/base/MainFooter.vue';
import CookieConsent from '@/components/base/CookieConsent.vue';
import ConnectionLost from '@/components/base/ConnectionLost.vue';
import ConfirmBox from '@/components/base/ConfirmBox.vue';
import ToastBar from '@/components/base/ToastBar.vue';
import {bus} from '@/services/base/bus';
import ThemeSelector from '@/components/base/ThemeSelector.vue';

let globalShowScrollTopBtn = false;

export default Vue.extend({
  name: 'empty-layout',
  components: {ThemeSelector, ToastBar, ConfirmBox, MainFooter, CookieConsent, ConnectionLost},

  props: {
    disableFooterPlaceholder: Boolean,

    alignStart: Boolean,
    alignEnd: Boolean,
    alignBaseline: Boolean,
    alignContentStart: Boolean,
    alignContentCenter: Boolean,
    alignContentEnd: Boolean,
    alignContentSpaceAround: Boolean,
    alignContentSpaceBetween: Boolean,

    justifyStart: Boolean,
    justifyEnd: Boolean,
    justifySpaceAround: Boolean,
    justifySpaceBetween: Boolean,

    fillHeight: {
      default: true,
      type: Boolean,
    },
    row: Boolean,
    noPadding: Boolean,
  },

  computed: {
    column() {
      return !this.row;
    },
    justifyCenter() {
      return !this.justifyStart
        && !this.justifyEnd
        && !this.justifySpaceAround
        && !this.justifySpaceBetween;
    },
    alignCenter() {
      return !this.alignStart
        && !this.alignEnd
        && !this.alignBaseline
        && !this.alignContentStart
        && !this.alignContentCenter
        && !this.alignContentEnd
        && !this.alignContentSpaceAround
        && !this.alignContentSpaceBetween;
    },

  },

  methods: {
    onScroll(e: { target: { scrollTop: number; }; }) {
      if (typeof window === 'undefined') {
        return;
      }
      const top = window.pageYOffset || e.target.scrollTop || 0;
      const showScrollTopBtn = top > 20;

      if ((globalShowScrollTopBtn && !showScrollTopBtn) || (!globalShowScrollTopBtn && showScrollTopBtn)) {
        globalShowScrollTopBtn = showScrollTopBtn;
        bus.publish('window.scrollTopBtn', globalShowScrollTopBtn);
      }
    }
  },
});
</script>

