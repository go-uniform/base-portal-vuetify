<!-- render data for any given field based on field type and properties -->
<template>

  <div>

    <div
      v-if="field.type === 'linkId'"
    >
      <a
        :href="`${field.linkRepository.viewPagePrefix}/${item[fieldKey]}`"
      >
        {{ item[field.linkLabelFieldKey] }}
      </a>
    </div>
    <div
      v-else
    >
      {{ doFormat(fieldKey, field, item) }}
    </div>

  </div>

</template>

<script>
import {formatBoolean, formatDate, formatDatetime} from '../plugins/vuetify';

export default {
  name: 'entity-field-view',

  props: {
    fieldKey: null,
    field: null,
    item: null,
  },

  methods: {
    doFormat(key, field, item) {
      let value = item[key];
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
