<!-- render data for any given field based on field type and properties -->
<template>

  <div>

    <div
      v-if="field.type === 'link'"
    >

      <entity-field-view-label
        :field="field"
      />
      <entity-field-view-link
        :repository="repository"
        :item="item"
        :value="value"
        :field="field"
      />

    </div>
    <div
      v-else-if="field.type === 'self-reference'"
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
        v-if="attribute.key"
        :name="`${fieldKey}.${attribute.key}`"
        :set="val = value[attribute.key]"
      >

        <entity-field-view-label
          :field="{...field,...{label:`${field.label}.${attribute.key}`,optional:true}}"
        />
        <small
          v-if="!val || val.length <= 0"
        >
          <i>
            &lt;{{ translate('$vuetify.empty') }}&gt;
          </i>
        </small>
        <span
          v-else
        >
          {{ val }}
        </span>
      </slot>
      <slot
        v-else
        :name="`${fieldKey}.skeleton-loader`"
        :set="val = value[attribute.key]"
      >
        <v-skeleton-loader type="sentences" />
      </slot>
    </div>
    <div
      v-else-if="field.type === 'boolean'"
    >

      <entity-field-view-label
        :field="field"
      />
      {{ translate(value ? '$vuetify.app.boolean.trueTitle' : '$vuetify.app.boolean.falseTitle') }}

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
          &lt;{{ translate('$vuetify.empty') }}&gt;
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
import {formatBoolean, formatDate, formatDatetime} from '../../plugins/base/vuetify';
import EntityFieldViewLabel from './EntityFieldViewLabel';
import EntityFieldViewLink from './EntityFieldViewLink';
import EntityFieldViewSelfReference from './EntityFieldViewSelfReference';

export default {
  name: 'entity-field-view',
  components: {EntityFieldViewSelfReference, EntityFieldViewLink, EntityFieldViewLabel},
  props: {
    repository: null,
    field: null,
    attribute: null,
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
