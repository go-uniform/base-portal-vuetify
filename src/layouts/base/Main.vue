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
          class="fill-width"
        >
          <main-toolbar
            :crumbs="crumbs"
            :actions="actions"
            :bulk-actions="bulkActions"
            :bulk-action-handler="bulkActionHandler"
            :loading="loading"
          />
          <slot name="header"></slot>
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
            wrap
          >
            <slot></slot>
          </v-layout>
        </div>
        <div
          class="footer-placeholder fill-width"
        >
        </div>

      </v-layout>

    </v-main>
    <main-footer/>
    <toast-bar/>
    <cookie-consent/>
    <connection-lost/>
    <confirm-box/>
    <loading-indicator/>

  </v-app>

</template>

<script lang="ts">
import Vue from 'vue';
import MainFooter from '@/components/base/MainFooter.vue';
import MainHeader from '@/components/base/MainHeader.vue';
import MainMenu from '@/components/base/MainMenu.vue';
import MainToolbar from '@/components/base/MainToolbar.vue';
import {bus} from '@/services/base/bus';
import CookieConsent from '@/components/base/CookieConsent.vue';
import ConnectionLost from '@/components/base/ConnectionLost.vue';
import ConfirmBox from '@/components/base/ConfirmBox.vue';
import ToastBar from '@/components/base/ToastBar.vue';
import LoadingIndicator from '@/components/base/LoadingIndicator.vue';

let globalShowScrollTopBtn = false;

export default Vue.extend({
  name: 'main-layout',
  components: {
    LoadingIndicator,
    ToastBar, ConfirmBox, ConnectionLost, MainToolbar, MainHeader, MainFooter, MainMenu, CookieConsent
  },

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
    noPadding: Boolean,
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
