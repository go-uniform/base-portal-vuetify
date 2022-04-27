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
        <entity-field-view-label
          :field="field"
          hide-required
        />
        <v-text-field
          :value="display"
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
    <div
      v-else-if="field.type === 'enumeration'"
    >
      <entity-field-view-label
        :field="field"
        hide-required
      />
      <v-autocomplete
        item-color="accent white--text"
        color="accent"
        :value="value"
        :items="prefixNotSetValue(field.values, 'title')"
        :item-text="(item) => {return translate(item.title)}"
        item-value="value"
        clearable
        filled
        multiple
        @change="update"
      >
      </v-autocomplete>
    </div>
    <div
      v-else-if="field.type === 'boolean'"
    >
      <entity-field-view-label
        :field="field"
        hide-required
      />
      <v-autocomplete
        item-color="accent white--text"
        color="accent"
        :value="value"
        :items="getBooleanValues()"
        item-text="text"
        item-value="value"
        clearable
        filled
        multiple
        @change="update"
      >
      </v-autocomplete>
    </div>
    <span
      v-else
    >
      {{ translate('$vuetify.errors.missingFilterType', field.type) }}
    </span>
  </div>

</template>
<script>
import {bus} from '../../services/base/bus';
import EntityFieldViewLabel from './EntityFieldViewLabel';
import {translate} from '../../plugins/base/vuetify';

export default {
  name: 'entity-list-filter-field',
  components: {EntityFieldViewLabel},
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
    update($event) {
      this.$emit('input', $event);
    },

    prependArray(array, value) {
      const newArray = new Array(value);
      array.forEach((item) => {
        newArray.push(item);
      });
      return newArray;
    },

    prefixNotSetValue(items, textKey = 'text') {
      const item = {
        value: null,
      };
      item[textKey] = translate('$vuetify.app.optionNotSetTitle');
      return this.prependArray(items, item);
    },

    getBooleanValues() {
      return this.prefixNotSetValue([
        {
          value: true,
          text: translate('$vuetify.app.boolean.trueTitle')
        },
        {
          value: false,
          text: translate('$vuetify.app.boolean.falseTitle')
        }
      ]);
    }
  },

  created() {
    bus.subscribe('filters.reset', () => {
      this.dates = [];
    });
  }
}
</script>
