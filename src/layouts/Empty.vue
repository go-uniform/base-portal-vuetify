<template>

  <v-app>

    <slot name="header"/>
    <v-main
      class="fill-height"
    >

      <v-layout
        justify-center
        align-center
        fill-height
      >

        <slot></slot>

      </v-layout>

    </v-main>
    <main-footer/>
    <toast-bar/>
    <cookie-consent/>
    <connection-lost/>
    <confirm-box/>

  </v-app>

</template>

<style lang="scss">
form.mw-320 {
  max-width: 320px;
}
</style>

<script lang="ts">
import Vue from 'vue';
import MainFooter from '@/components/MainFooter.vue';
import CookieConsent from '@/components/CookieConsent.vue';
import ConnectionLost from '@/components/ConnectionLost.vue';
import ConfirmBox from '@/components/ConfirmBox.vue';
import ToastBar from '@/components/ToastBar.vue';

export default Vue.extend({
  name: 'empty-layout',
  components: {ToastBar, ConfirmBox, MainFooter, CookieConsent, ConnectionLost},
});
</script>

