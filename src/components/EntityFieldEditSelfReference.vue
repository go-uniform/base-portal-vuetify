<template>

  <v-autocomplete
    item-color="accent white--text"
    color="accent"
    :value="value"
    :items="linkItems"
    clearable
    :rules="[rules.required(field.optional)]"
    @input="input"
    filled
  ></v-autocomplete>

</template>

<script>
import {validations} from '../services/base/validations';

export default {
  name: 'entity-field-edit-self-reference',
  props: {
    repository: null,
    field: null,
    value: null,
    item: null,
  },

  data: () => ({
    linkItems: null,
    rules: {
      required: validations.required,
    }
  }),

  methods: {
    input(value) {
      this.$emit('input', value);
    },

    getMultiValue(subValue) {
      if (!subValue) {
        return [];
      }
      if (subValue.constructor === Array) {
        return subValue;
      }
      return [subValue];
    },
  },

  mounted() {
    this.repository.list().then((response) => {
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
  },
};
</script>
