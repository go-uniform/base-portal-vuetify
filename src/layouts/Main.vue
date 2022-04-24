<template>

  <v-app>

    <main-header/>
    <main-menu/>
    <v-main
      v-scroll="onScroll"
    >

      <v-layout
        fill-height
        justify-start
        align-center
        column
      >

        <div
          style="width:100%"
        >
          <main-toolbar
            :crumbs="crumbs"
            :actions="actions"
            :bulk-actions="bulkActions"
            :bulk-action-handler="bulkActionHandler"
            :loading="loading"
          />
        </div>
        <div
          style="width:100%"
          class="pa-2 pa-sm-4 pa-lg-8 flex-grow-1"
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
          style="width:100%"
          class="footer-placeholder"
        >
        </div>

      </v-layout>

    </v-main>
    <main-footer/>
    <toast-bar/>
    <cookie-consent/>
    <connection-lost/>
    <confirm-box/>
    <v-dialog
      fullscreen
      persistent
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
          <div>
            Loading...
          </div>
        </v-layout>
      </v-card>
    </v-dialog>

  </v-app>

</template>

<script lang="ts">
import Vue from 'vue';
import MainFooter from '@/components/MainFooter.vue';
import MainHeader from '@/components/MainHeader.vue';
import MainMenu from '@/components/MainMenu.vue';
import MainToolbar from '@/components/MainToolbar.vue';
import {bus} from '@/services/base/bus';
import CookieConsent from '@/components/CookieConsent.vue';
import ConnectionLost from '@/components/ConnectionLost.vue';
import ConfirmBox from '@/components/ConfirmBox.vue';
import ToastBar from '@/components/ToastBar.vue';

let globalShowScrollTopBtn = false;

export default Vue.extend({
  name: 'main-layout',
  components: {ToastBar, ConfirmBox, ConnectionLost, MainToolbar, MainHeader, MainFooter, MainMenu, CookieConsent},

  props: {
    alignStart: Boolean,
    alignEnd: Boolean,
    alignBaseline: Boolean,
    alignContentStart: Boolean,
    alignContentCenter: Boolean,
    alignContentEnd: Boolean,
    alignContentSpaceAround: Boolean,
    alignContentSpaceBetween: Boolean,

    justifyCenter: Boolean,
    justifyEnd: Boolean,
    justifySpaceAround: Boolean,
    justifySpaceBetween: Boolean,

    fillHeight: {
      default: true,
      type: Boolean,
    },
    row: Boolean,

    crumbs: Array,
    actions: Array,
    bulkActions: Array,
    bulkActionHandler: Function,

    loading: Boolean,
  },

  computed: {
    column() {
      return !this.row;
    },
    justifyStart() {
      return !this.justifyCenter
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
