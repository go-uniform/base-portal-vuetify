<template>

  <main-layout
    :crumbs="crumbs"
    :actions="actions"
    :loading="loading"
  >

    <v-alert type="info">
      This is where we test our developing components. It is a shared space so please be courteous to others.
    </v-alert>

    <v-expansion-panels>

      <v-expansion-panel>

        <v-expansion-panel-header>
          ThemeSelector
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <theme-selector :inline="true" />
        </v-expansion-panel-content>

      </v-expansion-panel>
      <v-expansion-panel>

        <v-expansion-panel-header>
          LanguageSelector
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <language-selector :inline="true" />
        </v-expansion-panel-content>

      </v-expansion-panel>

    </v-expansion-panels>

  </main-layout>

</template>

<script>
// @ is an alias to /src
import MainLayout from '../../layouts/base/Main';
import ThemeSelector from "../../components/base/ThemeSelector";
import LanguageSelector from "../../components/base/LanguageSelector";

export default {
  name: 'DevelopmentPage',
  components: {
    LanguageSelector,
    ThemeSelector,
    MainLayout,
  },

  data: () => ({
    crumbs: [],
    actions: [],
    loading: true,
  }),

  methods: {
    updateLoadingIndicator(value) {
      this.loading = value;
    }
  },
};
</script>
