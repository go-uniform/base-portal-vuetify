<template>

  <v-footer
    padless
    class="text-center"
    fixed
  >
    <language-selector/>
    <scroll-top-button/>

    <v-card
      flat
      tile
      width="100%"
      color="primary"
      class="d-flex align-center"
    >
      <v-card-text
        class="white--text py-2"
        v-html="translate('$vuetify.app.footerContent')"
      >
      </v-card-text>
    </v-card>
  </v-footer>

</template>

<style lang="scss" scoped>
.v-footer {
  z-index: 4; // we need to put footer above most other floating sections but not over alerts so level 4 should work

  .v-card {
    min-height: 62px;
  }
}
</style>

<script>
import LanguageSelector from '@/components/base/LanguageSelector';
import ScrollTopButton from '@/components/base/ScrollTopButton';

export default {
  name: 'main-footer',
  components: {ScrollTopButton, LanguageSelector},
}
</script>
