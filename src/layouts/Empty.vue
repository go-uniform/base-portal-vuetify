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

    <toast-bar/>

  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'empty-layout',
});
</script>

