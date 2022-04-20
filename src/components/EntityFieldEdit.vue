<!-- render editing component for any given field based on field type and properties -->
<template>

  <div>

    <div
      v-if="field.type === 'linkId'"
    >
      <v-autocomplete
        :value="value"
        :label="translate(field.label)"
        :items="linkItems"
        :multiple="field.multiple"
        clearable
        :rules="[rules.required(field.optional)]"
        @input="input"
      ></v-autocomplete>
    </div>
    <div
      v-else-if="field.type === 'textarea'"
    >
      <v-textarea
        :value="value"
        :label="translate(field.label)"
        :counter="field.length"
        :maxlength="field.length"
        :rules="[rules.required(field.optional),rules.pattern(field.pattern, field.patternMessage),rules.length(field.length)]"
        @input="input"
      >
      </v-textarea>
    </div>
    <div
      v-else-if="field.type === 'attributes'"
    >
      <small><i>attributes are not supported on edit pages yet</i></small>
    </div>
    <div
      v-else
    >
      <v-text-field
        :value="value"
        :label="translate(field.label)"
        :counter="field.length"
        :maxlength="field.length"
        :rules="[rules.required(field.optional),rules.pattern(field.pattern, field.patternMessage),rules.length(field.length)]"
        @input="input"
      ></v-text-field>
    </div>

  </div>

</template>
<script>
import {validations} from '../services/base/validations';

export default {
  name: 'entity-field-edit',

  props: {
    fieldKey: null,
    field: null,
    value: null,
  },

  data: () => ({
    linkItems: [],
    rules: {
      required: validations.required,
      pattern: validations.pattern,
      length: validations.length,
    }
  }),

  methods: {
    input(value) {
      this.$emit('input', value);
    },


    links(key, field) {
      field.linkRepository.list().then((response) => {
        this.linkItems[key] = response.items.map((item) => {
          return {
            value: item.id,
            text: item.name,
          }
        });
        this.$forceUpdate();
      });
    },
  },

  mounted() {
    if (this.field && this.field.linkRepository) {
      this.field.linkRepository.list().then((response) => {
        this.linkItems = response.items.map((item) => {
          return {
            value: item.id,
            text: item.name,
          }
        });
        this.$forceUpdate();
      });
    }
  },
};
</script>
