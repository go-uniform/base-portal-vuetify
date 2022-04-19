<template>

  <div>
    <v-menu
      v-if="field.type === 'datetime'"
      v-model="datePicker"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template
        v-slot:activator="{ on, attrs }"
      >
        <v-text-field
          :value="display"
          :label="translate(field.label)"
          readonly
          clearable
          filled
          v-bind="attrs"
          v-on="on"
          @click:clear="dates = []"
        >
        </v-text-field>
      </template>
      <v-date-picker
        v-model="dates"
        range
        @change="update"
      >
      </v-date-picker>
    </v-menu>
    <span
      v-else
    >
      todo: implement filter type
    </span>
  </div>

</template>
<script>
import {bus} from '../services/base/bus';

export default {
  name: 'entity-list-filter-field',

  props: {
    field: null,
    value: null,
  },

  computed: {
    display() {
      if (!this.dates) {
        return '';
      }
      return this.dates.join(' - ');
    },
  },

  data: () => ({
    datePicker: false,
    dates: [],
  }),

  watch: {
    datePicker(value) {
      if (!value && this.dates && this.dates.length < 2) {
        this.dates = [];
      }
    },
  },

  methods: {
    update() {
      this.$emit('input', this.dates);
    },
  },

  created() {
    bus.subscribe('filters.reset', () => {
      this.dates = [];
    });
  }
}
</script>
