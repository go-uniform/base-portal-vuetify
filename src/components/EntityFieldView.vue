<!-- render data for any given field based on field type and properties -->
<template>

  <div>

    <div
      v-if="field.type === 'linkId'"
    >
      <a
        :href="`${field.linkRepository.viewPagePrefix}/${value}`"
      >
        {{ item[field.linkLabelFieldKey] }}
      </a>
    </div>
    <div
      v-else
    >
      {{ doFormat(field, value) }}
    </div>

  </div>

</template>

<script>
import {formatBoolean, formatDate, formatDatetime} from '../plugins/vuetify';

export default {
  name: 'entity-field-view',

  props: {
    field: null,
    value: null,
    item: null,
  },

  methods: {
    doFormat(field, value) {
      switch (field.type) {
        case "boolean":
          value = formatBoolean(value);
          break
        case "date":
          value = formatDate(value);
          break
        case "datetime":
          value = formatDatetime(value);
          break
      }
      return value;
    },
  }
};
</script>
