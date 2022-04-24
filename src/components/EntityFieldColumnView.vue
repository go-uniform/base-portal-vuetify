<!-- render short data version for any given field based on field type and properties -->
<!-- used mainly for tabular display of values -->
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
      v-else-if="field.type === 'selfReferenceId'"
    >
      <a
        :href="`${parentRepository.viewPagePrefix}/${value}`"
      >
        {{ item[field.selfReferenceLabelFieldKey] }}
      </a>
    </div>
    <div
      v-else-if="field.type === 'attributes'"
    >
      <small><i>attributes are not supported on table list views</i></small>
    </div>
    <div
      v-else-if="field.type === 'boolean'"
    >
      <v-icon
        v-if="value === true && !field.inverted"
        :color="translate('base.app.boolean.colorTrue')"
      >
        {{ translate('base.app.boolean.iconTrue') }}
      </v-icon>
      <v-icon
        v-else
        :color="translate('base.app.boolean.colorFalse')"
      >
        {{ translate('base.app.boolean.iconFalse') }}
      </v-icon>
    </div>
    <div
      v-else
    >
      {{ doFormat() }}
    </div>

  </div>

</template>

<script>
import {formatBoolean, formatDate, formatDatetime} from '../plugins/vuetify';

export default {
  name: 'entity-field-column-view',

  props: {
    parentRepository: null,
    field: null,
    value: null,
    item: null,
    fieldKey: null,
  },

  methods: {
    doFormat() {
      switch (this.field.type) {
        case "boolean":
          return formatBoolean(this.value);
        case "date":
          return formatDate(this.value);
        case "datetime":
          return formatDatetime(this.value);
      }
      return this.value;
    },
  }
};
</script>
