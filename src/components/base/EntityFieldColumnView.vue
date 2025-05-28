<!-- render short data version for any given field based on field type and properties -->
<!-- used mainly for tabular display of values -->
<template>

  <div>

    <div
        v-if="field.type === 'link'"
    >
      <entity-field-view-link
          :tabular="true"
          :item="item"
          :value="value"
          :field="field"
      />
    </div>
    <div
        v-else-if="field.type === 'self-reference'"
    >
      <entity-field-view-self-reference
          :tabular="true"
          :repository="repository"
          :item="item"
          :value="value"
          :field="field"
      />
    </div>
    <div
        v-else-if="field.type === 'attributes'"
    >
      <small><i>attributes are not supported on table list views</i></small>
    </div>
    <div
        v-else-if="field.type === 'enumeration' || field.type === 'boolean'"
        :set:strValue="strValue = value === true && !field.inverted ? 'true' : 'false'"
        :set:enumValue="enumValue = field.type === 'enumeration' ?  getEnumValue(value) : {
        title: `$vuetify.app.boolean.${strValue}Title`,
        icon: `$vuetify.app.boolean.${strValue}Icon`,
        color: `$vuetify.app.boolean.${strValue}Color`
      }"
    >

      <div
          v-if="!field.textOnly && !field.iconOnly"
      >
        <v-icon
            :color="translate(enumValue.color)"
        >
          {{ translate(enumValue.icon) }}
        </v-icon>
        <span>
          {{ translate(enumValue.title) }}
        </span>
      </div>
      <v-tooltip
          v-else-if="field.iconOnly"
          right
      >
        <template v-slot:activator="{ on, attrs }">
          <v-icon
              v-bind="attrs"
              v-on="on"
              :color="translate(enumValue.color)"
          >
            {{ translate(enumValue.icon) }}
          </v-icon>
        </template>
        <span>{{ translate(enumValue.title) }}</span>
      </v-tooltip>
      <span
          v-else
      >
        {{ translate(enumValue.title) }}
      </span>

    </div>
    <div
        v-else
    >
      <small
          v-if="value === undefined || value === null || !value || value.length <= 0"
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
import EntityFieldViewLink from './EntityFieldViewLink';
import EntityFieldViewSelfReference from './EntityFieldViewSelfReference';

export default {
  name: 'entity-field-column-view',
  components: {
    EntityFieldViewLink,
    EntityFieldViewSelfReference,
  },
  props: {
    repository: null,
    field: null,
    value: null,
    item: null,
    fieldKey: null,
  },

  methods: {
    getEnumValue(value) {
      let enumValue = this.field.values.filter((item) => {
        return item.value === value
      })[0];
      if (!enumValue) {
        enumValue = this.field.values.filter((item) => {
          return item.value === this.field.defaultValue
        })[0];
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

    doFormat() {
      switch (this.field.type) {
        case "boolean":
          return formatBoolean(this.value);
        case "datetime":
          return formatDatetime(this.value);
      }
      return this.value;
    },
  }
};
</script>
