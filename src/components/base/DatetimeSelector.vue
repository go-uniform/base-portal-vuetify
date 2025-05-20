<template>


  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >

    <template v-slot:activator="{ on, attrs }">

      <v-text-field
        prepend-icon="mdi-web-clock"
        placeholder="Select a datetime"
        readonly
        clearable
        v-bind="attrs"
        v-on="on"
        v-model="datetime"
        @click:clear="clear"
      />

    </template>
    <v-card>

      <v-card-title class="text-h5 primary lighten-2">
        Select a datetime
      </v-card-title>
      <v-card-text class="py-8">

        <timezone-selector />
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
            :use-seconds="this.useSeconds"
            @click:hour="saveTime"
            @click:minute="saveTime"
            @click:second="saveTime"
          ></v-time-picker>
        </v-menu>

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="dialog = false"
        >
          Cancel
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="saveDatetime"
          :disabled="!date || !time"
        >
          Save
        </v-btn>
      </v-card-actions>

    </v-card>

  </v-dialog>

</template>

<script>
import TimezoneSelector from "./TimezoneSelector";

export default {
  name: 'datetime-selector',
  props: {
    useSeconds: Boolean,
  },
  components: {
    TimezoneSelector,
  },

  data: () => ({
    dialog: false,
    menuTime: false,
    menuDate: false,

    timezone: null,
    utc: '+02:00',
    date: null,
    time: null,

    datetime: null,
  }),

  methods: {
    clear() {
      this.date = null;
      this.time = null;
      this.datetime = null;
    },
    saveDatetime() {
      console.log(this.timezone);
      this.datetime = '';
      if (this.useSeconds) {
        this.datetime = this.date + 'T' + this.time + this.utc;
      } else {
        this.datetime = this.date + 'T' + this.time +':00' + this.utc;
      }
      this.dialog = false;
    },
    saveTime() {
      if (this.time) {
        this.$refs.menu.save(this.time);
      }
    },
  },
}
</script>
