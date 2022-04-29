<template>
  <div>
    <span
      v-for="(valueItem, index) in getMultiValue(value)"
      v-bind:key="index"
    >
      <span
        v-if="index > 0"
        class="mr-1"
      >
        ,
      </span>
      <a
        :href="`${field.linkRepository.viewPagePrefix}/${valueItem}`"
      >
        {{ getMultiValue(item[field.linkLabelFieldKey])[index] }}
      </a>
    </span>
    <small
      v-if="!value || value.length <= 0"
    >
      <i>
        &lt;{{ translate('$vuetify.empty') }}&gt;
      </i>
    </small>
  </div>
</template>

<script>
export default {
  name: 'entity-field-view-link',
  props: {
    tabular: Boolean,
    repository: null,
    field: null,
    value: null,
    item: null,
  },

  methods: {
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
};
</script>
