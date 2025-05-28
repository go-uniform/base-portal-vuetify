<template>

  <main-layout
    :crumbs="crumbs"
    :actions="actions"
    :loading="loading"
  >

    <v-alert type="info">
      This is where we test our developing components. It is a shared space so please be courteous to others.
    </v-alert>

    <div>Timezone: {{timezone}}</div>
    <div>Datetime: {{datetime}}</div>

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
      <v-expansion-panel>

        <v-expansion-panel-header>
          TimezoneSelector
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <timezone-selector
              v-model="timezone"
          />
        </v-expansion-panel-content>

      </v-expansion-panel>
      <v-expansion-panel>

        <v-expansion-panel-header>
          DatetimeSelector | Default
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <datetime-selector
              v-model="datetime"
          />
        </v-expansion-panel-content>

      </v-expansion-panel>
      <v-expansion-panel>

        <v-expansion-panel-header>
          DatetimeSelector | Default | Seconds
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <datetime-selector
              v-model="datetime"
              show-seconds
          />
        </v-expansion-panel-content>

      </v-expansion-panel>
      <v-expansion-panel>

        <v-expansion-panel-header>
          DatetimeSelector | Default | Milliseconds
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <datetime-selector
              v-model="datetime"
              show-milliseconds
          />
        </v-expansion-panel-content>

      </v-expansion-panel>
      <v-expansion-panel>

        <v-expansion-panel-header>
          DatetimeSelector | Timezone
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <datetime-selector
              v-model="datetime"
              :timezone.sync="timezone"
              show-timezone
          />
        </v-expansion-panel-content>

      </v-expansion-panel>
      <v-expansion-panel>

        <v-expansion-panel-header>
          DatetimeSelector | Timezone | Seconds
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <datetime-selector
              v-model="datetime"
              :timezone.sync="timezone"
              show-timezone
              show-seconds
          />
        </v-expansion-panel-content>

      </v-expansion-panel>
      <v-expansion-panel>

        <v-expansion-panel-header>
          DatetimeSelector | Timezone | Milliseconds
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <datetime-selector
              v-model="datetime"
              :timezone.sync="timezone"
              show-timezone
              show-milliseconds
          />
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
import TimezoneSelector from "../../components/base/TimezoneSelector";
import DatetimeSelector from "../../components/base/DatetimeSelector";
import moment from "moment";

export default {
  name: 'DevelopmentPage',
  computed: {
    moment() {
      return moment
    }
  },
  components: {
    LanguageSelector,
    ThemeSelector,
    TimezoneSelector,
    DatetimeSelector,
    MainLayout,
  },

  data: () => ({
    crumbs: [],
    actions: [],
    loading: true,
    timezone: null,
    datetime: null,
  }),

  methods: {
    updateLoadingIndicator(value) {
      this.loading = value;
    },
  },
};
</script>
