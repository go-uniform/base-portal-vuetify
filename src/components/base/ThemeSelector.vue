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
          :class="{'theme-selector': true, 'theme-selector-inline': inline }"
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
.theme-selector {
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 5;
}
.theme-selector-inline {
  position: relative;
  right: auto;
  top: auto;
  z-index: auto;
}
</style>

<script>
import {hasDark, hasLight} from '@/plugins/theme';

export default {
  name: 'theme-selector',

  props: {
    inline: Boolean,
  },

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

  created() {
    if (window && window.localStorage) {
      const themeDark = window.localStorage.getItem('theme.dark');
      if (themeDark === null) {
        window.localStorage.setItem('theme.dark', this.$vuetify.theme.dark.toString());
      }
    }
  }
}
</script>
