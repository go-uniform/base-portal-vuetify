<!-- render data for any given field based on field type and properties -->
<template>

  <div>

    <div
      v-if="field.type === 'linkId'"
    >

      <entity-field-view-label
        :field="field"
      />
      <entity-field-view-link-id
        :repository="repository"
        :item="item"
        :value="value"
        :field="field"
      />

    </div>
    <div
      v-else-if="field.type === 'selfReferenceId'"
    >

      <entity-field-view-label
        :field="field"
      />
      <entity-field-view-self-reference
        :repository="repository"
        :item="item"
        :value="value"
        :field="field"
      />

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
          <div>
            <strong>
              {{ translate(`${field.label}.${key}`) }}
            </strong>
          </div>
          <small
            v-if="!val || val.length <= 0"
          >
            <i>
              &lt;{{ translate('custom.empty') }}&gt;
            </i>
          </small>
          <span
            v-else
          >
            {{ val }}
          </span>
        </div>
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
      <small
        v-if="!value || value.length <= 0"
      >
        <i>
          &lt;{{ translate('custom.empty') }}&gt;
        </i>
      </small>
      <span
        v-else
      >
        {{ doFormat(field, value) }}
      </span>

    </div>

  </div>

</template>

<script>
import {formatBoolean, formatDate, formatDatetime} from '../plugins/vuetify';
import EntityFieldViewLabel from './EntityFieldViewLabel';
import EntityFieldViewLinkId from './EntityFieldViewLinkId';
import EntityFieldViewSelfReference from './EntityFieldViewSelfReference';

export default {
  name: 'entity-field-view',
  components: {EntityFieldViewSelfReference, EntityFieldViewLinkId, EntityFieldViewLabel},
  props: {
    repository: null,
    field: null,
    value: null,
    item: null,
    fieldKey: null,
  },

  methods: {
    getEnumValue(subValue) {
      let enumValue = this.field.values.filter((item) => { return item.value === subValue })[0];
      if (!enumValue) {
        enumValue = this.field.values.filter((item) => { return item.value === this.field.defaultValue })[0];
      }
      return enumValue;
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
