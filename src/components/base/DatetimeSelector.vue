<template>

  <div>

    <timezone-selector/>
    <v-menu
      v-model="menuDate"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          label="Date"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        @input="menuDate = false"
      ></v-date-picker>
    </v-menu>
    <v-menu
      ref="menu"
      v-model="menuTime"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value.sync="time"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="time"
          label="Time"
          prepend-icon="mdi-clock-time-four-outline"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-time-picker
        v-if="menuTime"
        v-model="time"
        full-width
        format="24hr"
        @click:minute="$refs.menu.save(time)"
      ></v-time-picker>
    </v-menu>

  </div>

</template>

<script>
import TimezoneSelector from "./TimezoneSelector";

export default {
  name: 'datetime-selector',
  components: {
    TimezoneSelector,
  },

  data: () => ({
    time: null,
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    datetime: null,
    menuTime: false,
    menuDate: false,
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
