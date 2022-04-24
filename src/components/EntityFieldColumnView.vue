<!-- render short data version for any given field based on field type and properties -->
<!-- used mainly for tabular display of values -->
<template>

  <div>

    <div
      v-if="field.type === 'linkId'"
    >
      <entity-field-view-link-id
        :tabular="true"
        :item="item"
        :value="value"
        :field="field"
      />
    </div>
    <div
      v-else-if="field.type === 'selfReferenceId'"
    >
      <a
        :href="`${repository.viewPagePrefix}/${value}`"
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
      v-else-if="field.type === 'enumeration' || field.type === 'boolean'"
      :set:strValue="strValue = value === true && !field.inverted ? 'true' : 'false'"
      :set:enumValue="enumValue = field.type === 'enumeration' ?  getEnumValue(value) : { title: `base.app.boolean.${strValue}Title`, icon: `base.app.boolean.${strValue}Icon`, color: `base.app.boolean.${strValue}Color` }"
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
      {{ doFormat() }}
    </div>

  </div>

</template>

<script>
import {formatBoolean, formatDate, formatDatetime} from '../plugins/vuetify';
import EntityFieldViewLinkId from './EntityFieldViewLinkId';

export default {
  name: 'entity-field-column-view',
  components: {EntityFieldViewLinkId},
  props: {
    repository: null,
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
