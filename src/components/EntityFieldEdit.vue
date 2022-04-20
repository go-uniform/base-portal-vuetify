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
      v-else-if="field.type === 'selfReferenceId'"
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
    parentRepository: null,
    field: null,
    value: null,
    item: null,
    fieldKey: null,
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
  },

  mounted() {
    let repository = null;

    if (this.field) {
      if (this.field.linkRepository) {
        repository = this.field.linkRepository;
      } else if (this.field.type === 'selfReferenceId') {
        repository = this.parentRepository;
      }
    }

    if (repository) {
      repository.list().then((response) => {
        this.linkItems = response.items.map((item) => {
          let text = '';
          if (this.field.textAssemblyCallback) {
            text = this.field.textAssemblyCallback(item);
          } else {
            text = item.name || item.text;
          }
          return {
            value: item.id,
            text: text,
          }
        });
        this.linkItems = this.linkItems.filter((item) => {
          return item.value !== this.item.id;
        });
        this.$forceUpdate();
      });
    }
  },
};
</script>
