<template>

  <v-app>

    <main-header/>
    <main-menu/>
    <v-main>

      <main-toolbar
        :crumbs="crumbs"
        :actions="actions"
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

export default Vue.extend({
  name: 'main-layout',
  components: {MainToolbar, MainHeader, MainFooter, MainMenu},

  props: {
    crumbs: Array,
    actions: Array,
  },
});
</script>
