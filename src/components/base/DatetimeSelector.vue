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
        :value="value"
        @input="$emit('input', $event)"
        @click="load"
        @click:clear="clear"
      />

    </template>
    <v-card>

      <v-card-title class="text-h5 primary lighten-2">
        Select a datetime
      </v-card-title>
      <v-card-text class="py-8">

        <timezone-selector
          v-if="showTimezone"
          v-model="tempTimezone"
          @input="getDatetime"
        />
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
              v-model="tempDate"
              label="Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="tempDate"
            @input="menuDate = false"
          ></v-date-picker>
        </v-menu>
        <v-menu
          ref="menu"
          v-model="menuTime"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="tempTime"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="tempTime"
              label="Time"
              prepend-icon="mdi-clock-time-four-outline"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menuTime"
            v-model="tempTime"
            full-width
            format="24hr"
            :use-seconds="this.showSeconds || this.showMilliseconds"
            @click:hour="saveTime"
            @click:minute="saveTime"
            @click:second="saveTime"
          ></v-time-picker>
        </v-menu>
        <v-text-field
            v-if="showMilliseconds"
            prepend-icon="mdi-timer-outline"
            label="Milliseconds"
            type="number"
            ref="milliseconds"
            v-model="tempMilliseconds"
            @keydown="enforceMillis"
            @mousedown="enforceMillisStep"
            @mouseup="enforceMillisStep"
            @blur="enforceMillisBlur"
            min="0"
            max="999"
        >
        </v-text-field>

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="cancel"
        >
          Cancel
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="saveDatetime"
          :disabled="!tempDate || !tempTime || !tempMilliseconds"
        >
          Save
        </v-btn>
      </v-card-actions>

    </v-card>

  </v-dialog>

</template>

<script>
import TimezoneSelector from "./TimezoneSelector";
import {findTimezoneByName} from "@/locale/base/timezones";
import moment from "moment/moment";

export default {
  name: 'datetime-selector',
  props: {
    showTimezone: Boolean,
    showSeconds: Boolean,
    showMilliseconds: Boolean,

    value: String,
    timezone: String,
  },

  components: {
    TimezoneSelector,
  },

  data: () => ({
    dialog: false,
    menuTime: false,
    menuDate: false,

    tempDatetime: null,
    tempTimezone: null,
    tempDate: null,
    tempTime: null,
    tempMilliseconds: null,
    timer: null,
  }),

  methods: {
    debounce(func, timeout = 300) {
      return (...args) => {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => { func.apply(this, args); }, timeout);
      };
    },
    clear() {
      this.tempDatetime = null;
      this.tempTimezone = null;
      this.load();
    },
    getDatetime() {
      if (!this.tempTime) return;
      if (this.tempTime.length < 8) {
        this.tempTime += ':00';
      }

      if (!this.tempMilliseconds) this.tempMilliseconds = 0;
      this.tempMilliseconds = parseInt(this.tempMilliseconds);
      if (this.tempMilliseconds > 999) this.tempMilliseconds = 999;
      if (this.tempMilliseconds < 0) this.tempMilliseconds = 0;
      this.tempMilliseconds = this.tempMilliseconds.toString().padStart(3, '0');

      let timezoneObject = findTimezoneByName(this.tempTimezone);
      this.tempDatetime = this.tempDate + 'T' + this.tempTime + '.' + this.tempMilliseconds + timezoneObject.utc;
    },
    saveDatetime() {
      this.getDatetime();

      this.$emit('input', this.tempDatetime);
      this.$emit('update:timezone', this.tempTimezone);

      this.dialog = false;
    },
    saveTime() {
      if (!this.tempTime)
        return;
      this.$refs.menu.save(this.tempTime);
    },
    enforceMillis(e) {
      let isLetter = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(e.key);
      let isDigit = "1234567890".includes(e.key);
      let isSpecial = "~!@#$%^&*()_+{}:\"<>?|`-=[];',./\\".includes(e.key);
      if (!isLetter && !isDigit && !isSpecial) return;

      let currentValue = this.tempMilliseconds ?? '';
      if (!e.returnValue) currentValue += e.key;
      else currentValue = e.key;
      let intValue = parseInt(currentValue);
      if (currentValue.length > 3 || intValue === undefined || intValue === null || intValue < 0 || intValue > 999)
      {
        e.preventDefault();
        return;
      }

      this.debounce(function() {
          this.getDatetime();
      }, 800)();
    },
    enforceMillisBlur() {
      clearTimeout(this.timer);
      this.getDatetime();
    },
    enforceMillisStep() {
      let currentValue = this.tempMilliseconds ?? '';

      let intValue = parseInt(currentValue);
      if (intValue === undefined || intValue === null || intValue < 0)
        this.tempMilliseconds = 0;
      if (currentValue.length > 3 || intValue >= 999)
        this.tempMilliseconds = 999;

      this.getDatetime();
    },
    load() {
      let datetime = moment();
      if (this.value)
        datetime = moment(this.value);

      this.tempTimezone = this.timezone;
      if (!this.timezone)
        this.tempTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      let tempTimezoneObject = findTimezoneByName(this.tempTimezone);
      datetime = datetime.utcOffset(tempTimezoneObject.offset / 60);

      this.tempDate = datetime.format('YYYY-MM-DD');
      this.tempTime = datetime.format('HH:mm:ss');
      this.tempMilliseconds = datetime.format('SSS');
      this.tempDatetime = datetime.format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    },
    cancel() {
      this.dialog = false;
    },
  },
}
</script>
