<template>

  <v-app>

    <main-header/>
    <main-menu/>
    <v-main
      v-scroll="onScroll"
    >

      <main-toolbar
        :crumbs="crumbs"
        :actions="actions"
        :bulk-actions="bulkActions"
        :bulk-action-handler="bulkActionHandler"
      />
      <div
        class="pa-8"
      >
        <slot></slot>
      </div>
      <div
        class="footer-placeholder"
      >
      </div>

    </v-main>
    <main-footer/>
    <toast-bar/>
    <cookie-consent/>
    <connection-lost/>
    <confirm-box/>

  </v-app>

</template>

<style lang="scss" scoped>
// since footer is floating we need to ensure that we hold a space for it to float into once fully scrolled down
.footer-placeholder {
  height: 62px;
}
</style>

<script lang="ts">
import Vue from 'vue';
import MainFooter from '@/components/MainFooter.vue';
import MainHeader from '@/components/MainHeader.vue';
import MainMenu from '@/components/MainMenu.vue';
import MainToolbar from '@/components/MainToolbar.vue';
import {bus} from '@/services/bus';
import CookieConsent from '@/components/CookieConsent.vue';
import ConnectionLost from '@/components/ConnectionLost.vue';
import ConfirmBox from '@/components/ConfirmBox.vue';
import ToastBar from '@/components/ToastBar.vue';

let globalShowScrollTopBtn = false;

export default Vue.extend({
  name: 'main-layout',
  components: {ToastBar, ConfirmBox, ConnectionLost, MainToolbar, MainHeader, MainFooter, MainMenu, CookieConsent},

  props: {
    crumbs: Array,
    actions: Array,
    bulkActions: Array,
    bulkActionHandler: Function,
  },

  methods: {
    onScroll(e: { target: { scrollTop: any; }; }) {
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
