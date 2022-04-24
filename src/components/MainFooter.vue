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
    >
      <v-card-text
        class="white--text py-2"
      >
        <div>
          <strong>{{ translate('base.app.title') }}</strong> - {{ new Date().getFullYear() }}
        </div>
        <div>
          <small>v1.0.2</small>
        </div>
      </v-card-text>
    </v-card>
  </v-footer>

</template>

<style lang="scss" scoped>
.v-footer {
  z-index: 4; // we need to put footer above most other floating sections but not over alerts so level 4 should work
}
</style>

<script>
import LanguageSelector from '@/components/LanguageSelector';
import ScrollTopButton from '@/components/ScrollTopButton';

export default {
  name: 'main-footer',
  components: {ScrollTopButton, LanguageSelector},
}
</script>
