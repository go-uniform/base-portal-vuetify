<template>

  <div
  >
    <v-menu
      top
    >
      <template v-slot:activator="{ on, attrs }">
        <div
          v-bind="attrs"
          v-on="on"
          class="language-selector"
        >
          <v-btn
            class="hidden-xs-only"
            color="secondary"
            large
          >
            <v-icon>
              mdi-web
            </v-icon>
            <span
              class="ml-2"
            >
              {{ languageText }}
            </span>
          </v-btn>
          <v-icon
            class="pa-2 hidden-sm-and-up"
            dark
          >
            mdi-web
          </v-icon>
        </div>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in languages"
          :key="index"
          :disabled="item.value === language"
          @click="selectLanguage(item.value)"
        >
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>

</template>

<style lang="scss" scoped>
.language-selector {
  position: fixed;
  left: 10px;
  bottom: 10px;
  z-index: 5;
}
</style>

<script>
import {languages} from '@/plugins/locales';

export default {
  name: 'language-selector',

  data: () => ({
    show: true,
    language: 'en',
    languageText: 'English',
    languages: [],
  }),

  methods: {
    selectLanguage(lang) {
      if (this.$vuetify.lang.current !== lang) {
        if (languages.filter(language => language.value === lang).length > 0) {
          this.$vuetify.lang.current = lang;
          this.language = lang;
          this.languageText = languages.filter(language => language.value === this.language)[0].text;

          if (window && window.localStorage) {
            window.localStorage.setItem('lang', lang);
          }

          location.reload();
        }
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
