<template>

  <v-app>

    <v-main>

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

  </v-app>

</template>

<script lang="ts">
import Vue from 'vue';
import MainFooter from '@/components/MainFooter.vue';

export default Vue.extend({
  name: 'empty-layout',
  components: {MainFooter},
});
</script>

