<template>

  <div>

    <v-autocomplete
      label="Timezone"
      prepend-icon="mdi-map-clock"
      :items="timezones"
      v-model="timezone"
    >
      <template v-slot:item="data">
        <template v-if="typeof data.item !== 'object'">
          <v-list-item-content v-text="data.item"></v-list-item-content>
        </template>
        <template v-else>
          <v-list-item-content>
            <v-list-item-title>
              <span class="grey--text text--lighten-1">({{ data.item.utc }})</span>&nbsp;{{ data.item.name }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text>
              <span class="grey--text text--lighten-1">{{ data.item.time }}</span>
            </v-list-item-action-text>
          </v-list-item-action>
        </template>
      </template>
    </v-autocomplete>

  </div>

</template>

<script>
import {loadTimezones} from "../../locale/base/timezones";

export default {
  name: 'timezone-selector',

  data: () => ({
    timezones: loadTimezones(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
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
