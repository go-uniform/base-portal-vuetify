<template>

  <div
    v-if="hasThemes"
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
            {{ translate('$vuetify.app.theme') }}
          </span>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          @click="setThemeModeLight"
          :disabled="!$vuetify.theme.dark"
        >
          <v-list-item-title>{{ translate('$vuetify.app.lightMode') }}</v-list-item-title>
        </v-list-item>
        <v-list-item
          @click="setThemeModeDark"
          :disabled="$vuetify.theme.dark"
        >
          <v-list-item-title>{{ translate('$vuetify.app.darkMode') }}</v-list-item-title>
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
import {hasDark, hasLight} from '@/plugins/theme';

export default {
  name: 'theme-selector',

  data: () => ({
    hasThemes: hasDark && hasLight,
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
}
</script>
