<!-- render data for any given field based on field type and properties -->
<template>

  <div>

    <div
      v-if="field.type === 'linkId'"
    >

      <entity-field-view-label
        :field="field"
      />
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

      <entity-field-view-label
        :field="field"
      />
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
      v-else-if="field.type === 'boolean'"
    >

      <entity-field-view-label
        :field="field"
      />
      {{ translate(value ? 'base.app.boolean.trueTitle' : 'base.app.boolean.falseTitle') }}

    </div>
    <div
      v-else-if="field.type === 'enumeration'"
    >

      <entity-field-view-label
        :field="field"
      />
      {{ translate(getEnumValue(value).title) }}

    </div>
    <div
      v-else
    >

      <entity-field-view-label
        :field="field"
      />
      {{ doFormat(field, value) }}

    </div>

  </div>

</template>

<script>
import {formatBoolean, formatDate, formatDatetime} from '../plugins/vuetify';
import EntityFieldViewLabel from './EntityFieldViewLabel';

export default {
  name: 'entity-field-view',
  components: {EntityFieldViewLabel},
  props: {
    parentRepository: null,
    field: null,
    value: null,
    item: null,
    fieldKey: null,
  },

  methods: {
    getEnumValue(value) {
      let enumValue = this.field.values.filter((item) => { return item.value === value })[0];
      if (!enumValue) {
        enumValue = this.field.values.filter((item) => { return item.value === this.field.defaultValue })[0];
      }
      return enumValue;
    },

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
