<!-- render data for any given field based on field type and properties -->
<template>

  <div>

    <div
      v-if="field.type === 'linkId'"
    >
      <div>
        <strong>
          {{ translate(field.label) }}
        </strong>
      </div>
      <a
        v-if="value"
        :href="`${field.linkRepository.viewPagePrefix}/${value}`"
      >
        {{ item[field.linkLabelFieldKey] }}
      </a>
      <small
        v-else
      >
        <i>
          empty
        </i>
      </small>
    </div>
    <div
      v-else-if="field.type === 'selfReferenceId'"
    >
      <div>
        <strong>
          {{ translate(field.label) }}
        </strong>
      </div>
      <a
        v-if="value"
        :href="`${parentRepository.viewPagePrefix}/${value}`"
      >
        {{ item[field.selfReferenceLabelFieldKey] }}
      </a>
      <small
        v-else
      >
        <i>
          &lt;{{ translate('custom.empty') }}&gt;
        </i>
      </small>
    </div>
    <div
      v-else-if="field.type === 'attributes'"
    >
      <slot
        v-for="(val, key) in value"
        :name="`${fieldKey}.${key}`"
      >
        <div
          v-bind:key="key"
        >
          <strong>
            {{ translate(`${field.label}.${key}`) }}
          </strong>
        </div>
        {{ val }}
      </slot>
    </div>
    <div
      v-else
    >
      <div>
        <strong>
          {{ translate(field.label) }}
        </strong>
      </div>
      {{ doFormat(field, value) }}
    </div>

  </div>

</template>

<script>
import {formatBoolean, formatDate, formatDatetime} from '../plugins/vuetify';

export default {
  name: 'entity-field-view',

  props: {
    parentRepository: null,
    field: null,
    value: null,
    item: null,
    fieldKey: null,
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
  },
};
</script>
