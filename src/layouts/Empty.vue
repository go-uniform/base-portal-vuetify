<template>

  <v-app>

    <slot name="header" />
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

  </v-app>

</template>

<script lang="ts">
import Vue from 'vue';
import MainFooter from '@/components/MainFooter.vue';
import CookieConsent from '@/components/CookieConsent.vue';
import ConnectionLost from '@/components/ConnectionLost.vue';

export default Vue.extend({
  name: 'empty-layout',
  components: {MainFooter, CookieConsent, ConnectionLost},
});
</script>

