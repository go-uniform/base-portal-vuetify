<template>

  <div
  >

    <v-menu
      bottom
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="secondary"
          v-bind="attrs"
          v-on="on"
          class="language-selector"
        >
          <v-icon>
            mdi-theme-light-dark
          </v-icon>
          <span
            class="ml-2 hidden-xs-only"
          >
            {{ translate('base.app.theme') }}
          </span>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          @click="setThemeModeLight"
          :disabled="!$vuetify.theme.dark"
        >
          <v-list-item-title>{{ translate('base.app.lightMode') }}</v-list-item-title>
        </v-list-item>
        <v-list-item
          @click="setThemeModeDark"
          :disabled="$vuetify.theme.dark"
        >
          <v-list-item-title>{{ translate('base.app.darkMode') }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>

</template>

<style lang="scss" scoped>
.language-selector {
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 5;
}
</style>

<script>
import {languages} from '@/plugins/vuetify';

export default {
  name: 'theme-selector',

  data: () => ({
  }),

  methods: {
    setThemeModeDark() {
      this.$vuetify.theme.dark = true;
      if (window && window.localStorage) {
        window.localStorage.setItem('theme.dark', this.$vuetify.theme.dark.toString());
      }
    },

    setThemeModeLight() {
      this.$vuetify.theme.dark = false;
      if (window && window.localStorage) {
        window.localStorage.setItem('theme.dark', this.$vuetify.theme.dark.toString());
      }
    },
  },

  created() {
    this.language = this.$vuetify.lang.current;
    this.languages = languages;
    this.languageText = languages.filter(language => language.value === this.language)[0].text;
  }
}
</script>
